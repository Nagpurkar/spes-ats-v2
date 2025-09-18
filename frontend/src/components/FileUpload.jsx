import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [cvFile, setCvFile] = useState(null);
  const [pastedCv, setPastedCv] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleCvFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handlePastedCvChange = (e) => {
    setPastedCv(e.target.value);
  };

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleCvUpload = async () => {
    if (!cvFile) {
      setMessage('Please select a CV file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('cv', cvFile);
    try {
      const res = await axios.post('http://localhost:3001/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error uploading CV.');
    }
  };

  const handlePastedCvSubmit = async () => {
    if (!pastedCv) {
      setMessage('Please paste CV text.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/paste-cv', { text: pastedCv });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error submitting pasted CV.');
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      setMessage('Please select an Excel file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('excel', excelFile);
    try {
      const res = await axios.post('http://localhost:3001/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error uploading Excel file.');
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      {message && <p>{message}</p>}

      <div>
        <h3>Upload Single CV (Word/PDF)</h3>
        <input type="file" accept=".doc,.docx,.pdf" onChange={handleCvFileChange} />
        <button onClick={handleCvUpload}>Upload CV</button>
      </div>

      <div>
        <h3>Paste CV Text</h3>
        <textarea rows="10" cols="50" value={pastedCv} onChange={handlePastedCvChange}></textarea>
        <br />
        <button onClick={handlePastedCvSubmit}>Submit Pasted CV</button>
      </div>

      <div>
        <h3>Bulk Upload Excel File</h3>
        <input type="file" accept=".xls,.xlsx" onChange={handleExcelFileChange} />
        <button onClick={handleExcelUpload}>Upload Excel</button>
      </div>
    </div>
  );
};

export default FileUpload;
