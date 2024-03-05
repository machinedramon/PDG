"use client";

// Importações necessárias
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef } from "react";
import Image from "next/image";
import storiesIcon from "../../../assets/icons/stories.svg";
import gameplaysIcon from "../../../assets/icons/gameplays.svg";
import arrowLeftIcon from "../../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../../assets/icons/arrow-right.svg";
import userHackerIcon from "../../../assets/icons/user-hacker.svg";
import plusIcon from "../../../assets/icons/plus.svg";
import imageMock0 from "../../../assets/images/image0.jpg";
import imageMock1 from "../../../assets/images/image1.jpg";
import imageMock2 from "../../../assets/images/image2.jpg";
import imageMock3 from "../../../assets/images/image3.jpg";
import imageMock4 from "../../../assets/images/image4.jpg";
import imageMock5 from "../../../assets/images/image5.jpg";

// Mocks para stories e plays
const storiesMocks = [
  {
    id: 1,
    image: imageMock0,
    nickname: "@Alice",
    title: "Story 1",
    avatar_url: "",
  },
  {
    id: 2,
    image: imageMock1,
    nickname: "@Bob",
    title: "Story 2",
    avatar_url: "",
  },
  {
    id: 3,
    image: imageMock2,
    nickname: "@Jhon",
    title: "Story 3",
    avatar_url: "",
  },
  {
    id: 4,
    image: imageMock3,
    nickname: "@Mike",
    title: "Story 4",
    avatar_url: "",
  },
  {
    id: 5,
    image: imageMock4,
    nickname: "@Roger",
    title: "Story 5",
    avatar_url: "",
  },
  {
    id: 6,
    image: imageMock5,
    nickname: "@Jules",
    title: "Story 6",
    avatar_url: "",
  },
];

const playsMocks = [
  {
    id: 1,
    image: imageMock0,
    nickname: "@Alice",
    title: "Play 1",
    avatar_url: "",
  },
  {
    id: 2,
    image: imageMock1,
    nickname: "@Bob",
    title: "Play 2",
    avatar_url: "",
  },
  {
    id: 3,
    image: imageMock2,
    nickname: "@Jhon",
    title: "Play 3",
    avatar_url: "",
  },
  {
    id: 4,
    image: imageMock3,
    nickname: "@Mike",
    title: "Play 4",
    avatar_url: "",
  },
  {
    id: 5,
    image: imageMock4,
    nickname: "@Roger",
    title: "Play 5",
    avatar_url: "",
  },
  {
    id: 6,
    image: imageMock5,
    nickname: "@Jules",
    title: "Play 6",
    avatar_url: "",
  },
];

function NextArrow({ onClick, isVisible }: any) {
  return (
    <div
      className={`slick-next custom-next mr-12 z-10 flex justify-center items-center ${
        !isVisible ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        opacity: isVisible ? "1" : "0.5",
        background: "#000",
        width: "38px",
        height: "38px",
        pointerEvents: isVisible ? "auto" : "none", // Desabilita a interação com o botão
      }}
      onClick={onClick}
    >
      <Image
        src={arrowRightIcon}
        alt="Next"
        width={48}
        height={48}
        className="transition-all"
      />
    </div>
  );
}

function PrevArrow({ onClick, isVisible }: any) {
  return (
    <div
      className={`slick-prev custom-prev ml-12 z-10 ${
        !isVisible ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        display: "block",
        background: "transparent",
        pointerEvents: isVisible ? "auto" : "none", // Desabilita a interação com o botão
      }}
      onClick={onClick}
    >
      <Image
        src={arrowLeftIcon}
        alt="Prev"
        width={24}
        height={24}
        className=""
      />
    </div>
  );
}

export default function Content() {
  const [activeTab, setActiveTab] = useState("stories");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider = useRef<any>(null);

  const slidesToShow = 4;
  const totalSlides =
    activeTab === "stories" ? storiesMocks.length : playsMocks.length;
  const showNextArrow = currentIndex < totalSlides - slidesToShow;
  const showPrevArrow = currentIndex > 0;

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow isVisible={showNextArrow} />,
    prevArrow: <PrevArrow isVisible={showPrevArrow} />,
    beforeChange: (_: any, next: any) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-full max-w-full max-h-[86vh] overflow-auto p-8">
      <div className="border border-[#29292F] bg-[#1F1F27] rounded-lg flex flex-col items-center justify-start">
        <div className=" h-16 border-b border-[#29292F] flex items-center justify-around">
          <button
            className={`flex w-full h-full items-center hover:scale-105 px-8 hover:bg-[#444349] transition-all duration-300 space-x-2 ${
              activeTab === "stories" ? "border-b-2 border-[#ED143D]" : ""
            }`}
            onClick={() => setActiveTab("stories")}
          >
            <Image src={storiesIcon} alt="Stories" width={38} height={38} />
            <span className="text-white font-medium">Stories</span>
          </button>
          <button
            className={`flex w-full h-full items-center hover:scale-105 px-8 hover:bg-[#444349] transition-all duration-300 space-x-2 ${
              activeTab === "plays" ? "border-b-2 border-[#ED143D]" : ""
            }`}
            onClick={() => setActiveTab("plays")}
          >
            <Image src={gameplaysIcon} alt="Plays" width={38} height={38} />
            <span className="text-white font-medium">Plays</span>
          </button>
          {/* Botões customizados de navegação */}
          <div className="flex justify-end w-full z-30 px-4 space-x-4">
            <button
              onClick={() => slider.current?.slickPrev()}
              className="bg-[#29292F] rounded-md p-2 hover:bg-[#444349] hover:scale-110 transition-all ease-out duration-300"
            >
              {/* Ícone ou texto para seta esquerda */}
              <Image src={arrowLeftIcon} alt="Prev" width={32} height={32} />
            </button>
            <button
              onClick={() => slider.current?.slickNext()}
              className="bg-[#29292F] rounded-md p-2 hover:bg-[#444349] hover:scale-110 transition-all ease-out duration-300"
            >
              {/* Ícone ou texto para seta direita */}
              <Image src={arrowRightIcon} alt="Next" width={32} height={32} />
            </button>
          </div>
        </div>
        <div className="md:max-w-2xl 2xl:max-w-3xl w-full">
          <Slider ref={slider} {...settings}>
            {/* Botão de adicionar novo storie */}
            <div className="p-4">
              <div className="h-[360px] md:h-[360px] lg:h-[260px] xl:h-[260px] relative flex justify-center items-center bg-[#29292F] rounded-md">
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => {
                    /* Handler para criar novo storie */
                  }}
                >
                  <Image
                    src={plusIcon}
                    alt="Criar novo storie"
                    width={48}
                    height={48}
                    className="rounded-full bg-[crimson] p-2 hover:scale-110  transition-all ease-out duration-300"
                  />
                  <div className="text-white text-sm mt-2  bg-opacity-50 p-1 rounded-md">
                    Create Story
                  </div>
                </div>
              </div>
            </div>
            {(activeTab === "stories" ? storiesMocks : playsMocks).map(
              (item) => (
                <div key={item.id} className="p-4">
                  <div className="h-[360px] md:h-[360px] lg:h-[260px] xl:h-[260px] relative rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/path/to/default-image.jpg"}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-out hover:scale-110"
                    />
                    <div className="absolute w-full bottom-0 flex flex-col items-center pb-4 space-y-2">
                      <Image
                        src={item.avatar_url || userHackerIcon}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white bg-white"
                      />
                      <div className="text-white w-fit text-sm p-1 bg-black bg-opacity-50 rounded-md">
                        {item.nickname}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
