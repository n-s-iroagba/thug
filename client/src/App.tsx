import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPassword from './pages/fan/NewPassword';
import Home from './pages/fan/Home';



import CryptoCheckOut from './pages/fan/CryptoCheckOut';



import VerifyEmail from './pages/fan/VerifyEmail';
import Dashboard from './pages/fan/Dashboard';
import ForgotPassword from './pages/fan/ForgotPassword';
import Login from './pages/fan/Login';
import FirstBooking from './pages/fan/FirstBooking';
import SignUp from './pages/fan/SignUp';
import AdminSignUp from './pages/admin/AdminSignUp';
import MembershipForm from './components/MembeshipForm';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        
        <Route path='/admin/signup' element={<AdminSignUp/>}/>

        <Route path='/create-default/membership' element={<MembershipForm/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>

        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path='/book' element={<FirstBooking/>}/>
       
        <Route path="/dashboard" element={<Dashboard/>}/>
  
  
        <Route path="/check-out/:id" element={<CryptoCheckOut />} />


      </Routes>
    </Router>
  );
};

export default App