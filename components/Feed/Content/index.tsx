"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import ActionsBar from "./ActionsBar";
import Tabs from "./Tabs";
import Stories from "./Stories";
import Posts from "./Posts";

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const [sliderMethods, setSliderMethods] = useState({
    next: () => {},
    prev: () => {},
  });

  return (
    <div className="h-full max-h-[86vh] w-full max-w-xl 2xl:max-w-2xl mx-auto overflow-y-scroll space-y-4 px-4">
      <div className="border border-[#18181a] bg-[#1F1F27] rounded-lg flex flex-col items-center justify-center mt-4">
        <div className="h-16 py-2 border-b border-[#29292F] flex items-center justify-center w-full">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextSlide={sliderMethods.next}
            prevSlide={sliderMethods.prev}
          />
        </div>
        {activeTab === "stories" && (
          <div className="w-full">
            <Stories setSliderMethods={setSliderMethods} />
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
