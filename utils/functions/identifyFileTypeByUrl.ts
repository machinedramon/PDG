export default function identifyFileTypeByUrl(url: any) {
  // Define regex patterns for video and image file extensions
  const videoPattern = /\.(mp4|webm|ogg|mkv)(\?.*)?$/;
  const imagePattern = /\.(jpeg|jpg|png|gif|svg|webp)(\?.*)?$/;

  // Match the url against the video and image patterns
  const videoMatch = url.match(videoPattern);
  const imageMatch = url.match(imagePattern);

  // Determine the file type and specific extension
  if (videoMatch) {
    return { type: "video", fileType: videoMatch[1] };
  } else if (imageMatch) {
    return { type: "image", fileType: imageMatch[1] };
  } else {
    // If the url doesn't match any of the patterns, return "unknown" with no specific fileType
    return { type: "unknown", fileType: null };
  }
}
