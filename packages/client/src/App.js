import './App.css';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AssignmentDetail from './components/AssignmentDetails';
import ClassList from './components/ClassList';
import ClassDetails from './components/ClassDetails';
import StudentList from './components/StudentList';
import Navbar from './components/Navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
	const [user, setUser] = useState({});
	const [cls, setCls] = useState([]);
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
        <Route path='/' element={loggedIn ? <Dashboard user={user} cls={cls} setCls={setCls} /> : renderLogin()} />
        <Route path='/assignment-detail' element={loggedIn ? <AssignmentDetail user={user}/> : renderLogin()} />
        <Route path='/class-list' element={loggedIn ? <ClassList user={user} cls={cls} /> : renderLogin()} />
        <Route path='/class-detail/:id' element={ loggedIn ? <ClassDetails user={user} /> : renderLogin()} />
        <Route path='/student-list' element={loggedIn ? <StudentList /> : renderLogin()} />
      </Routes>
    </HashRouter>
  );
}

export default App;
