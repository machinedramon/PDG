import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import guiStoryDefaultAnimation from "../../../../../assets/lottiefiles/gui-story-default.lottie";

export default function StoryTemplate() {
  return (
    <div className=" h-52 2xl:h-64 relative rounded-md overflow-hidden bg-gradient-to-r from-[#00FFFF] to-[#132929] backdrop-filter backdrop-blur-lg opacity-10">
      {/* Container para a animação Lottie centralizada */}
      <div className="absolute inset-0 flex items-center justify-center mix-blend-plus-lighter">
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
