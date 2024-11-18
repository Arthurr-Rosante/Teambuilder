import { UserProvider } from "../contexts/UserContext.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <div id="app">
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App
