import truncateText from "@/utils/functions/truncateText";
import Image from "next/image";

import mediaFallbackImage from "../../../../../assets/images/story/default.webp";
import userHackerIcon from "../../../../../assets/icons/user-hacker.svg";
import Dots from "../Dots";

export default function Story({ story, storyCount }: any) {
  return (
    <div className="h-52 2xl:h-64 w-full relative rounded-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] z-10 pointer-events-none"></div>
      <Image
        src={
          story.media_urls.length > 0 ? story.media_urls[0] : mediaFallbackImage
        }
        alt="Story image"
        layout="fill"
        objectFit="cover"
        className="transition-all duration-1000 ease-out hover:scale-110 hover:rotate-1"
      />
      <div className="absolute w-full bottom-0 flex flex-col items-center pb-4 space-y-2 z-20   ">
        <Image
          src={story.user_profiles.avatar_url || userHackerIcon}
          alt="Avatar"
          className="rounded-full border-2 border-white bg-white"
          style={{ width: 48, height: 48 }}
        />
        <div className="text-white w-fit text-xs p-1 bg-black bg-opacity-50 rounded-md">
          {truncateText(story.user_profiles.nickname, 10)}
        </div>
        <Dots count={storyCount} />
      </div>
    </div>
  );
}
