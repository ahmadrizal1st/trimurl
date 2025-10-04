import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditURL() {
  const { shortID } = useParams<{ shortID: string }>();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState(24);
  const [tag, setTag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (shortID) {
      fetch(`/api/v1/${shortID}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            setUrl(data.url);
          } else {
            setError("URL not found");
          }
        })
        .catch(() => setError("Failed to fetch URL"))
        .finally(() => setFetchLoading(false));
    }
  }, [shortID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortID) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/${shortID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          expiry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update URL");
      } else {
        navigate("/");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!shortID) return;
    if (!confirm("Are you sure you want to delete this URL?")) return;

    try {
      const response = await fetch(`/api/v1/${shortID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        setError("Failed to delete URL");
      }
    } catch {
      setError("Network error");
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortID || !tag) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortID,
          tag,
        }),
      });

      if (response.ok) {
        setTag("");
        // Optionally, refresh or show success
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add tag");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error && !url) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
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
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update URL"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Delete URL
          </button>
        </div>
      </form>
      <form onSubmit={handleAddTag} className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">Add Tag</h3>
        <div>
          <label className="block mb-1 font-semibold">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter tag"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Tag"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default EditURL;
