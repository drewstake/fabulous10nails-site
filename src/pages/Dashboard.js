import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
// Use GraphQLAPI instead of API
import { GraphQLAPI } from "@aws-amplify/api-graphql";
import awsExports from "../aws-exports";
import { listCareerApplications } from "../graphql/queries";
// Uncomment the next line if you have this stylesheet
// import "../styles/Dashboard.css";

Amplify.configure(awsExports);

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await GraphQLAPI.graphql({
          query: listCareerApplications,
        });
        // Adjust data extraction based on your GraphQL response shape
        setApplications(response.data.listCareerApplications.items);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Error fetching applications");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Applications Dashboard</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              {app.name} - {app.email} - Applied at:{" "}
              {new Date(app.appliedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
