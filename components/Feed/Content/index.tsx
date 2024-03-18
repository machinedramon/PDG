"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActionsBar from "./ActionsBar";
import Tabs from "./Tabs";
import Stories from "./Stories";
import Posts from "./Posts";
import Logo from "@/assets/images/Logo";

interface SliderMethods {
  next: () => void;
  prev: () => void;
  updateNavigation?: (isFirst: boolean, isLast: boolean) => void;
}

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const [sliderMethods, setSliderMethods] = useState<SliderMethods>({
    next: () => {},
    prev: () => {},
  });

  useEffect(() => {
    // Esta função atualiza o estado com base nos valores isFirst e isLast
    const updateNavigation = (isFirst: any, isLast: any) => {
      // console.log("Updating navigation in Content", { isFirst, isLast });
      setSliderNavigation({ isFirstSlide: isFirst, isLastSlide: isLast });
    };

    // Atualiza sliderMethods para incluir updateNavigation
    setSliderMethods({ next: () => {}, prev: () => {}, updateNavigation });
  }, []);

  const [sliderNavigation, setSliderNavigation] = useState({
    isFirstSlide: false,
    isLastSlide: false,
  });

  // console.log(
  //   "Passing to Tabs:",
  //   sliderNavigation.isFirstSlide,
  //   sliderNavigation.isLastSlide
  // );

  return (
    <div className="h-full max-h-[86vh] w-full max-w-xl 2xl:max-w-2xl mx-auto overflow-y-scroll space-y-4 px-4">
      <div className="border border-[#18181a] bg-[#1F1F27] rounded-lg flex flex-col items-center justify-center mt-4">
        <div className="h-16 py-2 border-b border-[#29292F] flex items-center justify-center w-full">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextSlide={sliderMethods.next}
            prevSlide={sliderMethods.prev}
            isFirstSlide={sliderNavigation.isFirstSlide}
            isLastSlide={sliderNavigation.isLastSlide}
          />
        </div>
        {activeTab === "stories" && (
          <div className="w-full">
            <Stories />
          </div>
        )}
      </div>
      <div className="bg-[#1F1F27] rounded-md flex flex-col justify-between items-center border border-[#29292F]">
        <ActionsBar />
      </div>
      <div className="py-2 space-y-6 my-4">
        <Posts />
      </div>
    </div>
  );
};

export default Content;
