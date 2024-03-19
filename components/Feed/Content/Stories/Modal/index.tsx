import { motion } from "framer-motion";

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
        {image && (
          <div className="w-full max-w-60 h-96 rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Story Preview"
              className="min-h-full min-w-full object-cover"
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
