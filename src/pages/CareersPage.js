import React, { useState } from "react";
import { Amplify, Storage, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";
import { createCareerApplication } from "../graphql/mutations";
import "../styles/CareersPage.css";

Amplify.configure(awsExports);

const CareersPage = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !email) {
      setMessage("Please fill out all fields and select a PDF file.");
      return;
    }

    try {
      const fileName = `resumes/${Date.now()}_${file.name}`;

      // Convert the file to an ArrayBuffer, then wrap it in a Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const uint8Data = new Uint8Array(arrayBuffer);
      console.log("Uint8Array data:", uint8Data, "byteLength:", uint8Data.byteLength);

      // Wrap the Uint8Array in a Blob so that the data object has a 'size' property.
      const blobData = new Blob([uint8Data], { type: file.type });
      console.log("Blob data:", blobData, "size:", blobData.size);

      // Pass the Blob to Storage.put instead of the original file or raw Uint8Array.
      await Storage.put(fileName, blobData, {
        contentType: file.type,
      });

      const resumeUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/public/${fileName}`;

      await API.graphql(
        graphqlOperation(createCareerApplication, {
          input: {
            name,
            email,
            resumeUrl,
            appliedAt: new Date().toISOString(),
          },
        })
      );

      setMessage("Your resume has been uploaded and submitted successfully!");
      setFile(null);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("There was an error sending your resume. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <h1>Careers</h1>
      <p>We are always looking for talented individuals to join our team.</p>
      <p>To apply, please upload your resume (PDF) and fill in the form below.</p>
      <form onSubmit={handleSubmit} className="resume-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
          required
        />
        <button type="submit" className="submit-button">
          Submit Resume
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Alternatively, you can send your resume directly to&nbsp;
        <a href="mailto:drewstake3@gmail.com" className="email-link">
          drewstake3@gmail.com
        </a>.
      </p>
    </div>
  );
};

export default CareersPage;
