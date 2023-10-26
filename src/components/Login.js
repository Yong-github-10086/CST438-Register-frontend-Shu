import React, {useState} from 'react';
import ListAssignment from './ListAssignment';
import { BrowserRouter, Switch,Route } from 'react-router-dom'; // Import BrowserRouter
import GradeAssignment from './GradeAssignment';
import AddAssignment from './AddAssignment'; 
import EditAssignment from './EditAssignment'; 

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch('http://localhost:8081/login', {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(err => console.log(err));
    }

    if (isAuthenticated) {
        return  <BrowserRouter>
                 <div>
                   <Switch>
                     <Route exact path="/" component={ListAssignment} />
                     <Route path="/addAssignment" component={AddAssignment} /> 
                     <Route path="/editAssignment/:id" component={EditAssignment} /> 
                     <Route path="/gradeAssignment" component={GradeAssignment} />
                     <Route render={() => <h1>Page not found</h1>} />
                   </Switch>
                 </div>
               </BrowserRouter>
    } else {
        return (
            <div className="App">
            <table>
            <tbody>
            <tr><td>
            <label htmlFor="username">UserName</label>
            </td><td>
            <input type="text" name="username" value={user.username} onChange={onChange} />
            </td></tr>
            <tr><td>
            <label htmlFor="password">Password</label>
            </td><td>
            <input type="text" name="password" value={user.password} onChange={onChange} />
            </td></tr>
            </tbody>
            </table>
            
            <br/>
            <button id="submit" onClick={login}>Login</button>
                </div>
        );
    }
}
export default Login;