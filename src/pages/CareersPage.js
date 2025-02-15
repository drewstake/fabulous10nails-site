import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import { API } from "@aws-amplify/api";
import awsExports from "../aws-exports";
import { createCareerApplication } from "../graphql/mutations";
import "../styles/CareersPage.css";

// Configure Amplify
Amplify.configure(awsExports);

const CareersPage = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle Resume Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name || !email) {
      setMessage("Please fill out all fields and select a PDF file.");
      return;
    }

    try {
      // Generate a unique filename
      const fileName = `resumes/${Date.now()}_${file.name}`;

      // Upload file to S3
      const uploadResult = await Storage.put(fileName, file, {
        contentType: file.type,
      });

      console.log("File uploaded to S3:", uploadResult);

      // Construct the S3 file URL using Amplify Storage
      const resumeUrl = await Storage.get(fileName, { level: "public" });

      console.log("Resume URL:", resumeUrl);

      // Save applicant details in DynamoDB via GraphQL
      await API.graphql({
        query: createCareerApplication,
        variables: {
          input: {
            name,
            email,
            resumeUrl,
            appliedAt: new Date().toISOString(),
          },
        },
      });

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
        </a>
        .
      </p>
    </div>
  );
};

export default CareersPage;
