import React from "react";
import Image from "next/image";
import formatGroupMembersCount from "@/utils/functions/formatGroupMembersCount";

export default function Counter({ iconPath, count, onClick }: any) {
  const formattedCount = formatGroupMembersCount(count);

  return (
    <div
      className="flex items-center justify-center space-x-2 hover:scale-110 transition-all ease-out duration-300 cursor-pointer"
      onClick={onClick}
    >
      <Image src={iconPath} alt="Icon" width={24} height={24} />
      {count >= 0 && (
        <span className="text-white text-xs h-4 w-fit flex items-center justify-center">
          {formattedCount}
        </span>
      )}
    </div>
  );
}
