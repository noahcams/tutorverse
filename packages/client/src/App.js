import './App.css';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AssignmentList from './components/AssignmentList';
import AssignmentDetail from './components/AssignmentDetails';
import ClassList from './components/ClassList';
import ClassDetails from './components/ClassDetails';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import TeacherDetails from './components/TeacherDetails';
import Navbar from './components/Navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
	const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const renderLogin = () => <Login setUser={setUser} setLoggedIn={setLoggedIn} />;

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setLoggedIn(true);
    }
  }, []);

  return (
    <HashRouter className="App">
      <ToastContainer />
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
      <Routes>
        <Route path='/' element={loggedIn ? <Dashboard user={user} /> : renderLogin()} />
        <Route path='/assignment-list' element={loggedIn ? <AssignmentList /> : renderLogin()} />
        <Route path='/assignment-detail' element={loggedIn ? <AssignmentDetail user={user}/> : renderLogin()} />
        <Route path='/class-list' element={loggedIn ? <ClassList user={user} /> : renderLogin()} />
        <Route path='/class-detail/:id' element={ loggedIn ? <ClassDetails user={user} /> : renderLogin()} />
        <Route path='/student-list' element={loggedIn ? <StudentList /> : renderLogin()} />
        <Route path='/student-details' element={loggedIn ? <StudentDetails user={user} /> : renderLogin()} />
        <Route path='/teacher-details' element={loggedIn ? <TeacherDetails /> : renderLogin()} />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
