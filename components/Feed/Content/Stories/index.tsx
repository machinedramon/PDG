import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePost } from "@/utils/contexts/PostContext";
import Slider from "react-slick";
import { Modal } from "./Modal";
import { useToaster } from "react-hot-toast"; // Importando o React Hot Toast
import plusIcon from "../../../../assets/icons/plus.svg";
import Story from "./Story";
import StorySkeleton from "./StorySkeleton";
import StoryTemplate from "./StoryTemplate";
import guiStoryAnimation from "../../../../assets/lottiefiles/ui-story.lottie";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import toast from "react-hot-toast";
import FullscreenStories from "./FullscreenStories";

// Função para emojis aleatórios
const randomEmoji = () => {
  const emojis = ["😄", "😎", "🚀", "💡", "🔥", "👍"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

// Função para toast de sucesso com emoji aleatório
const successToast = (message: any) =>
  toast.success(`${randomEmoji()} Feito! ${message}`, {
    duration: 4000,
  });

// Função para toast de erro com emoji aleatório
const errorToast = (message: any) =>
  toast.error(`${randomEmoji()} Ops! Algo deu errado. ${message}`, {
    duration: 4000,
  });

const showToastLoading = (message: string) => toast.loading(message);

// Função para atualizar o toast baseado no resultado da operação
const updateToast = (toastId: string, success: boolean, message: string) => {
  toast.dismiss(toastId); // Remove o toast de carregando
  success ? toast.success(message) : toast.error(message);
};

interface UserProfile {
  id: string;
  avatar_url: string;
  nickname: string;
}

interface Story {
  story_id: string;
  content: string;
  media_urls: string[];
  privacy_level: string;
  location: string | null;
  created_at: string;
  expires_at: string;
  status: string;
  like_count: number;
  comment_count: number;
  userProfiles: UserProfile;
}

interface StoriesGroup {
  stories: Story[];
  userProfiles: UserProfile;
  storyCount: number;
}

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
  return (
    <div
      className={`absolute top-1/2 -right-2 z-40 h-10 w-10 flex items-center justify-center bg-[#36363E] rounded-md hover:scale-110 transition-all duration-300 ease-out text-white cursor-pointer transform -translate-y-1/2 ${
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
  const [location, setLocation] = useState("");
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [initialUserId, setInitialUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>("");

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

  useEffect(() => {
    fetchStories();

    const storiesSubscription = supabase
      .channel("public-stories")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stories" },
        (payload) => {
          handleNewStory(payload.new);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stories" },
        (payload) => {
          handleUpdatedStory(payload.new);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "stories" },
        (payload) => {
          handleDeletedStory(payload.old);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(storiesSubscription);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const gettingUser = await supabase.auth.getUser();
      setUser(gettingUser.data.user?.id);
    };

    getUser();
  }, []);

  // Novos manipuladores para INSERT, UPDATE e DELETE
  const handleNewStory = async (newStory: any) => {
    try {
      let userProfilesData = newStory.userProfiles || newStory.user_profiles;
      if (!userProfilesData) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("id, avatar_url, nickname")
          .eq("id", newStory.user_id)
          .single();

        if (error) throw error;
        if (!data) {
          console.error(
            "Perfil do usuário não encontrado para ID:",
            newStory.user_id
          );
          return;
        }
        userProfilesData = data;
      }

      setStories((prevStories) => {
        const storyAlreadyExists = prevStories.some((group) =>
          group.stories.some(
            (story: any) => story.story_id === newStory.story_id
          )
        );

        if (storyAlreadyExists) {
          return prevStories;
        }

        let updatedStories = [...prevStories];
        const existingGroupIndex = updatedStories.findIndex(
          (group) => group.userProfiles.id === userProfilesData.id
        );

        const preparedNewStory = {
          ...newStory,
          user_profiles: userProfilesData,
          created_at: new Date().toISOString(),
        };

        if (existingGroupIndex >= 0) {
          updatedStories[existingGroupIndex].stories.unshift(preparedNewStory);
          updatedStories[existingGroupIndex].storyCount++;
        } else {
          updatedStories.unshift({
            stories: [preparedNewStory],
            userProfiles: userProfilesData,
            storyCount: 1,
            created_at: new Date().toISOString(),
          });
        }

        // Garantir que o grupo do usuário logado está sempre em primeiro
        updatedStories = updatedStories.sort((a, b) =>
          a.userProfiles.id === user ? -1 : b.userProfiles.id === user ? 1 : 0
        );

        // Ordenar os demais grupos por data de criação do último story inserido, exceto o grupo do usuário logado
        if (updatedStories.length > 1 && userProfilesData.id !== user) {
          updatedStories = [
            updatedStories[0], // Mantém o grupo do usuário logado em primeiro
            ...updatedStories
              .slice(1)
              .sort(
                (a, b) =>
                  new Date(b.stories[0].created_at).getTime() -
                  new Date(a.stories[0].created_at).getTime()
              ),
          ];
        }

        return updatedStories;
      });
    } catch (error) {
      console.error("Erro ao processar novo story:", error);
    }
  };

  const handleUpdatedStory = (updatedStory: any) => {
    setStories((prevStories) => {
      return prevStories.map((group) => {
        // Aqui, garantimos a consistência na referência ao ID do usuário,
        // considerando as correções anteriores que usam 'userProfiles' para consistência
        if (group.userProfiles.id === updatedStory.user_id) {
          const updatedStories = group.stories.map((story: any) => {
            // Se for o story que foi atualizado, retorna a versão atualizada
            // Aqui, também garantimos que qualquer referência a user_profiles ou userProfiles
            // seja unificada para user_profiles na estrutura do story atualizado, se necessário
            if (story.story_id === updatedStory.story_id) {
              let userProfilesData =
                updatedStory.userProfiles || updatedStory.user_profiles;
              if (!userProfilesData) {
                // Mantém os dados existentes do perfil do usuário, se os novos não estiverem disponíveis
                userProfilesData = story.user_profiles || story.userProfiles;
              }

              return { ...updatedStory, user_profiles: userProfilesData };
            }
            // Se não for o story atualizado, retorna o story como está
            return story;
          });

          // Retorna o grupo atualizado com a lista de stories atualizada
          return {
            ...group,
            stories: updatedStories,
            // Não é necessário atualizar storyCount aqui, pois o número de stories não muda
          };
        }
        // Se o grupo não corresponder ao usuário do story atualizado, retorna o grupo como está
        return group;
      });
    });
  };

  const handleDeletedStory = (deletedStory: any) => {
    setStories((prevStories) => {
      // Atualiza os grupos de stories, removendo o story excluído
      const updatedGroups = prevStories
        .map((group) => {
          // Usa a propriedade userProfiles para maior consistência, considerando ajustes anteriores
          if (group.userProfiles.id === deletedStory.user_id) {
            // Filtra o story excluído da lista de stories do grupo
            const updatedStories = group.stories.filter(
              (story: any) => story.story_id !== deletedStory.story_id
            );
            return {
              ...group,
              stories: updatedStories,
              storyCount: updatedStories.length,
            };
          }
          return group;
        })
        .filter((group) => group.storyCount > 0); // Remove grupos que ficaram sem stories

      return updatedGroups;
    });
  };

  const handleStoryClick = (userId: any) => {
    setInitialUserId(userId);
    setShowFullscreen(true);
  };

  const { refreshPosts } = usePost();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
    });
  }, []);

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
      setIsLoadingStories(false);
      return;
    }

    // Buscar stories do próprio usuário
    const userStories = await fetchUserStories(userId);
    // Buscar stories dos amigos
    const friendStories = await fetchFriendStories(userId);

    // Combinar os stories do usuário com os dos amigos, colocando os do usuário primeiro
    const combinedStories = [...userStories, ...friendStories];

    // Agrupa stories por usuário
    // A função de reduce começa com um objeto vazio como valor inicial e acumula os resultados em acc.
    const storiesGroupedByUser = combinedStories.reduce<
      Record<string, StoriesGroup>
    >((acc: any, story: any) => {
      const userId = story.user_profiles.id;
      if (!acc[userId]) {
        acc[userId] = {
          stories: [],
          userProfiles: story.user_profiles,
          storyCount: 0,
        };
      }

      acc[userId].stories.push(story);
      acc[userId].storyCount++;

      return acc;
    }, {});

    // Transforma o objeto agrupado em array
    const storiesGroupedArray = Object.values(storiesGroupedByUser).map(
      (group) => ({
        ...group,
        storyCount: group.stories.length,
      })
    );
    setStories(storiesGroupedArray);
    setIsLoadingStories(false);
  };

  const fetchUserStories = async (userId: any) => {
    const { data, error } = await supabase
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
      .eq("user_id", userId)
      .gte("expires_at", new Date().toISOString())
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar stories do usuário:", error.message);
      return [];
    }

    return data || [];
  };

  const fetchFriendStories = async (userId: any) => {
    const { data: friendIds, error: friendIdsError } = await supabase
      .from("connections")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .eq("status", "accepted");

    if (friendIdsError || !friendIds) {
      console.error("Erro ao buscar conexões:", friendIdsError?.message);
      return [];
    }

    const friendUserIds = new Set(
      friendIds.flatMap(({ user_id_1, user_id_2 }) => [user_id_1, user_id_2])
    );
    friendUserIds.delete(userId);

    const { data, error } = await supabase
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

    if (error || !data) {
      console.error("Erro ao buscar stories dos amigos:", error?.message);
      return [];
    }

    return data;
  };

  const handleStorySubmit = async () => {
    if (!storyImage) {
      errorToast("Aguarde o fim do upload ou selecione uma imagem.");
      return;
    }
    const toastId = showToastLoading("Enviando seu story...");

    setIsLoadingStories(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;

      const fileExtension = storyImage.name.split(".").pop();
      const fileName = `${new Date().getTime()}.${fileExtension}`;
      const filePath = `${userId}/stories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("users")
        .upload(filePath, storyImage);

      if (uploadError) throw new Error(uploadError.message);

      // Mudança significativa aqui para criar uma URL assinada em vez de pública
      const expiresIn = 60 * 60 * 24; // 24 horas em segundos
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("users")
          .createSignedUrl(filePath, expiresIn);

      if (signedUrlError) throw new Error(signedUrlError.message);

      const imageUrl = signedUrlData.signedUrl;

      const expiresAt = new Date(
        new Date().getTime() + expiresIn * 1000
      ).toISOString();

      const { error: storyError } = await supabase.from("stories").insert([
        {
          user_id: userId,
          content: storyText,
          media_urls: [imageUrl],
          location: location,
          privacy_level: "public",
          status: "active",
          expires_at: expiresAt,
        },
      ]);

      if (storyError) throw new Error(storyError.message);

      updateToast(toastId, true, "Story publicado com sucesso!");
      setShowModal(false);
      setStoryImage(null);
      setStoryText("");
      refreshPosts();
    } catch (error: any) {
      updateToast(
        toastId,
        false,
        `Falha ao publicar o story: ${error.message}`
      );
    } finally {
      setIsLoadingStories(false);
    }
  };

  const totalSlides = storiesCounter;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className={styles.fullscreenStories}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {showFullscreen && (
            <FullscreenStories
              storiesData={stories}
              initialUserId={initialUserId}
              onClose={() => {
                setShowFullscreen(false);
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Renderiza o Modal aqui, passando os props necessários */}
      <AnimatePresence>
        {showModal && (
          <Modal
            image={storyImage}
            text={storyText}
            setText={setStoryText}
            onClose={() => setShowModal(false)}
            onSubmit={handleStorySubmit} // Esta função já deve lidar com o feedback e carregamento
            isSubmitting={isSubmitting} // Adicione este estado ao Modal para controlar o botão
          />
        )}
      </AnimatePresence>
      {/* Botão de adicionar novo story */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml, image/webp, video/mp4, video/webm, video/ogg, video/mkv"
        onChange={handleFileChange}
        className="hidden opacity-0 max-w-0 w-0"
      />
      <div className="overflow-hidden max-h-56 lg:max-h-72">
        <AnimatePresence>
          <Slider
            ref={sliderRef}
            {...settings}
            nextArrow={
              <NextArrow
                currentSlide={currentSlide}
                totalSlides={totalSlides}
              />
            }
            prevArrow={
              <PrevArrow
                currentSlide={currentSlide}
                totalSlides={totalSlides}
              />
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
                  />
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
                    className={`${styles.combinedEffect} rounded-full p-2 hover:scale-110 transition-all ease-out duration-300`}
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
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, x: 100 }} // Mudança aqui: começa fora da tela à direita
                    animate={{ opacity: 1, x: 0 }} // Mudança aqui: movendo para a esquerda
                    transition={{ delay: index * 0.2 }} // Ajuste o atraso conforme necessário
                    className="p-2"
                  >
                    <StorySkeleton />
                  </motion.div>
                ))
              : stories.length > 0
              ? stories.map((group: StoriesGroup, index: number) => (
                  <div
                    key={`story-group-${index}`}
                    className="p-2"
                    onClick={() => handleStoryClick(group.userProfiles.id)}
                  >
                    <Story
                      story={group.stories[0]}
                      storyCount={group.storyCount}
                    />
                  </div>
                ))
              : [...Array(4)].map((_, index) => (
                  <AnimatePresence>
                    <motion.div
                      key={`template-${index}`}
                      layout
                      className="p-2"
                    >
                      <StoryTemplate />
                    </motion.div>
                  </AnimatePresence>
                ))}
          </Slider>
        </AnimatePresence>
      </div>
    </>
  );
}
