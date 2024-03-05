"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import friendsIcon from "../../../../assets/icons/friends.svg";
import marketplaceIcon from "../../../../assets/icons/market.svg";
import mostRecentIcon from "../../../../assets/icons/recent.svg";
import groupIcon from "../../../../assets/icons/group.svg";
import watchIcon from "../../../../assets/icons/watch.svg";
import storiesIcon from "../../../../assets/icons/stories.svg";
import megaphoneIcon from "../../../../assets/icons/megaphone.svg";
import notificationIcon from "../../../../assets/icons/notification.svg";
import picsIcon from "../../../../assets/icons/pics.svg";
import keyboardIcon from "../../../../assets/icons/keyboard.svg";
import seeMoreIcon from "../../../../assets/icons/arrow-down.svg";
import SidebarMenuSkeleton from "../Skeletons/SidebarMenuSkeleton";

const menuItems = [
  { icon: friendsIcon, label: "Friends" },
  { icon: marketplaceIcon, label: "Marketplace" },
  { icon: mostRecentIcon, label: "Most Recent" },
  { icon: groupIcon, label: "Groups" },
  { icon: watchIcon, label: "Watch" },
  { icon: storiesIcon, label: "Stories" },
  { icon: megaphoneIcon, label: "Megaphone" },
  { icon: notificationIcon, label: "Notifications" },
  { icon: picsIcon, label: "Pics" },
  { icon: keyboardIcon, label: "Setup" },
];

export default function Menu() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuItemsData = isMenuExpanded ? menuItems : menuItems.slice(0, 5);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <SidebarMenuSkeleton />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {menuItemsData.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "3.5rem" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.1 } }}
            className="flex items-center w-full h-14 my-2 hover:bg-[#29292F] rounded-md transition-colors duration-300"
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={32}
              height={32}
              className="mx-2"
            />
            <span className="ml-4">{item.label}</span>
          </motion.button>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsMenuExpanded(!isMenuExpanded)}
        className="flex items-center justify-center w-full h-8 my-2 space-x-2 bg-[#29292F] hover:bg-[#36363e] rounded-md transition duration-300 cursor-pointer"
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
      >
        <Image
          src={seeMoreIcon}
          alt="See More"
          width={22}
          height={22}
          className={`transition-transform duration-300 ${
            isMenuExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
        <span className="text-sm">
          {isMenuExpanded ? "See Less" : "See More"}
        </span>
      </motion.button>
    </>
  );
}
