import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './styles/index.css';

// PAGES
import App from './pages/App.jsx'
import Home from './pages/Home.jsx'
import AuthForm from './pages/AuthForm.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import EntryPage from './pages/EntryPage.jsx'
// COMPONENTS
import TeamCreate from './components/TeamCreate.jsx';
import TeamEdit from './components/TeamEdit.jsx';
import InfiniteScroll from "./components/InfiniteScroll.jsx";
import Landpage from './pages/Landpage.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import LoginForm from './pages/LoginForm.jsx';


const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Landpage />
      },
      {
        path: "home",
        element:
          <Home />
        ,
        children: [
          {
            path: "",
            element: <InfiniteScroll btn={true} />
          },
          {
            path: "teams/create",
            element:
              <TeamCreate />

          },
          {
            path: "teams/edit/:teamId",
            element:
              <TeamEdit />

          }
        ]
      },
      {
        path: "authenticate",
        children: [
          {
            path: "register",
            element: <RegisterForm />,
          }, {
            path: 'login',
            element: <LoginForm />
          }
        ]
      },
      {
        path: "entry/:name",
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
