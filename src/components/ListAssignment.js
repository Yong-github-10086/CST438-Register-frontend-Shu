import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import EditAssignment from './EditAssignment';
import AddAssignment from './AddAssignment';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//
function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem("jwt");

 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`,{
      headers: {'Authorization' : token}
    })
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

  // called fetchAssignments once after intial render
  useEffect(fetchAssignments, []);
   
  
  const deleteAssignment = (id, force) => {
    console.log("delete assignment "+id);
    fetch(`${SERVER_URL}/assignment/${id}?force=${force}`, 
      {  
        method: 'DELETE', 
        headers: {'Authorization' : token,
      }

      } 
    )
    .then((response) => { 
      if (response.ok) {
          setMessage('Assignment deleted.');
          fetchAssignments();
      } else {
          setMessage("Assignment delete failed.");
      }
   } )
  .catch((err) =>  { setMessage('Error. '+err) } );
  }
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((h, idx) => (<th key={idx}>{h}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, idx) => (
                    <tr key={idx}>
                      <td>{assignment.assignmentName}</td>
                      <td>{assignment.courseTitle}</td>
                      <td>{assignment.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignment.id}`} >Grade</Link>
                      </td>
                      <td><EditAssignment assignment={assignment} onClose={fetchAssignments} /></td>
                      <td><button type="button" margin="auto" onClick={() => deleteAssignment(assignment.id, true)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AddAssignment onClose={fetchAssignments}/>
          </div>
      </div>
    )
}  

export default ListAssignment;