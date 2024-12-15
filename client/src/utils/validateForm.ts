import { MovieFormState } from "@/types"

export const validateForm = (state: MovieFormState): string[] => {
    const errors: string[] = [];
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const hasEmptyStrings = (arr: string[]) => arr.some(item => !item.trim());

    if (!state.title.trim()) errors.push("Title is required.");
    if (!state.description.trim()) errors.push("Description is required.");
    if (!state.duration || !Number.isInteger(state.duration)){
        errors.push('Duration must be a valid number in minutes.');
    }
    if (state.rating > 10 || state.rating < 0 ) {
        errors.push('Rating must be a number between 0 and 10.');
    }
    if (!state.release_date.trim()) {
        errors.push("Release date is required.")
    } else if (!dateRegex.test(state.release_date)) {
        errors.push("Release date must be in this format 'YYYY-MM-DD'.");
    }

    if (state.genres.length === 0) errors.push('At least 1 genre must be selected.');
    if (state.actors.length === 0) {
        errors.push('At least 1 actor must be added.');
    } else if (hasEmptyStrings(state.actors)) {
        errors.push('Actor names cannot contain only whitespace.')
    }
    if (state.directors.length === 0) {
        errors.push('At least 1 director must be added.');
    } else if (hasEmptyStrings(state.directors)) {
        errors.push('Director names cannot contain only whitespace.')
    }

    return errors;
}