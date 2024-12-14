import { MovieFormState, MovieFormAction } from "@/types"

export const initialState = {
    title: '',
    release_date: '',
    description: '',
    duration: 0,
    rating: 0,
    genres: [],
    directors: [''],
    actors: ['']
}

export const movieFormReducer = (state: MovieFormState, action: MovieFormAction): MovieFormState =>  {
    switch(action.type) {
        case "SET_FIELD":
            return {...state, [action.field]: action.value};
        case "SET_GENRES":
            return {...state, genres: action.genres}
        case "SET_DIRECTORS":
            return {...state, directors: action.directors}
        case "SET_ACTORS":
            return {...state, actors: action.actors}
        case "RESET":
            return initialState
        default:
            throw new Error("Unknown action type")
    }
}