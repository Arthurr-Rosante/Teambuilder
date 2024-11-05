import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth.js'
import UserMenu from '../components/UserMenu.jsx';
import InfiniteScroll from '../components/InfiniteScroll.jsx';
import '../styles/home.css'

function Home() {
  const { user, logout, loading, error } = useAuth();

  useEffect(() => {
    if (user) {
      document.title = `TeamBuilder | ${user.name}`
    }
  }, [user, logout]);

  const [searchParam, setSearchParam] = useState("");
  const [nameOrId, setNameOrId] = useState("");
  const handleSearch = () => {
    setNameOrId(searchParam);
  }

  if (loading) return <div id='loading'>Loading...</div>
  if (error) return <div>Oops... <b>{error}</b></div>

  return (
    <div className="home">
      <header>
        <div className="search-container">
          <p>Busque por <b>Nome</b> ou <b>Id</b></p>
          <input
            type="text"
            id="inSearch"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)} />
          <button onClick={handleSearch}><i className='bx bx-search-alt'></i></button>
        </div>
        {user && <UserMenu user={user} logout={logout} />}
      </header>
      <main>
        <InfiniteScroll />
      </main>
    </div>
  )
}

export default Home