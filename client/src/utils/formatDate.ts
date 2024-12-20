export const formatDate = (dateValue: string) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-CA")
}