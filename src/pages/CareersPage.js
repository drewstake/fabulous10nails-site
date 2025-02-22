import React, { useState } from "react";
import { Amplify } from "aws-amplify";
// Use GraphQLAPI instead of API
import { GraphQLAPI, graphqlOperation } from "@aws-amplify/api-graphql";
import { uploadData, getUrl } from "@aws-amplify/storage";
import awsExports from "../aws-exports";
import { createCareerApplication } from "../graphql/mutations";
import "../styles/CareersPage.css";

Amplify.configure(awsExports);

const CareersPage = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log("S3 Bucket:", process.env.REACT_APP_S3_BUCKET);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);
    if (selectedFile) {
      console.log("File size:", selectedFile.size);
    }
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
      console.log("Uploading file as:", fileName);

      // Wrap the file in a Blob (optional, as file is already a Blob in many cases)
      const blobData = new Blob([file], { type: file.type });
      console.log("Blob size:", blobData.size);

      // Upload the file to S3 using the modular Storage function uploadData
      await uploadData(fileName, blobData, { contentType: file.type });

      // Retrieve the file URL using the modular function getUrl
      const resumeUrl = await getUrl(fileName, { level: "protected" });
      console.log("Resume URL:", resumeUrl);

      // Save application details via GraphQL using GraphQLAPI and graphqlOperation
      await GraphQLAPI.graphql(
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
        Alternatively, you can send your resume directly to{" "}
        <a href="mailto:drewstake3@gmail.com" className="email-link">
          drewstake3@gmail.com
        </a>.
      </p>
    </div>
  );
};

export default CareersPage;
