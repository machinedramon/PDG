import React, { useEffect } from "react";
import Image from "next/image";
import userAvatar from "../../../../../assets/icons/user-hacker.svg";
import commentsIcon from "../../../../../assets/icons/comments.svg";
import likesIcon from "../../../../../assets/icons/heart.svg";
import likesIconFilled from "../../../../../assets/icons/heart-filled.svg";
import shareIcon from "../../../../../assets/icons/share.svg";
import Counter from "../../Counter";

interface PostProps {
  post_id: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  imageSrc: string;
  caption: string | null;
  comment_count: number | null;
  like_count: [] | null;
  isLiked: boolean;
  onLike: () => void;
}

const Post = ({
  post_id,
  avatarUrl,
  nickname,
  imageSrc,
  caption,
  comment_count,
  like_count,
  isLiked,
  onLike,
}: PostProps) => {
  const handlePostClick = () => {
    console.log(`Redirecionando para /posts/${post_id}`);
  };

  const likes = like_count?.length;

  return (
    <div className="bg-[#1F1F27] rounded-lg border border-[#29292F] overflow-hidden hover:scale-[1.01] transition-transform duration-300 ease-out">
      <div className="flex items-center space-x-3 p-4 border-b border-[#29292F]">
        <div className="flex w-[62%] items-center space-x-3 justify-start">
          <button className="block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 focus:outline-none focus:border-white transition-transform duration-200 hover:scale-110 bg-white">
            <Image
              src={avatarUrl !== "" ? avatarUrl : userAvatar}
              alt="Avatar"
              className="rounded-full h-12 w-12"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </button>
          <span className="text-white font-semibold">{nickname}</span>
        </div>
        <div className="flex items-center justify-end  space-x-2 w-[38%]">
          <Counter iconPath={commentsIcon} count={comment_count} />
          <Counter
            iconPath={isLiked ? likesIconFilled : likesIcon}
            count={likes}
            onClick={onLike}
          />
          <Counter iconPath={shareIcon} />
        </div>
      </div>

      {/* Post image */}
      <div className="w-full">
        <Image src={imageSrc} alt="Post image" width={600} height={400} />
      </div>

      {caption && (
        <div className="p-4 flex w-full justify-between items-center space-x-4">
          <p className="text-white w-full">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
