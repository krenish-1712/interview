import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpUser from './Pages/SignUpUser.jsx'
import Login from './Pages/Login.jsx'
import User from './Pages/User.jsx';
import Admin from './Pages/Admin.jsx';
import SignUpAdmin from './Pages/SignUpAdmin'

function App() {
  return (
  <>
       <Routes>
        <Route path="/">
        <Route index element={<SignUpUser/>} />
        <Route path="signupuser" element={<SignUpUser/>} />
        <Route path="signupadmin" element={<SignUpAdmin/>} />
        <Route path="login" element={<Login/>} />
        <Route path="user" element={<User/>} />
        <Route path="admin" element={<Admin/>} />
      </Route>
    </Routes >
  </>
  );
}

export default App;
