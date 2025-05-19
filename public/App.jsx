import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    const formData = new FormData();
    formData.append('audio', file);

    const response = await axios.post('http://localhost:10000/api/convert', formData);
    setDownloadUrl(response.data.downloadUrl);
  };

  return (
    <div className="App">
      <h1>Audio Converter App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert to MP3</button>

      {downloadUrl && (
        <div>
          <h3>Download Converted File:</h3>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download</a>
        </div>
      )}
    </div>
  );
}

export default App;
