import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <>
      <InputComp />
    </>
  );
}

function InputComp() {
  const [prompt, setPrompt] = useState("");
  const [resi, setResi] = useState("");

  const handleSubmit = () => {
    axios.post('http://localhost:3000/completion', {
      prompt,
    })
      .then(res => {
        setResi(res.data);
      })
      .catch(error => {
        console.error('Error fetching response:', error);
      });
  };

  return (
    <div>
      <div className="flex justify-center text-xl font-semibold">Ask AI</div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
        Your Query
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your question here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {resi && resi.result && resi.result.response && resi.result.response.candidates && (
        <textarea rows={80} cols={80} className='ml-3 mt-5'>
          {resi.result.response.candidates[0].content.parts[0].text}
        </textarea>
      )}
    </div>
  );
}

export default App;