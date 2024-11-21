import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

import UserMenu from "../components/UserMenu.jsx";
import "../styles/home.css";

function Home() {
  const { user, loading, error } = useUser();

  useEffect(() => {
    if (user) {
      document.title = `TeamBuilder | ${user.name}`;
    }

    return () => {
      document.title = "TeamBuilder";
    };
  }, [user]);

  if (loading) return <div id="loading"></div>;
  if (error) return <div id="error">Erro: {error}</div>;

  return (
    <div className="home">
      <header>{user && <UserMenu />}</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
