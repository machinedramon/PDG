"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import homeIcon from "../../../../assets/icons/home.svg";
import watchIcon from "../../../../assets/icons/watch.svg";
import marketIcon from "../../../../assets/icons/market.svg";
import groupIcon from "../../../../assets/icons/group.svg";
import gameplaysIcon from "../../../../assets/icons/gamer.svg";
import styles from "./styles.module.css";

export default function Header() {
  const pathname = usePathname();

  const iconsToRoutes = [
    { icon: homeIcon, route: "/feed" },
    { icon: watchIcon, route: "/watch" },
    { icon: marketIcon, route: "/market" },
    { icon: groupIcon, route: "/groups" },
    { icon: gameplaysIcon, route: "/games" },
  ];

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className="flex justify-center flex-1 h-[80%]">
      <div className="flex items-center justify-center w-full max-w-xl 2xl:max-w-2xl">
        {iconsToRoutes.map(({ icon, route }, index) => (
          <div
            key={index}
            className={`group flex flex-col hover:mx-4 hover:bg-[#29292F] rounded-md h-full cursor-pointer hover:scale-105 transition-all ease-out duration-300 ${
              pathname === route ? "hover:bg-[#29292F]" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.pathname = route)}
          >
            <div className="flex items-center justify-between h-[100%] px-4 space-x-2">
              {/* Animação de flutuando */}
              {/* <motion.div
                animate={{
                  y: [0, getRandomNumber(-5, 5), getRandomNumber(-5, 5), 0],
                  rotate: [
                    0,
                    getRandomNumber(-2, 2),
                    getRandomNumber(-2, 2),
                    0,
                  ],
                  scale: [
                    1,
                    getRandomNumber(1, 1.05),
                    getRandomNumber(1, 1.05),
                    1,
                  ],
                }}
                transition={{
                  duration: getRandomNumber(2, 4), // Duração aleatória entre 2 e 4 segundos
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  src={icon}
                  alt={`Icon ${index}`}
                  style={{
                    width: 34,
                    height: 34,
                    background: "transparent",
                  }}
                />
              </motion.div> */}
              <Image
                src={icon}
                alt={`Icon ${index}`}
                style={{
                  width: 34,
                  height: 34,
                  background: "transparent",
                }}
              />
            </div>
            <div
              className={`h-[4px] transition-all ease-out duration-300 rounded-lg ${
                pathname === route
                  ? `${styles.combinedEffect} group-hover:mx-4`
                  : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
