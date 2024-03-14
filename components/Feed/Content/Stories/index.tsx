import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePost } from "@/utils/contexts/PostContext";
import Slider from "react-slick";
import { Modal } from "./Modal";

import plusIcon from "../../../../assets/icons/plus.svg";
import Story from "./Story";
import StorySkeleton from "./StorySkeleton";
import StoryTemplate from "./StoryTemplate";
import guiStoryAnimation from "../../../../assets/lottiefiles/gui-story.lottie";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const supabase = createClient();

export default function Stories({ setSliderMethods }: any) {
  const [showModal, setShowModal] = useState(false);
  const [storyImage, setStoryImage] = useState<File | null>(null);
  const [storyText, setStoryText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    // Expondo as funções de controle do slider para o componente pai
    if (sliderRef.current) {
      setSliderMethods({
        next: () => sliderRef.current.slickNext(),
        prev: () => sliderRef.current.slickPrev(),
      });
    }
  }, [setSliderMethods]);

  const { refreshKey } = usePost();

  const handleOpenFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setStoryImage(file); // Agora aceita File sem erros.
      setShowModal(true);
    }
  };

  const fetchStories = async () => {
    setIsLoadingStories(true);
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;

    if (!userId) {
      console.error("Usuário não logado.");
      return;
    }

    const { data: friendIds, error: friendIdsError } = await supabase
      .from("connections")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .eq("status", "accepted");

    if (friendIdsError || !friendIds) {
      console.error("Erro ao buscar conexões:", friendIdsError?.message);
      return;
    }

    const friendUserIds = new Set(
      friendIds.flatMap(({ user_id_1, user_id_2 }) => [user_id_1, user_id_2])
    );
    friendUserIds.delete(userId); // Remove o próprio userId para buscar apenas stories de amigos

    // Ajustando a consulta para incluir detalhes de user_profiles
    const { data: stories, error: storiesError } = await supabase
      .from("stories")
      .select(
        `
                story_id,
                content,
                media_urls,
                privacy_level,
                location,
                created_at,
                expires_at,
                status,
                like_count,
                comment_count,
                user_profiles: user_profiles!inner(id, avatar_url, nickname)
            `
      )
      .in("user_id", [...friendUserIds])
      .gte("expires_at", new Date().toISOString())
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (storiesError) {
      console.error("Erro ao buscar stories:", storiesError.message);
      setIsLoadingStories(false);
      return;
    }

    // Atribuindo os dados de stories ao estado para renderização
    setStories(stories);
    setIsLoadingStories(false);
  };

  useEffect(() => {
    fetchStories();
  }, [refreshKey]);

  const slidesToShow = 3.7;

  const settings = {
    arrows: false,
    infinite: false,
    dots: false,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleStorySubmit = async () => {
    if (!storyImage) {
      alert("Por favor, selecione uma imagem para o story.");
      return;
    }

    setIsLoadingStories(true); // Opcional: Indicar carregamento

    try {
      // Supondo que você já tenha o ID do usuário logado
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;

      // Definindo o caminho do arquivo no Storage
      const fileExtension = storyImage.name.split(".").pop();
      const fileName = `${new Date().getTime()}.${fileExtension}`;
      const filePath = `${userId}/stories/${fileName}`;

      // Upload da imagem para o Storage
      const { error: uploadError } = await supabase.storage
        .from("users") // Nome do bucket de stories
        .upload(filePath, storyImage);

      if (uploadError) throw new Error(uploadError.message);

      // Obtenção da URL pública da imagem (ajuste conforme necessidade para URLs assinadas)
      const { data } = supabase.storage.from("stories").getPublicUrl(filePath);

      // Criação do story no banco de dados
      const { error: storyError } = await supabase.from("stories").insert([
        {
          user_id: userId,
          content: storyText, // Pode ser uma string vazia ou o texto inserido pelo usuário no modal
          media_urls: [data.publicUrl],
          privacy_level: "public", // Ajuste conforme o modelo do seu banco
          status: "active", // Ajuste conforme o modelo do seu banco
          // Adicione outros campos necessários aqui
        },
      ]);

      if (storyError) throw new Error(storyError.message);

      alert("Story criado com sucesso!");
      setShowModal(false); // Fecha o modal após a criação com sucesso
      setStoryImage(null); // Limpa a imagem selecionada
      setStoryText(""); // Limpa o texto do story
    } catch (error: any) {
      alert(`Erro ao criar o story: ${error.message}`);
    } finally {
      setIsLoadingStories(false); // Opcional: Indicar fim do carregamento
    }
  };

  return (
    <>
      {/* Renderize o Modal aqui, passando os props necessários */}
      <AnimatePresence>
        {showModal && (
          <Modal
            image={storyImage}
            text={storyText}
            setText={setStoryText}
            onClose={() => {
              setTimeout(() => setShowModal(false), 0);
            }}
            onSubmit={handleStorySubmit}
          />
        )}
      </AnimatePresence>
      {/* Botão de adicionar novo story */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden opacity-0 max-w-0 w-0"
      />
      <Slider ref={sliderRef} {...settings}>
        <div className="p-2">
          <div className="h-52 2xl:h-64 relative flex justify-center items-center bg-[#29292F] transition-all ease-out rounded-md z-50">
            {/* Lottie animation overlay */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{ pointerEvents: "none", mixBlendMode: "plus-lighter" }}
            >
              <DotLottiePlayer
                src={guiStoryAnimation}
                autoplay
                loop
              ></DotLottiePlayer>
            </div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleOpenFileSelector}
            >
              <Image
                src={plusIcon}
                alt="Criar novo story"
                width={48}
                height={48}
                className="rounded-full bg-[crimson] p-2 hover:scale-125 transition-all ease-out duration-300"
              />
              <div className="text-white text-center text-xs rounded-md mt-2">
                Create Story
              </div>
            </div>
          </div>
        </div>
        {/* Condicional para renderizar esqueletos ou stories reais */}
        {isLoadingStories
          ? [...Array(4)].map((_, index) => (
              <div className="p-2" key={`skeleton-${index}`}>
                <StorySkeleton />
              </div>
            ))
          : stories.length > 0
          ? stories.map((story, index) => (
              <motion.div
                key={`story-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
                className="p-2 relative"
              >
                <Story story={story} />
              </motion.div>
            ))
          : [...Array(3)].map((_, index) => (
              <motion.div
                key={`template-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
                className="p-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1F1F27] z-40 mix-blend-color"></div>
                <StoryTemplate />
              </motion.div>
            ))}
      </Slider>
    </>
  );
}
