import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TokenContextProvider from './components/Contexts/Token Context/TokenContext.tsx'
import UserContextProvider from './components/Contexts/User Context/UserContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient= new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenContextProvider>
      <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
      </QueryClientProvider>
    </TokenContextProvider>
  </StrictMode>,
)
