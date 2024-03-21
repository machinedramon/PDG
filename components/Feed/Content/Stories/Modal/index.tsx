import identifyFileTypeByUrl from "@/utils/functions/identifyFileTypeByUrl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Modal = ({
  image,
  text,
  setText,
  onClose,
  onSubmit,
  isSubmitting,
}: any) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };

  // Estado para armazenar a URL do objeto e o tipo de arquivo
  const [filePreview, setFilePreview] = useState<any>({
    url: null,
    type: null,
  });

  // Atualize a URL do objeto e o tipo de arquivo somente quando a imagem mudar
  useEffect(() => {
    if (image) {
      const objectURL = URL.createObjectURL(image);
      const fileInfo = identifyFileTypeByUrl(objectURL);
      setFilePreview({
        url: objectURL,
        type: fileInfo.type,
      });

      // Limpe a URL do objeto ao desmontar para evitar vazamentos de memória
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
  }, [image]);

  const isImage = image && image.type.startsWith("image");
  const isVideo = image && image.type.startsWith("video");

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="w-full max-w-xl p-6 bg-[#1F1F27] rounded-lg flex flex-row items-center gap-4 shadow-xl overflow-auto"
        style={{ maxHeight: "90vh" }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {isImage && filePreview.url && (
          <div className="w-full max-w-60 h-96 rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
            <img
              src={filePreview.url}
              alt="Story Preview"
              className="min-h-full min-w-full object-cover"
            />
          </div>
        )}
        {isVideo && filePreview.url && (
          <div className="w-full max-w-60 h-96 rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
            <video
              src={filePreview.url}
              className="min-h-full min-w-full object-cover"
              playsInline
              autoPlay
              loop
            />
          </div>
        )}
        <div className="">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add some text to your story..."
            className="resize-none rounded-lg p-4 border border-gray-700 bg-[#29292F] text-white"
            style={{ minHeight: "100px" }}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onSubmit}
              className={`p-2.5 rounded-lg cursor-pointer bg-[#ED143D] text-white font-semibold hover:bg-[#f2163d] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Story"}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-lg cursor-pointer bg-gray-700 text-white font-semibold hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
