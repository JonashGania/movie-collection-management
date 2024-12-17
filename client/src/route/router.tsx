import { createBrowserRouter } from "react-router-dom"
import Root from "./root"
import HomePage from "@/pages/home/HomePage"
import MoviesPage from "@/pages/movies/MoviesPage"
import GenresPage from "@/pages/genres/GenresPage"
import GenreMoviesPage from "@/pages/moviesByGenres/GenreMoviesPage"
import AddMoviePage from "@/pages/addMovie/AddMoviePage"
import MovieDetailsPage from "@/pages/movieDetails/MovieDetailsPage"

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/movies',
          element: <MoviesPage />
        },
        {
          path: '/movies/:movieId',
          element: <MovieDetailsPage />
        },
        {
          path: '/genres',
          element: <GenresPage />,
        },
        {
          path: '/genres/:genreId',
          element: <GenreMoviesPage />
        }
      ]
    },
    {
      path: '/add-movie',
      element: <AddMoviePage />
    }
  ])