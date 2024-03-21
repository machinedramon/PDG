import truncateText from "@/utils/functions/truncateText";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottiePlayer } from "@dotlottie/react-player";

import mediaFallbackImage from "../../../../../assets/images/story/default.webp";
import userHackerIcon from "../../../../../assets/icons/user-hacker.svg";
import Dots from "../Dots";
import identifyFileTypeByUrl from "@/utils/functions/identifyFileTypeByUrl";
import updateAnimation from "../../../../../assets/lottiefiles/spark.lottie"; // Caminho para o seu arquivo Lottie

export default function Story({ story, storyCount, isUpdated }: any) {
  const fileType =
    story.media_urls.length > 0
      ? identifyFileTypeByUrl(story.media_urls[0]).type
      : null;
  const mediaUrl =
    story.media_urls.length > 0 ? story.media_urls[0] : mediaFallbackImage;

  return (
    <AnimatePresence>
      <motion.div
        key={story.story_id} // Usar story_id como chave para rastrear mudanças
        layout
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="h-52 2xl:h-64 max-h-64 w-full relative rounded-md overflow-hidden"
      >
        {isUpdated && (
          <div className="absolute inset-0 z-20">
            <DotLottiePlayer
              src={updateAnimation}
              autoplay
              style={{ width: "100%", height: "100%", zIndex: 300 }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] z-10 pointer-events-none"></div>
        {fileType === "video" ? (
          <motion.video
            src={mediaUrl}
            playsInline
            autoPlay
            muted
            loop
            className="object-cover w-full h-full"
          ></motion.video>
        ) : (
          <Image
            src={mediaUrl}
            alt="Story image"
            layout="fill"
            objectFit="cover"
            className="transition-all duration-1000 ease-out hover:scale-110 hover:rotate-1"
            loading="lazy"
          />
        )}
        <div className="absolute w-full bottom-0 flex flex-col items-center pb-4 space-y-2 z-30">
          <Image
            src={story.user_profiles?.avatar_url || userHackerIcon}
            alt="Avatar"
            className="rounded-full border-2 border-white bg-white"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className="text-white w-fit text-xs p-1 bg-black bg-opacity-50 rounded-md">
            {truncateText(story.user_profiles?.nickname, 10)}
          </div>
          <Dots count={storyCount} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
