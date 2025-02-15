import React, { useState } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createCareerApplication } from '../graphql/mutations';
import '../styles/CareersPage.css';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    try {
      // Upload the file to S3 and get the key (or URL if desired)
      const filename = `${Date.now()}-${file.name}`;
      const s3Response = await Storage.put(filename, file, { contentType: file.type });
      // Optionally, retrieve the public URL: 
      // const resumeUrl = await Storage.get(s3Response.key);
      const resumeUrl = s3Response.key;

      // Build the input for the GraphQL mutation
      const input = {
        name,
        email,
        resumeUrl,
        appliedAt: new Date().toISOString(),
      };

      // Call the mutation to create a new CareerApplication
      await API.graphql(graphqlOperation(createCareerApplication, { input }));

      setMessage('Your resume has been sent successfully!');
      setName('');
      setEmail('');
      setFile(null);
    } catch (error) {
      console.error('Error submitting application', error);
      setMessage('There was an error sending your resume. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <h1>Careers</h1>
      <p>We are always looking for passionate and talented individuals to join our team.</p>
      <form onSubmit={handleSubmit} className="resume-form">
        <div>
          <label htmlFor="applicant-name">Name:</label>
          <input
            id="applicant-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="applicant-email">Email:</label>
          <input
            id="applicant-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="resume-upload">Resume (PDF):</label>
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Resume</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Alternatively, you can send your resume directly to&nbsp;
        <a href="mailto:drewstake3@gmail.com" className="email-link">drewstake3@gmail.com</a>.
      </p>
    </div>
  );
};

export default ApplicationForm;
