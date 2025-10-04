import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ShortenURL from "./pages/ShortenURL";
import RedirectURL from "./pages/RedirectURL";
import EditURL from "./pages/EditURL";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <nav className="mb-6 flex space-x-4 bg-white p-4 rounded shadow">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-blue-600 hover:underline">
            About
          </Link>
        </nav>
        <div className="container mx-auto bg-white p-6 rounded shadow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shorten" element={<ShortenURL />} />
            <Route path="/edit/:shortID" element={<EditURL />} />
            <Route path="/:shortID" element={<RedirectURL />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
