import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/home")
    } else {
      navigate("/authenticate")
      document.title = "TeamBuilder"
    }
  }, []);

  return (
    <div id="app">
      <Outlet />
    </div>
  )

}

export default App
