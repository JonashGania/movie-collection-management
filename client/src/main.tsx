import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.navigate) {
        const navigate = query.meta.navigate;
        if ((error as any).response?.status === 404) {
          navigate('/error'); 
        }
      }
    }
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Toaster />
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
