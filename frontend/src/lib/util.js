export function formatDate(date){
    return date.toLocaleDateString("pt-BR",{
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}