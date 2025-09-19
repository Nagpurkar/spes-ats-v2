import React, { useState, useEffect } from 'react';

function RecruiterDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('/api/applicants');
        if (!response.ok) {
          throw new Error('Failed to fetch applicants');
        }
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchApplicants();
  }, []);

  const filteredApplicants = applicants.filter(applicant => {
    const nameMatch = applicant.name && applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const skillMatch = !skillFilter || (applicant.skills && Array.isArray(applicant.skills) && applicant.skills.join(', ').toLowerCase().includes(skillFilter.toLowerCase()));
    const companyMatch = !companyFilter || (applicant.company && applicant.company.toLowerCase().includes(companyFilter.toLowerCase()));

    return nameMatch && skillMatch && companyMatch;
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by skill..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by company..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
      </div>
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
          {filteredApplicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phone}</td>
              <td>{applicant.company}</td>
              <td>{Array.isArray(applicant.skills) ? applicant.skills.join(', ') : applicant.skills}</td>
              <td>{applicant.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecruiterDashboard;
