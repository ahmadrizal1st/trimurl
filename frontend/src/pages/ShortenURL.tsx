import React, { useState } from "react";

function ShortenURL() {
  const [url, setUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [expiry, setExpiry] = useState(24);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          short: customShort,
          expiry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to shorten URL");
      } else {
        setResult(data.short);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shorten URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">URL to shorten</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Custom short (optional)</label>
          <input
            type="text"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="my-short-link"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Expiry (hours)</label>
          <input
            type="number"
            value={expiry}
            onChange={(e) => setExpiry(Number(e.target.value))}
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="font-semibold">Shortened URL:</p>
          <a href={result} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {result}
          </a>
        </div>
      )}
    </div>
  );
}

export default ShortenURL;
