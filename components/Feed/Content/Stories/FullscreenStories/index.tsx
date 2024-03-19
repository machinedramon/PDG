import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Stories from "react-insta-stories";
import styles from "./styles.module.css";
import closeButtonImg from "../../../../../assets/icons/logout.svg";
import arrowLeftImg from "../../../../../assets/icons/arrow-left.svg";
import arrowRightImg from "../../../../../assets/icons/arrow-right.svg";

export default function FullscreenStories({ storiesData, onClose }: any) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

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
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      onClose(); // Fecha o componente se estiver no último usuário
    }
  };

  const handlePrevUserStories = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  // Preparando os stories para o componente Stories
  const formattedStories = storiesData.map((group: any) =>
    group.stories.map((story: any) => ({
      url: story.media_urls[0],
      header: {
        heading: group.userProfiles.nickname,
        subheading: new Date(story.created_at).toLocaleDateString(),
        profileImage:
          group.userProfiles.avatar_url || "/path/to/default/avatar.jpg",
      },
      type: story.media_urls[0].endsWith(".mp4") ? "video" : "image",
    }))
  );

  return (
    <AnimatePresence>
      <motion.div
        className={styles.fullscreenStories}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={currentUserIndex} // Ajuda na transição suave entre os usuários
      >
        {formattedStories[currentUserIndex] && (
          <Stories
            stories={formattedStories[currentUserIndex]}
            defaultInterval={1500}
            width="100vw"
            height="100vh"
            onAllStoriesEnd={onClose}
            storyStyles={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              objectFit: "contain",
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
    </AnimatePresence>
  );
}
