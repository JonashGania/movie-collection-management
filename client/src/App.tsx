import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import HomePage from "./pages/home/HomePage";
import MoviesPage from "./pages/movies/MoviesPage"
import GenresPage from "./pages/genres/GenresPage"
import GenreMoviesPage from "./pages/moviesByGenres/GenreMoviesPage"
import MovieDetailsPage from "./pages/movieDetails/MovieDetailsPage"
import Watchlist from "./pages/watchlist/Watchlist";
import ErrorPage from "./pages/error/ErrorPage";
import ProtectedRoutes from "./route/ProtectedRoutes";
import Root from "./route/root";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-in" element={<SignIn />}/>
                    <Route element={<Root />}>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/movies" element={<MoviesPage />}/>
                            <Route path="/genres" element={<GenresPage />} />
                            <Route path="/genres/:genreId" element={<GenreMoviesPage />} />
                            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                        </Route>
                    </Route>
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
