import React, { useState, useEffect } from "react";

function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("image", file, "username.pdf");

    fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error uploading file");
        }
      })
      .then((data) => {
        if (data.progress) {
          setProgress(data.progress);
        } else if (data.message) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error uploading file");
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <progress value={progress} max="100"></progress>
      <p>{message}</p>
    </div>
  );
}

export default FileUpload;
