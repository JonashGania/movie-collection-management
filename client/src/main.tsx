import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Root from './route/root'
import HomePage from './pages/home/HomePage'
import MoviesPage from './pages/movies/MoviesPage'
import GenresPage from './pages/genres/GenresPage'
import GenreMoviesPage from './pages/moviesByGenres/GenreMoviesPage'
import AddMoviePage from './pages/addMovie/AddMoviePage'
import './styles/index.css'

const router = createBrowserRouter([
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
