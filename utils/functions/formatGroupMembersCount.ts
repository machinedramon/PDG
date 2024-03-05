export default function formatGroupMembersCount(count: number | null) {
  if (count === null) return "Unknown";
  if (count < 1000) return count.toString(); // Se for menor que 1000, apenas retorna o número
  if (count < 1000000) return (count / 1000).toFixed(1) + "K"; // Se for menor que 1 milhão, retorna em K
  return (count / 1000000).toFixed(1) + "M"; // Se for maior ou igual a 1 milhão, retorna em M
}
