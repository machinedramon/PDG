"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import imageSrc from "@/assets/images/logo-animated-full.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function FirstTimeFeed() {
  // Define o estado inicial de showLoading com base no valor de firstTimeFeed no localStorage

  const [showLoading, setShowLoading] = useState(Boolean);

  useEffect(() => {
    // Perform localStorage action
    const firstTimeFeedKey = localStorage.getItem("firstTimeFeed");
    const firstTimeFeed = !firstTimeFeedKey || firstTimeFeedKey === "true";

    setShowLoading(firstTimeFeed);

    // Se o componente deve ser mostrado, inicia o timer para esconder após 4 segundos
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        localStorage.setItem("firstTimeFeed", "false");
      }, 3200);

      // Limpa o timer ao desmontar o componente
      return () => clearTimeout(timer);
    }
  }, [showLoading]); // Dependência showLoading para reagir a mudanças neste estado

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          style={{ zIndex: "100" }}
          className="bg-[#181820] fixed inset-0 w-full h-[100vh] flex items-center justify-center pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image alt="" src={imageSrc} style={{ height: "50%" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
