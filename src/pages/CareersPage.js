import React, { useState } from 'react';
import '../styles/CareersPage.css';

const CareersPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Replace the URL with your backend endpoint for handling resume submissions
      const response = await fetch('https://your-backend-endpoint.com/api/sendResume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Your resume has been sent successfully!');
      } else {
        setMessage('There was an error sending your resume. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('There was an error sending your resume. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <h1>Careers</h1>
      <p>
        We are always looking for passionate and talented individuals to join our team.
      </p>
      <p>
        To apply, please upload your resume (PDF) and submit the form below.
      </p>
      <form onSubmit={handleSubmit} className="resume-form">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
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
