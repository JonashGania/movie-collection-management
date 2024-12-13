import slug from 'slug'

export const movieTitleSlug = (title: string, year: string) => {
    return slug(`${title}-${year}`, { 
        lower: true, 
        remove: /[*+~.()'"!:@]/g 
    })
}


