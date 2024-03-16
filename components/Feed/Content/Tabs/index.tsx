import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import storiesIcon from "../../../../assets/icons/stories.svg";
import gameplaysIcon from "../../../../assets/icons/gameplays.svg";

interface TabsProps {
  setActiveTab: (tabName: string) => void;
  activeTab: string;
  nextSlide: any;
  prevSlide: any;
  isFirstSlide: any;
  isLastSlide: any;
}

const Tabs: React.FC<TabsProps> = ({
  nextSlide,
  prevSlide,
  setActiveTab,
  activeTab,
  isFirstSlide,
  isLastSlide,
}) => {
  console.log("Tabs received:", { isFirstSlide, isLastSlide });
  return (
    <>
      <div className="h-full w-full flex justify-center">
        <div
          className={`group flex flex-col hover:mx-4 hover:bg-[#29292F] rounded-md h-full cursor-pointer hover:scale-105 transition-all ease-out duration-300 ${
            activeTab === "stories" ? `hover:bg-[#29292F]` : ""
          }`}
          onClick={() => setActiveTab("stories")}
        >
          <div className="flex items-center justify-between h-[100%] px-4 space-x-2">
            <Image src={storiesIcon} alt="Stories" width={28} height={28} />
            <span className="text-white font-medium">Stories</span>
          </div>
          <div
            className={`h-[4px] transition-all ease-out duration-300 rounded-lg ${
              activeTab === "stories"
                ? `${styles.combinedEffect} group-hover:mx-4`
                : "bg-transparent"
            }`}
          ></div>
        </div>
        <div
          className={`group flex hover:mx-4 flex-col rounded-md hover:bg-[#29292F] h-full cursor-pointer hover:scale-105 transition-all ease-out duration-300 ${
            activeTab === "lives" ? `hover:bg-[#29292F]` : ""
          }`}
          onClick={() => setActiveTab("lives")}
        >
          <div className="flex items-center justify-between h-[100%] px-4 space-x-2">
            <Image src={gameplaysIcon} alt="Lives" width={28} height={28} />
            <span className="text-white font-medium">Lives</span>
          </div>
          <div
            className={`h-[4px] transition-all ease-out duration-300 rounded-lg ${
              activeTab === "lives"
                ? `${styles.combinedEffect} group-hover:mx-4`
                : "bg-transparent"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
