import * as dotenv from 'dotenv';
import axios from "axios";
import { formatTitle } from "./formatTitle.js";

dotenv.config();

export const fetchMoviePoster = async (title: string) => {
    try {
        const movieTitle = formatTitle(title);

        const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movieTitle}`)
        return data.Response === 'True' && data.Poster && data.Poster !== 'N/A' ? data.Poster : 'N/A';
    } catch (error) {
        return 'N/A';
    }
}