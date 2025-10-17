export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Verifica se é uma data válida
  if (isNaN(date.getTime())) return "-";

  return Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}
