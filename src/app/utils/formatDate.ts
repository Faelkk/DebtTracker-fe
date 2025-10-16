export function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }).format(date);
}