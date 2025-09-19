import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get('http://localhost:3001/applicants');
        setApplicants(res.data);
      } catch (err) {
        console.error('Error fetching applicants:', err);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Current Company</th>
            <th>Skills</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phone}</td>
              <td>{applicant.company}</td>
              <td>{applicant.skills}</td>
              <td>{applicant.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
