// frontend/src/AI.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

const AI = () => {
  const [Prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('http://localhost:3000/api/ai/addprompt', { Prompt });
      setResponse(result.data.answer);
    } catch (error) {
      setResponse('Error getting response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-4">
      <h1 className="text-2xl font-bold text-center mb-6"> AI Assistant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="Prompt" className="mb-2 font-medium text-gray-700">Ask a question:</label>
          <input
            type="text"
            id="Prompt"
            value={Prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">AI Response:</h2>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default AI;
