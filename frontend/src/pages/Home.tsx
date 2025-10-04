import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">URL Shortener</h2>
      <p className="text-gray-700 mb-4">Shorten your long URLs into manageable links.</p>
      <Link
        to="/shorten"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Shorten a URL
      </Link>
    </div>
  );
}

export default Home;
