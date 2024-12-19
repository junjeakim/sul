import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage'
import AgreementPage from '../pages/AgreementPage'

const AppRouter = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<AgreementPage />} />
            <Route path="/signup" element={<SignUpPage />} />
         </Routes>
      </Router>
   )
}

export default AppRouter
