import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import JobOffers from './pages/JobOffers'
import OfferDetails from './pages/OfferDetails'
import ApplyOffer from './pages/ApplyOffer'
import PaymentPage from './pages/PaymentPage'
import ManageApplications from './pages/ManageApplications'
import ManageContracts from './pages/ManageContracts'
import Chat from './pages/Chat'
import { RequireAuth, NoAuth } from './components/AuthRoutes'
import MySentApplication from './pages/MySentApplication'
import './App.css'
function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<NoAuth><Signup /></NoAuth>} />
          <Route path="/login" element={<NoAuth><Login /></NoAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/jobs" element={<JobOffers />} />
          <Route path="/jobs/:id" element={<OfferDetails />} />
          <Route path="/jobs/:id/apply" element={<RequireAuth><ApplyOffer /></RequireAuth>} />
          <Route path="/payment/:applicationId" element={<RequireAuth><PaymentPage /></RequireAuth>} />
          <Route path="/manage-applications" element={<RequireAuth><ManageApplications /></RequireAuth>} />
          <Route path="/manage-contracts" element={<RequireAuth><ManageContracts /></RequireAuth>} />
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
          <Route path="/my-sent-applications" element={<RequireAuth><MySentApplication /></RequireAuth>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}
export default App
