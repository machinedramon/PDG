export default function formatGroupMembersCount(count: number | null) {
  if (count === null) return "Unknown";

  if (count < 1000) return count.toString();
  if (count < 1000000) return `${Math.round(count / 100) / 10}K`; // Arredonda para centenas antes de converter para K
  if (count < 1000000000) return `${Math.round(count / 100000) / 10}M`; // Arredonda para 100 mil antes de converter para M
  if (count < 1000000000000) return `${Math.round(count / 100000000) / 10}B`; // Arredonda para 100 milhões antes de converter para B
  return `${Math.round(count / 100000000000) / 10}T`; // Arredonda para 100 bilhões antes de converter para T
}
