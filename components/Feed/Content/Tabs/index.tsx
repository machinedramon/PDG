import React from "react";
import Image from "next/image";

import storiesIcon from "../../../../assets/icons/stories.svg";
import gameplaysIcon from "../../../../assets/icons/gameplays.svg";
import arrowLeftIcon from "../../../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../../../assets/icons/arrow-right.svg";

interface TabsProps {
  setActiveTab: (tabName: string) => void;
  activeTab: string;
  nextSlide: any;
  prevSlide: any;
}

const Tabs: React.FC<TabsProps> = ({
  nextSlide,
  prevSlide,
  setActiveTab,
  activeTab,
}) => {
  return (
    <>
      <div className="h-full w-full flex justify-end">
        <button
          className={`flex items-center justify-center w-36 h-full hover:scale-105 hover:bg-[#444349] transition-all duration-300 space-x-2 ${
            activeTab === "stories" ? "border-b-2 border-[#ED143D]" : ""
          }`}
          onClick={() => setActiveTab("stories")}
        >
          <Image src={storiesIcon} alt="Stories" width={28} height={28} />
          <span className="text-white font-medium">Stories</span>
        </button>
        <button
          className={`flex items-center justify-center w-36  h-full hover:scale-105 hover:bg-[#444349] transition-all duration-300 space-x-2 ${
            activeTab === "lives" ? "border-b-2 border-[#ED143D]" : ""
          }`}
          onClick={() => setActiveTab("lives")}
        >
          <Image src={gameplaysIcon} alt="Lives" width={28} height={28} />
          <span className="text-white font-medium">Lives</span>
        </button>
      </div>
      {/* Botões customizados de navegação */}
      <div className="w-full flex justify-center z-30 px-2 space-x-4">
        <button
          onClick={prevSlide}
          className="bg-[#29292F] rounded-md p-2 hover:bg-[#444349] hover:scale-110 transition-all ease-out duration-300"
        >
          <Image src={arrowLeftIcon} alt="Prev" width={16} height={16} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#29292F] rounded-md p-2 hover:bg-[#444349] hover:scale-110 transition-all ease-out duration-300"
        >
          <Image src={arrowRightIcon} alt="Next" width={16} height={16} />
        </button>
      </div>
    </>
  );
};

export default Tabs;
