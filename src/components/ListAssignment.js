import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';

function ListAssignment(props) {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    setMessage('');
    fetch(`${SERVER_URL}/assignment`)
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteAssignment = (assignmentId, force) => {
    setMessage('');
    fetch(`${SERVER_URL}/assignment/${assignmentId}?force=${force}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchAssignments();
          setMessage('Assignment deleted successfully.');
        } else {
          setMessage('Failed to delete assignment.');
          console.error('Failed to delete assignment.');
        }
      })
      .catch((error) => {
        setMessage('Error: ' + error);
        console.error('Error:', error);
      });
  };

  const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];

  return (
    <div>
      <h3>Assignments</h3>
      
      <div margin="auto">
        <h4>{message}&nbsp;</h4>
        <Link to="/addAssignment">
          <button>Add Assignment</button>
        </Link>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((title, idx) => (
                <th key={idx}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((row, idx) => (
              <tr key={idx}>
                <td>{row.assignmentName}</td>
                <td>{row.courseTitle}</td>
                <td>{row.dueDate}</td>
                <td>
                  <Link to={`/gradeAssignment/${assignments[idx].id}`}>Grade</Link>
                </td>
                <td>
                  <Link to={`/editAssignment/${assignments[idx].id}`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteAssignment(assignments[idx].id, true)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAssignment;
