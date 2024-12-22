import React from 'react'
import ReactDOM from 'react-dom/client' // Ensure you're importing from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root')) // Create root element
root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
)
