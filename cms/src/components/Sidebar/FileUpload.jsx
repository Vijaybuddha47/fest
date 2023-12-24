import React, { useState } from 'react';
import { BASE_URL } from "../../config";
import ProgressBar from 'react-bootstrap/ProgressBar';
const baseUrl = `${BASE_URL}`;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

function FileUpload(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [totalChunks, setTotalChunks] = useState(0);
  const [uploadId, setUploadId] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInput = React.createRef();
  const progressBar = React.createRef();
  const [fileData, setFiledata] = useState('');

  const sendFileData = (data) => {
    // Invoke the callback function provided by the parent
    // console.log("dsajfhsfah");
    // console.log(data);
    props.sendFileData(data);
  };

  const handleFileChange = () => {
    const selectedFile = fileInput.current.files[0];
    setFile(selectedFile);
    const generatedFileName = Date.now().toString() + '_' + selectedFile.name;
    setFileName(generatedFileName);
    const chunks = Math.ceil(selectedFile.size / CHUNK_SIZE);
    
    console.log('chunks '+chunks);
    setTotalChunks(chunks);
  };

  const updateProgressBar = (progress) => {
    //console.log(progress);
    setProgress(progress)
    // progressBar.current.style.width = progress + '%';
    // progressBar.current.textContent = progress + '%';
  };

  const resetProgressBar = () => {
    progressBar.current.style.width = '0%';
    progressBar.current.textContent = '';
    fileInput.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) {
    //   return alert('Please select a file');
        console.log('Please select a file');
    }

    try {
      const startTime = new Date();
      const requestBody = { fileName };
      const res = await fetch(`${baseUrl}/initiateUpload`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { uploadId } = await res.json();
      setUploadId(uploadId);

      const uploadPromises = [];
      let uploadedChunks = 0;
      let start = 0,
        end;
        console.log('totalChunks =>'+totalChunks)
      for (let i = 0; i < totalChunks; i++) {
        end = start + CHUNK_SIZE;
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('index', i);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', fileName);
        formData.append('file', chunk);

        const uploadPromise = fetch(`${baseUrl}/upload?uploadId=${uploadId}`, {
          method: 'POST',
          body: formData,
        }).then(() => {
          uploadedChunks++;
          const progress = Math.floor((uploadedChunks / totalChunks) * 100);
          console.log('progress=> '+progress);
          updateProgressBar(progress);
        });

        uploadPromises.push(uploadPromise);
        start = end;
      }

      await Promise.all(uploadPromises);

      const completeRes = await fetch(
        `${baseUrl}/completeUpload?fileName=${fileName}&uploadId=${uploadId}`,
        { method: 'POST' }
      );

      const { success, data } = await completeRes.json();
      let resData = data;

      setFiledata(resData.Key);
      sendFileData(resData.Key);
      
      if (!success) {
        throw new Error('Error completing upload');

      }

      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log('Time elapsed:', timeElapsed, 'seconds');
      //alert('File uploaded successfully');
      //resetProgressBar();
    } catch (err) {
      console.log(err);
      alert('Error uploading file');
    }
  };

  return (
    <div>
       <label className="input_btn">Select File<input
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        id="fileInput"
      /></label>
      <button onClick={handleUpload} id="uploadBtn" className='input_btn'>
        Upload
      </button>
      <div>
      
      <ProgressBar now={progress} label={`${progress}%`}/>
      </div>
    </div>
  );
}

export default FileUpload;
