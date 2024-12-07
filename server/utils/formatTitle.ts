export const formatTitle = (title: string) => {
    return encodeURIComponent(title.trim().toLowerCase().replace(/:/g, '')).replace(/%20/g, '+');
}