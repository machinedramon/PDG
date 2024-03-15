"use client";

import Image from "next/image";
import logoAnimated from "../../../../assets/images/logo-animated.svg";
import searchIcon from "../../../../assets/icons/search.svg";

export default function LogoAndSearch() {
  return (
    <>
      <span className={`font-bold text-xl mr-4 neonEffect`}>
        <Image alt="" src={logoAnimated} />
      </span>
      <div className="flex items-center bg-white rounded-full px-2 py-1 space-x-2">
        <Image
          src={searchIcon}
          alt="Search"
          style={{ width: 14, height: 14 }}
        />
        <input
          type="text"
          placeholder="Search here"
          className="bg-transparent border-none focus:ring-0 max-w-32 text-sm h-"
        />
      </div>
    </>
  );
}
