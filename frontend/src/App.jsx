import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Acceuil from './pages/Acceuil';
import NewAdminForm from './components/NewAdminForm';
import EmplyeHome from './pages/EmplyeHome';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Acceuil />}/>
          <Route path="/LogIn" element={<Form />}/>
          <Route path="/AjouterAdministrateur" element={<NewAdminForm />}/>
          <Route path="/avis" element={<EmplyeHome /> }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
