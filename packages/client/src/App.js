import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ClassList from './components/ClassList';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import TeacherDetails from './components/TeacherDetails';
import Navbar from './components/Navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <HashRouter className="App">
      {/* <ToastContainer /> */}
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/class-list' element={<ClassList />} />
        <Route path='/student-list' element={<StudentList />} />
        <Route path='/student-details' element={<StudentDetails />} />
        <Route path='/teacher-details' element={<TeacherDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
