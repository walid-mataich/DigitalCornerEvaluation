import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Theme (choose one theme only)
// import "primereact/resources/themes/lara-light-indigo/theme.css"; // or another theme

import "primereact/resources/themes/lara-light-cyan/theme.css";


// Core PrimeReact styles
import "primereact/resources/primereact.min.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
