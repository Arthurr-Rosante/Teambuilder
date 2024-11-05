import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './styles/index.css';

import App from './pages/App.jsx'
import Home from './pages/Home.jsx'
import AuthForm from './pages/AuthForm.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import EntryPage from './pages/EntryPage.jsx'


const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/authenticate",
        element: <AuthForm />
      },
      {
        path: "/entry/:name",
        element: <EntryPage />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
