"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import seeMoreIcon from "../../../../assets/icons/arrow-down.svg";
import groupDefaultIcon from "../../../../assets/icons/dual.svg";
import RoleChip from "../RoleChip";
import SidebarShortcutsSkeleton from "../Skeletons/SidebarShortcutsSkeleton";
import formatGroupMembersCount from "@/utils/functions/formatGroupMembersCount";
import Link from "next/link";
import truncateText from "@/utils/functions/truncateText";
import { AnimatePresence, motion } from "framer-motion";

interface Group {
  avatar_url: string | null;
  banner_url: string | null;
  group_id: string;
  members_count: number | null;
  name: string;
  role: string;
}

export default function Shortcuts() {
  const [isShortcutsExpanded, setIsShortcutsExpanded] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const visibleGroups = isShortcutsExpanded ? groups : groups.slice(0, 3);

  useEffect(() => {
    async function fetchGroups() {
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
      setIsLoading(false);
    }

    fetchGroups();
  }, []);

  if (isLoading) {
    return (
      <>
        <p className="font-bold text-sm pt-4">Your Shortcuts</p>
        <SidebarShortcutsSkeleton />
      </>
    );
  }

  return (
    <>
      <p className="font-bold text-sm pt-4">Your Shortcuts</p>

      {/* Atalhos */}
      <AnimatePresence>
        {visibleGroups.map((group) => (
          <motion.button
            key={group.group_id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "6rem" }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center w-full h-24 my-2 hover:bg-[#29292F] rounded-md transition duration-300 cursor-pointer"
          >
            <Image
              src={group.avatar_url || groupDefaultIcon}
              alt="Group Avatar"
              className="rounded-full bg-[#333339] mx-2 hover:scale-110 duration-300 transition-all"
              style={{ width: 48, height: 48 }}
            />
            <div className="flex w-full flex-col items-start space-y-1">
              <RoleChip role={group.role} />
              <div className="ml-2 truncate">
                {truncateText(group.name, 16)}
              </div>
              <Link href={"/"} className="transition-all">
                <span className="text-xs hover:bg-[#181820] py-1 px-2 rounded-md hover:px-3 hover:ml-2 duration-300 transition-all">
                  Members: {formatGroupMembersCount(group.members_count)}
                </span>
              </Link>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Botão "See More" para atalhos, mostrado apenas se houver mais de 3 atalhos */}
      {groups.length > 3 && (
        <motion.button
          onClick={() => setIsShortcutsExpanded(!isShortcutsExpanded)}
          className="flex items-center justify-center w-full h-8 my-2 space-x-2 bg-[#29292F] hover:bg-[#36363e] rounded-md duration-300 transition cursor-pointer"
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
        >
          <Image
            src={seeMoreIcon}
            alt="See More"
            width={22}
            height={22}
            className={`duration-300 transition-transform ${
              isShortcutsExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
          <span className="text-sm">
            {isShortcutsExpanded ? "See Less" : "See More"}
          </span>
        </motion.button>
      )}
    </>
  );
}
