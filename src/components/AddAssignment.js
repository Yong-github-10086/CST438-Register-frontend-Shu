import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';

function AddAssignment(props) {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    setMessage('');

    const assignmentData = {
      assignmentName: assignmentName,
      dueDate: dueDate,
      courseId: courseId,
    };

    fetch(`${SERVER_URL}/assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    })
      .then((response) => {
        if (response.ok) {
          
          setMessage('Assignment created successfully.');
        } else {
         
          setMessage('Failed to create assignment.');
          console.error('Failed to create assignment.');
        }
      })
      .catch((error) => {
        setMessage('Error: ' + error);
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Add Assignment</h2>
      <div>
        <label htmlFor="assignmentName">Assignment Name:</label>
        <input
          type="text"
          id="assignmentName"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="courseId">Course ID:</label>
        <input
          type="text"
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit}>Create Assignment</button>
      <p>{message}</p>
      <Link to="/">Back to Assignments</Link>
    </div>
  );
}

export default AddAssignment;
