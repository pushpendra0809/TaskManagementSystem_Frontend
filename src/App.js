import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Component/Registration/Registration';
import Login from './Component/Login/Login';
import CreateTask from './Component/CreateTask/CreateTask.js';
import Home from './Component/Home/Home.jsx';
import UpdateTask from './Component/UpdateTask/UpdateTask.js';
import Dashboard from './Admin/Dashboard/Dashboard.jsx';
import AllUserTask from './Admin/AllUserTask/AllUserTask.jsx';
import AdminAsignTask from './Admin/AdminAsignTask/AdminAsignTask.jsx';
import ProtectedRoute from './Component/Protectedpage/Protectedpage.jsx'; 
import ForgotPassword from './Component/forgotPassword/forgotPassword.jsx';
import ChangePassword from './Component/ChangePassword/ChangePassword.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/adminasigntask' element={<AdminAsignTask />} />
          <Route path='/allusertask' element={<AllUserTask />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/changepassword' element={<ChangePassword />} />
        </Route>

        <Route path='/createtask' element={<CreateTask />} />
        <Route path='/home' element={<Home />} />
        <Route path='/updatetask/:id' element={<UpdateTask />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
