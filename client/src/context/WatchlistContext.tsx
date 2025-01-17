import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddToWatchlist, getWatchlist, removeFromWatchlist } from "@/api";
import { Watchlist } from "@/types";

interface WatchlistContextProps {
    watchlist: Watchlist | undefined,
    isLoading: boolean, 
    isAdding: (movieId: string) => boolean,
    addMovieToWatchlist: (movieId: string) => void,
    removeMovieFromWatchlist: (movieId: string) => void,
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);

    if (!context) {
        throw new Error('useWishlist must be used within an WatchlistProvider');
    }

    return context;
}

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const [loadingMovies, setLoadingMovies] = useState<Record<string, boolean>>({})
    const queryClient = useQueryClient();

    const { data: watchlist, isLoading } = useQuery({
        queryKey: ['watchlist'],
        queryFn: getWatchlist,
    })

    const { mutate: addToWatchlistMutation } = useMutation({
        mutationFn: postAddToWatchlist,
        onMutate: (movieId: string) => {
            setLoadingMovies((prev) => ({...prev, [movieId]: true }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlist'] })
        },
        onSettled: (_data, _error, movieId) => {
            setLoadingMovies((prev) => {
                const updated = {...prev};
                delete updated[movieId];
                return updated
            })
        },
    })

    const { mutate: removeFromWatchlistMutation} = useMutation({
        mutationFn: removeFromWatchlist,
        onMutate: (movieId: string) => {
            setLoadingMovies((prev) => ({ ...prev, [movieId]: true }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlist'] })
        },
        onSettled: (_data, _error, movieId) => {
            setLoadingMovies((prev) => {
                const updated = {...prev};
                delete updated[movieId];
                return updated
            })
        },
    })

    const addMovieToWatchlist = (movieId: string) => {
        addToWatchlistMutation(movieId);
    }

    const removeMovieFromWatchlist = (movieId: string) => {
        removeFromWatchlistMutation(movieId);
    }

    const isAdding = (movieId: string) => !!loadingMovies[movieId]

    return (
        <WatchlistContext.Provider 
            value={{ 
                watchlist, 
                isLoading,
                isAdding, 
                addMovieToWatchlist,
                removeMovieFromWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    )
}
