import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import UserMenu from "../components/UserMenu.jsx";
import InfiniteScroll from "../components/InfiniteScroll.jsx";
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
        <InfiniteScroll btn={true} />
      </main>
    </div>
  );
}

export default Home;
