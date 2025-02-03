// src/components/TicketForm.js
import React, { useState } from 'react';

const TicketForm = () => {
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Construct the payload
    const payload = {
      short_description: shortDesc,
      long_description: longDesc,
    };

    try {
      // Replace the URL with your backend endpoint URL.
      // For example, if your backend is running on http://localhost:8000
      const response = await fetch('http://localhost:8000/score/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Ticket Quality Checker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Short Description:</label>
          <input
            type="text"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter a brief description"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Long Description:</label>
          <textarea
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter the full description"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Ticket'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {result && (
        <div className="mt-4 p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">Ticket Analysis</h3>
          <p>
            <strong>Quality Score:</strong> {result.characteristic_score}
          </p>
          <p>
            <strong>Assigned Cluster:</strong> {result.top_cluster}
          </p>
          {/* Optionally, list common keywords or matched elements */}
          {result.matched_elements && (
            <div>
              <strong>Matched Elements:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(result.matched_elements).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketForm;
