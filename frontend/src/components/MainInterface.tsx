import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

interface MainInterfaceProps {
  backendName: string;
}

const MainInterface: React.FC<MainInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [newWordCloud, setnewWordCloud] = useState({ text: '', file:''});

  const backgroundColors: { [key: string]: string } = {
    flask: 'bg-blue-500',
  };

  const buttonColors: { [key: string]: string } = {
    flask: 'bg-blue-700 hover:bg-blue-600',
  };

  const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
  const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';


  const downloadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/download`, newWordCloud);
      console.log(response);
      // return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error download:', error);
    }
  };


  return (
    <div className={`main-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
      <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
      <h2 className="text-xl font-bold text-center text-white mb-6">{`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}</h2>

      <form onSubmit={downloadFile} className="mb-6 p-4 bg-blue-100 rounded shadow">
        <textarea
          placeholder="Name"
          rows={10}
          value={newWordCloud.text}
          onChange={(e) => setnewWordCloud({ ...newWordCloud, text: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type='file'
          value={newWordCloud.file}
          onChange={(e) => setnewWordCloud({ ...newWordCloud, file: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Wordcloud erstellen
        </button>
      </form>
    </div>
  );
};

export default MainInterface;
