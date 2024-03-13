import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimation from "../../../../../assets/lottiefiles/empty.json"; // Substitua pelo caminho correto da sua animação Lottie
import { DotLottiePlayer } from "@dotlottie/react-player";
import guiStoryDefaultAnimation from "../../../../../assets/lottiefiles/gui-story-default.lottie";

export default function StoryTemplate() {
  return (
    <div className="h-52 2xl:h-64 relative rounded-md overflow-hidden bg-[#861932]">
      {/* Container para a animação Lottie centralizada */}
      <div className="absolute inset-0 flex items-center justify-center">
        <DotLottiePlayer
          src={guiStoryDefaultAnimation}
          autoplay
          loop
          style={{ width: "100%", height: "100%", maxWidth: "100%" }}
        ></DotLottiePlayer>
      </div>
    </div>
  );
}
