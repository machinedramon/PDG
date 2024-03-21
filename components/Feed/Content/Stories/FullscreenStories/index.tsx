import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Stories from "react-insta-stories";
import styles from "./styles.module.css";
import closeButtonImg from "../../../../../assets/icons/logout.svg";
import arrowLeftImg from "../../../../../assets/icons/arrow-left.svg";
import arrowRightImg from "../../../../../assets/icons/arrow-right.svg";
import userDefault from "@/assets/icons/user-hacker.svg";
import identifyFileTypeByUrl from "@/utils/functions/identifyFileTypeByUrl";

export default function FullscreenStories({
  storiesData,
  initialUserId,
  onClose,
}: any) {
  const initialIndex = storiesData.findIndex(
    (group: any) => group.userProfiles.id === initialUserId
  );

  const [currentUserIndex, setCurrentUserIndex] = useState(initialIndex);
  const [animationDirection, setAnimationDirection] = useState(0); // 0 para neutro, -1 para esquerda, 1 para direita

  useEffect(() => {
    const newIndex = storiesData.findIndex(
      (group: any) => group.userProfiles.id === initialUserId
    );
    setCurrentUserIndex(newIndex);
  }, [initialUserId, storiesData]);

  useEffect(() => {
    const handleKeydown = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleNextUserStories = () => {
    if (currentUserIndex < storiesData.length - 1) {
      setAnimationDirection(1);
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevUserStories = () => {
    if (currentUserIndex > 0) {
      setAnimationDirection(-1);
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handlePrevUserStories();
    } else if (info.offset.x < -threshold) {
      handleNextUserStories();
    }
  };

  // Função para determinar se a URL refere-se a um vídeo
  function isVideoUrl(url: any) {
    const videoExtensions = /\.(mp4|webm|ogg|mkv)$/i;
    return videoExtensions.test(url);
  }

  // Função para determinar se a URL refere-se a uma imagem
  function isImageUrl(url: any) {
    const imageExtensions = /\.(jpeg|jpg|png|gif)$/i;
    return imageExtensions.test(url);
  }

  // Preparando os stories para o componente Stories
  const formattedStories = storiesData.map((group: any) =>
    group.stories.map((story: any) => {
      const fileInfo = identifyFileTypeByUrl(story.media_urls[0]);
      return {
        preloadResource: true,
        url: story.media_urls[0],
        header: {
          heading: group.userProfiles.nickname,
          subheading: new Date(story.created_at).toLocaleDateString(),
          profileImage: group.userProfiles.avatar_url || userDefault.src,
        },
        type: fileInfo.type,
        duration: fileInfo.type === "video" ? undefined : 6000,
      };
    })
  );

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.fullscreenStories}
          key={currentUserIndex}
          initial={{ x: animationDirection * 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -animationDirection * 200, opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          onAnimationComplete={() => setAnimationDirection(0)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {formattedStories[currentUserIndex] && (
            <Stories
              stories={formattedStories[currentUserIndex]}
              defaultInterval={6000}
              width="100%"
              height="100vh"
              onAllStoriesEnd={onClose}
              storyContainerStyles={{
                width: "100%",
              }}
              storyInnerContainerStyles={{
                width: "100%",
                heigth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                objectFit: "cover",
              }}
              storyStyles={{
                width: "100%", // Ajustado para 100% para preencher o componente pai
                height: "100%", // Ajustado para 100% para preencher o componente pai
                maxWidth: "100vw", // Limita a largura máxima
                maxHeight: "100vh", // Limita a altura máxima
              }}
            />
          )}

          <motion.div
            className={styles.closeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image src={closeButtonImg} alt="Close" layout="fill" />
          </motion.div>

          {currentUserIndex > 0 && (
            <motion.div
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={handlePrevUserStories}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={arrowLeftImg} alt="Previous user" layout="fill" />
            </motion.div>
          )}
          {currentUserIndex < storiesData.length - 1 && (
            <motion.div
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={handleNextUserStories}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={arrowRightImg} alt="Next user" layout="fill" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
