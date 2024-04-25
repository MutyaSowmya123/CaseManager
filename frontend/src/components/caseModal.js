import React, { useState } from 'react';
import axios from 'axios';

function CaseModal({ onClose, onAddCase }) {
  const [caseID, setCaseID] = useState('');
  const [victimName, setVictimName] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [file, setFile] = useState(null);
  const [suspectName, setSuspectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a FormData object to send files along with other form data
      const formData = new FormData();
      formData.append('caseID', caseID);
      formData.append('victimName', victimName);
      formData.append('caseType', caseType);
      formData.append('caseDescription', caseDescription);
      formData.append('file', file); // Append the selected file
      formData.append('suspectName', suspectName);

      // Make an HTTP POST request to add the case
      const response = await axios.post('http://localhost:3001/api/cases', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file uploads
        }
      });

      // Call the onAddCase function with the newly added case
      onAddCase(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding case:', error);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add/Update Case</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Case ID" value={caseID} onChange={(e) => setCaseID(e.target.value)} />
          <input type="text" placeholder="Victim Name" value={victimName} onChange={(e) => setVictimName(e.target.value)} />
          <input type="text" placeholder="Case Type" value={caseType} onChange={(e) => setCaseType(e.target.value)} />
          <input type="text" placeholder="Case Description" value={caseDescription} onChange={(e) => setCaseDescription(e.target.value)} />
          <input type="file" accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx" onChange={handleFileChange} />
          <input type="text" placeholder="Suspect Name" value={suspectName} onChange={(e) => setSuspectName(e.target.value)} />
          <button type="submit">Add/Update</button>
        </form>
      </div>
    </div>
  );
}

export default CaseModal;
