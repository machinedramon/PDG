import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Definição do ProgressBar dentro do mesmo arquivo para simplificar
const ProgressBar = ({ story, selectedIndex }: any) => {
  return (
    <div
      className="absolute flex"
      style={{
        top: 16,
        height: 2,
        zIndex: 10,
        gap: 4,
        paddingLeft: 8,
        paddingRight: 8,
        width: "calc(100% - 16px)",
      }}
    >
      {story.images.map((image: any, index: any) => (
        <div
          key={image}
          style={{
            backgroundColor:
              selectedIndex >= index ? "#fff" : "rgba(255, 255, 255, .35)",
            borderRadius: 4,
            width: `calc(100% / ${story.images.length})`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default function Carousel3D({
  storiesData = [],
  initialUserId,
  onClose,
}: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialIndex = storiesData.findIndex(
      (group: any) => group[0]?.header.heading === initialUserId
    );
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [initialUserId, storiesData]);

  // Adicionando uma verificação de segurança para garantir que storiesData não é undefined
  const theta =
    storiesData && storiesData.length > 0 ? 360 / storiesData.length : 0;

  const adjustCarouselPosition = () => {
    const angle = theta * currentIndex * -1;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-288px) rotateY(${angle}deg)`;
    }
  };

  useEffect(() => {
    adjustCarouselPosition();
  }, [currentIndex]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % storiesData.length);
    } else if (offset > 100 || velocity > 500) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length
      );
    }
  };

  return (
    <motion.div
      ref={carouselRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        perspective: "1000px",
      }}
    >
      {storiesData.map((group: any, index: any) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            transform: `rotateY(${index * theta}deg) translateZ(288px)`,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {group.map((story: any, storyIndex: any) => (
            <img
              key={storyIndex}
              src={story.url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ))}
          <ProgressBar
            story={{
              id: "progress",
              images: group.map((story: any) => story.url),
              bgColor: "#fff",
            }}
            selectedIndex={0}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
