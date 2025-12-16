import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const queryClient = new QueryClient()
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
  </Elements>
    
  </StrictMode>
)
