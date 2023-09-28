import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';

function EditAssignment(props) {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const assignmentId = props.match.params.id;

  useEffect(() => {
    const fetchAssignmentData = () => {
      setMessage('');
      fetch(`${SERVER_URL}/assignment/${assignmentId}`)
        .then((response) => response.json())
        .then((data) => {
          // setAssignment(data);
          console.log("data.name: " + data.assignmentName);
          setAssignmentName(data.assignmentName);
          setDueDate(data.dueDate);
          setCourseId(data.courseId);
        })
        .catch((error) => {
          setMessage('Error: ' + error);
          console.error('Error:', error);
        });
    };
    fetchAssignmentData(); 
  }, [assignmentId]);

 

  const handleUpdate = () => {
    setMessage('');
    const updatedAssignmentData = {
      id: assignmentId,
      assignmentName: assignmentName,
      dueDate: dueDate,
      courseId: courseId,
    };

    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAssignmentData),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Assignment updated successfully.');
          
        } else {
          setMessage('Failed to update assignment.');
          console.error('Failed to update assignment.');
        }
      })
      .catch((error) => {
        setMessage('Error: ' + error);
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Edit Assignment</h2>
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
        <span id="courseId">{courseId}</span>

      </div>
      <button onClick={handleUpdate}>Update Assignment</button>
      <p>{message}</p>
      <Link to={`/`}>Back to Assignment</Link>
    </div>
  );
}

export default EditAssignment;
