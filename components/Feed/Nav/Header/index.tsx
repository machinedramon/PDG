"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import homeIcon from "../../../../assets/icons/home.svg";
import watchIcon from "../../../../assets/icons/watch.svg";
import marketIcon from "../../../../assets/icons/market.svg";
import groupIcon from "../../../../assets/icons/group.svg";
import gameplaysIcon from "../../../../assets/icons/gamer.svg";

export default function Header() {
  const pathname = usePathname();

  const iconsToRoutes = [
    { icon: homeIcon, route: "/feed" },
    { icon: watchIcon, route: "/watch" },
    { icon: marketIcon, route: "/market" },
    { icon: groupIcon, route: "/groups" },
    { icon: gameplaysIcon, route: "/games" },
  ];

  return (
    <div className="flex justify-center flex-1 h-full">
      {iconsToRoutes.map(({ icon, route }, index) => (
        <button
          key={index}
          className={`p-2 mx-2 hover:scale-110 hover:bg-[#444349] transition duration-300 ${
            pathname === route ? "border-b-2 border-[#ED143D]" : ""
          }`} // Aplicando a barra azul se a rota estiver ativa
          onClick={() => (window.location.pathname = route)} // Navegação direta, considerando a restrição de uso do useRouter em componentes clientes.
        >
          <Image
            src={icon}
            alt={`Icon ${index}`}
            style={{ width: 34, height: 34 }}
          />
        </button>
      ))}
    </div>
  );
}
