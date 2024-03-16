import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePost } from "@/utils/contexts/PostContext";
import Slider from "react-slick";
import { Modal } from "./Modal";

import plusIcon from "../../../../assets/icons/plus.svg";
import Story from "./Story";
import StorySkeleton from "./StorySkeleton";
import StoryTemplate from "./StoryTemplate";
import guiStoryAnimation from "../../../../assets/lottiefiles/ui-story.lottie";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const supabase = createClient();

const PrevArrow = ({ onClick, currentSlide }: any) => {
  const isFirstSlide = currentSlide == 0;
  return (
    <div
      className={`absolute top-1/2 -left-2 z-50 h-10 w-10 flex items-center justify-center bg-[#36363E] rounded-md hover:scale-110 transition-all duration-300 ease-out text-white cursor-pointer transform -translate-y-1/2 ${
        isFirstSlide ? "opacity-0 cursor-not-allowed" : ""
      }`}
      onClick={isFirstSlide ? null : onClick} // Desabilita o onClick se for o primeiro slide
      style={{}}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>
  );
};

const NextArrow = ({ onClick, currentSlide }: any) => {
  const isLastSlide = Number.isInteger(currentSlide) ? false : true;
  console.log(currentSlide);
  return (
    <div
      className={`absolute top-1/2 -right-2 z-50 h-10 w-10 flex items-center justify-center bg-[#36363E] rounded-md hover:scale-110 transition-all duration-300 ease-out text-white cursor-pointer transform -translate-y-1/2 ${
        isLastSlide ? "opacity-0 cursor-not-allowed" : ""
      }`}
      onClick={isLastSlide ? null : onClick}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>
  );
};

export default function Stories() {
  const [showModal, setShowModal] = useState(false);
  const [storyImage, setStoryImage] = useState<File | null>(null);
  const [storyText, setStoryText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const storiesCounter = stories.length === 0 ? 4 : stories.length;

  const settings = {
    arrows: true,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    speed: 300,
    slidesToShow: 3.7,
    slidesToScroll: 1,
    afterChange: (current: any) => {
      setCurrentSlide(current);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.7,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      console.error("Usuário não logado. 1");
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

  const totalSlides = stories.length;

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
      <Slider
        ref={sliderRef}
        {...settings}
        nextArrow={
          <NextArrow currentSlide={currentSlide} totalSlides={totalSlides} />
        }
        prevArrow={
          <PrevArrow currentSlide={currentSlide} totalSlides={totalSlides} />
        }
      >
        <div className="p-2">
          <div className="h-52 2xl:h-64 relative flex justify-center items-center bg-[#29292F] transition-all ease-out rounded-md z-50">
            {/* Lottie animation overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                pointerEvents: "none",
                mixBlendMode: "plus-lighter",
                transform: "scaleX(1.1)",
              }}
            >
              <DotLottiePlayer
                src={guiStoryAnimation}
                autoplay
                loop
                style={{ borderRadius: "8px" }}
              ></DotLottiePlayer>
            </div>
            {/* Force crop to the lottieFile edges to round then */}
            <div className="absolute -inset-0.5 border-[2.66px] border-[#1F1F27] rounded-md pointer-events-none"></div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleOpenFileSelector}
            >
              <Image
                src={plusIcon}
                alt="Criar novo story"
                width={48}
                height={48}
                className={`${styles.combinedEffect} rounded-full p-2 hover:scale-125 transition-all ease-out duration-300`}
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
          : [...Array(8)].map((_, index) => (
              <motion.div
                key={`template-${index}`}
                initial={{ opacity: 0, x: 100 }} // Mudança aqui: começa fora da tela à direita
                animate={{ opacity: 1, x: 0 }} // Mudança aqui: movendo para a esquerda
                transition={{ delay: index * 0.2 }} // Ajuste o atraso conforme necessário
                className="p-2"
              >
                <StoryTemplate />
              </motion.div>
            ))}
      </Slider>
    </>
  );
}
