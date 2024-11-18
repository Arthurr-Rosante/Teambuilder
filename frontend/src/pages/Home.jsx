import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import UserMenu from "../components/UserMenu.jsx";
import "../styles/home.css";

function Home() {
  const { user, logout, loading, error } = useAuth();

  useEffect(() => {
    if (user) {
      document.title = `TeamBuilder | ${user.name}`;
    }
    
    return () => {
      document.title = "TeamBuilder";
    };
  }, [user]);

  if (loading) return <div id="loading">Loading...</div>;
  if (error)
    return (
      <div>
        Oops... <b>{error}</b>
      </div>
    );

  return (
    <div className="home">
      <header>{user && <UserMenu user={user} logout={logout} />}</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
