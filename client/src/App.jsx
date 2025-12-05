import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Dashboard from './pages/Dashboard'
import ResultPage from './pages/ResultPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile'
import VotingPage from './pages/VotingPage'
import PastPolls from './pages/PastPolls'
import AvailablePolls from './pages/AvailablePolls'
import RegistrationPage from './pages/RegistrationPage'
import AdminPanel from './pages/AdminPanel'
import AddCandidates  from './pages/AddCandidates'
import { LocalContext } from "./contextapi/local_context";


import React, { useContext } from "react";



import Addadmins from './pages/Addadmins'
import Loginmodal from './pages/Loginmodal'
import SuperAdminLogin from './components/Superadminlogin'
import AdminLogin from './components/AdminLogin'
import VoterLogin from './components/VoterLogin'
//import { ElectionProvider } from './contextapi/elec_context'
import Logout from './components/Logout'
import { useEffect } from 'react'
import Updatedet from './pages/Updatedet'
import First from './pages/First'
import { Navigate } from 'react-router-dom'



function App() {

    const { role } = useContext(LocalContext);
    console.log(role);

   const ans=localStorage.getItem("role");


  
  return (
    
   <div className="min-h-screen flex flex-col">
    {/* <LocalContextProvider> */}

  
       

        

        


       <Navbar></Navbar>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<First />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path='/pastpolls' element={(ans==="user" || ans=="super" ?<PastPolls/> : <Navigate to="/login" />)} />
          <Route path="/availablePolls" element={ans==="user" ?<AvailablePolls/> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile/>} />
          
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route
  path="/adminpanel"
  element={ans === "admin" ? <AdminPanel /> : <Navigate to="/login" />}
/>
          <Route path="/addcandidates" element={ ans=="admin" ? <AddCandidates /> : <Navigate to="/login" />} />

          <Route path="/votingPanel" element={ ans==="user" ? <VotingPage/> : <Navigate to="/login" />} />

          <Route path="/addadmins" element={ans==="admin" ? <Addadmins /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Loginmodal />} />
           <Route path="/results" element={<ResultPage />} />
           <Route path="/superadminlogin" element={<SuperAdminLogin />} />
           <Route path="/adminlogin" element={<AdminLogin/>} />
           <Route path="/voterlogin" element={<VoterLogin />} />
           <Route path="/logout" element={<Logout />} />
           <Route path="/updates" element={(ans==="user" || ans==="super" ? <Updatedet />:<Navigate to="/login" />)} />

        </Routes>
      
      </main>
        

      <Footer>
        
      </Footer>
     
    
    </div>

    )
}

export default App
