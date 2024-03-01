// components/Sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import groupDefaultIcon from "../../../assets/icons/dual.svg";
import searchIcon from "../../../assets/icons/search.svg"; // Adicione o caminho correto para o ícone de busca
import friendsIcon from "../../../assets/icons/friends.svg";
import marketplaceIcon from "../../../assets/icons/market.svg";
import mostRecentIcon from "../../../assets/icons/recent.svg";
import groupIcon from "../../../assets/icons/group.svg";
import watchIcon from "../../../assets/icons/watch.svg";
import seeMoreIcon from "../../../assets/icons/arrow-down.svg"; // Supondo que esse é o ícone para "See More"
import storiesIcon from "../../../assets/icons/stories.svg";
import megaphoneIcon from "../../../assets/icons/megaphone.svg";
import notificationIcon from "../../../assets/icons/notification.svg";
import picsIcon from "../../../assets/icons/pics.svg";
import keyboardIcon from "../../../assets/icons/keyboard.svg";

interface Group {
  avatar_url: string | null;
  banner_url: string | null;
  group_id: string;
  members_count: number | null;
  name: string;
  role: string;
}

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

export default function Sidebar() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isShortcutsExpanded, setIsShortcutsExpanded] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);

  const menuItemsData = isMenuExpanded ? menuItems : menuItems.slice(0, 5);

  const visibleGroups = isShortcutsExpanded ? groups : groups.slice(0, 3);

  const RoleChip = ({ role }: { role: string }) => {
    let bgColor = "bg-gray-500"; // Default color for member
    if (role === "owner") bgColor = "bg-blue-500";
    else if (role === "admin") bgColor = "bg-green-500";

    return (
      <span
        className={`${bgColor} text-white text-[8px] font-semibold px-2 py-1 rounded-lg ml-2`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();

      if (user) {
        const { data: memberships, error } = await supabase
          .from("group_members")
          .select(
            `
            role,
            groups (group_id, name, avatar_url, banner_url, members_count)
          `
          )
          .eq("user_id", user.user?.id)
          .order("role", { ascending: false });

        if (error) {
          console.error("Error fetching group memberships:", error);
          return;
        }

        // A chave aqui é garantir que a transformação produza um array do tipo Group[]
        const transformedGroups: Group[] = memberships.map(
          ({ groups, role }: any) => ({
            group_id: groups.group_id,
            name: groups.name,
            avatar_url: groups.avatar_url,
            banner_url: groups.banner_url,
            members_count: groups.members_count,
            role,
          })
        );

        setGroups(transformedGroups);
      }
      setLoadingGroups(false);
    };

    fetchGroups();
  }, []);

  return (
    <div
      className={`h-screen max-w-[300px] bg-secondaryBlack text-white 
      grid ${
        isMenuExpanded
          ? "grid-rows-[auto_minmax(0,80%)_minmax(0,20%)_auto]"
          : "grid-rows-[auto_minmax(0,60%)_minmax(0,40%)_auto]"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Área 1: Logo e Busca */}
      <div className="px-4 flex items-center justify-between h-20">
        <span className="font-bold text-xl">PDG?</span>
        <div className="flex items-center bg-white rounded-full px-2 py-1 space-x-2">
          <Image src={searchIcon} alt="Search" width={14} height={14} />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none focus:ring-0 max-w-32 text-sm h-"
          />
        </div>
      </div>

      {/* Área 2: Menu */}
      <div className="overflow-auto px-4 transition-all duration-500 ease-in-out">
        {/* Itens do Menu */}
        {menuItemsData.map((item, index) => (
          <button
            key={index}
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
          </button>
        ))}
        {/* Botão "See More" para o menu */}
        <button
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className="flex items-center justify-start w-full h-14 my-2 hover:bg-[#29292F] rounded-md transition duration-300 cursor-pointer"
        >
          <Image
            src={seeMoreIcon}
            alt="See More"
            width={32}
            height={32}
            className={`mx-2 transition-transform duration-500 ${
              isMenuExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
          <span className="ml-4">
            {isMenuExpanded ? "See Less" : "See More"}
          </span>
        </button>
      </div>

      {/* Área 3: Atalhos */}
      <div className="border-t border-[#29292F] p-4 overflow-auto transition-all duration-500 ease-in-out">
        <p className="font-bold text-sm">Your Shortcuts</p>
        {/* Atalhos */}
        {loadingGroups ? (
          <div>Loading...</div>
        ) : (
          visibleGroups.map((group) => (
            <button
              key={group.group_id}
              className="flex items-center w-full h-14 my-2 hover:bg-[#29292F] rounded-md transition duration-300 cursor-pointer"
            >
              <Image
                src={group.avatar_url || groupDefaultIcon}
                alt="Group Avatar"
                width={32}
                height={32}
                className="rounded-full bg-[#333339] mx-2"
              />
              <div className="flex w-full flex-col items-start">
                <div className="ml-4">{group.name}</div>
                <span className="ml-4 text-xs flex items-center">
                  Members: {group.members_count} <RoleChip role={group.role} />
                </span>
              </div>
            </button>
          ))
        )}
        {/* Botão "See More" para atalhos, mostrado apenas se houver mais de 3 atalhos */}
        {groups.length > 3 && (
          <button
            onClick={() => setIsShortcutsExpanded(!isShortcutsExpanded)}
            className="flex items-center justify-start w-full h-14 my-2 hover:bg-[#29292F] rounded-md transition duration-300 cursor-pointer"
          >
            <Image
              src={seeMoreIcon}
              alt="See More"
              width={32}
              height={32}
              className={`mx-2 transition-transform duration-300 ${
                isShortcutsExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className="ml-4">
              {isShortcutsExpanded ? "See Less" : "See More"}
            </span>
          </button>
        )}
      </div>

      {/* Área 4: Footer */}
      <div className="flex flex-col items-center justify-center text-xs px-4 h-16">
        <div className="flex space-x-1 mb-2">
          <Link href="/privacy">Privacy</Link>
          <span>·</span>
          <Link href="/terms">Terms</Link>
          <span>·</span>
          <Link href="/advertising">Advertising</Link>
          <span>·</span>
          <Link href="/cookies">Cookies</Link>
          <span>·</span>
          <Link href="/more">More</Link>
        </div>
        <p>© PDG 2024</p>
      </div>
    </div>
  );
}
