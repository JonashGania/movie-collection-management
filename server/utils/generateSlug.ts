import { v4 as uuidV4 } from 'uuid';

export const generateMovieSlug = (title: string, year: string) => {
    const sanitizedTitle =  encodeURIComponent(title.trim().toLowerCase().replace(/:/g, '')).replace(/%20/g, '-');
    const releaseYear = new Date(year).getFullYear().toString();
    const firstLast = title[0].toLowerCase() + title[title.length - 1].toLowerCase();
    const uuid = uuidV4();
    const last5chars = uuid.slice(-5);

    return `${sanitizedTitle}-${releaseYear}-${firstLast}-${last5chars}`
}


