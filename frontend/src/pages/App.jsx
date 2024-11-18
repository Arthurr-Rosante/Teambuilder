import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const { exp } = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);

        if (exp > now) {
          navigate('/home')
        } else {
          localStorage.removeItem('token');
          navigate('/authenticate');
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message)
        localStorage.removeItem('token');
        navigate('/authenticate')
      }
    } else {
      navigate('/authenticate')
    }

    document.title = 'TeamBuilder'
  }, []);

  return (
    <div id="app">
      <Outlet />
    </div>
  )

}

export default App
