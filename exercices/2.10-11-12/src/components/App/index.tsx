import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Header urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg">
        <NavBar />
      </Header>

      <main className="main-content">
        <Outlet />
      </main>

      <Footer urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg" />
    </div>
  );
}

export default App;
