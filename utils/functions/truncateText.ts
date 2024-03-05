export default function truncateText(text: string): string {
  if (text.length <= 22) return text;
  return text.slice(0, 19) + "...";
}
