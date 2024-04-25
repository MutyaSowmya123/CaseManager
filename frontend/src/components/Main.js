import React, { useState } from "react";
import axios from "axios"; 
import CaseModal from "./caseModal.js"; 
import "../styles/main.css";

function Main({ onLogout, username }) {
  const [searchInput, setSearchInput] = useState("");
  const [cases, setCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCase = async (caseDetails) => {
    try {
      await axios.post("http://localhost:3001/api/cases", caseDetails);
      // After adding the case, fetch cases
      fetchCases();
    } catch (error) {
      console.error("Error adding case:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const query = encodeURIComponent(searchInput);
      const response = await axios.get(
        `http://localhost:3001/api/search?query=${query}`
      );
      setCases(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const fetchCases = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/cases");
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="main-header">
        <h1>Criminal Case Manager</h1>
        <div>
          <span>{username}</span><br></br>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="main-content">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <br />
        <button onClick={() => setIsModalOpen(true)}>Add/Update Case</button>
      </div>
      {isModalOpen && (
        <CaseModal
          onClose={() => setIsModalOpen(false)}
          onAddCase={handleAddCase}
        />
      )}
      <div>
        <h2>Case List</h2>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Victim Name</th>
              <th>Case Type</th>
              <th>Case Description</th>
              <th>File Upload</th>
              <th>Suspect Name</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem._id}>
                <td>{caseItem.caseID}</td>
                <td>{caseItem.victimName}</td>
                <td>{caseItem.caseType}</td>
                <td>{caseItem.caseDescription}</td>
                <td>{caseItem.fileUpload}</td>
                <td>{caseItem.suspectName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
