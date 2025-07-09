import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import NewAdminForm from "./components/NewAdminForm";
import EmplyeHome from "./pages/EmplyeHome";
import Evaluation from "./components/Evaluation";
import AdministrateurLayer from "./Layers/AdministrateurLayer";
import CentrePage from "./pages/CentrePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Acceuil />} />
        <Route path="/LogIn" element={<Form />} />
        <Route path="/AjouterAdministrateur" element={<NewAdminForm />} />
        <Route path="/avis" element={<EmplyeHome />} />
        <Route path ="/evaluer" element={<Evaluation />} />
        <Route path ="/administrateur" element={<AdministrateurLayer />} />
        <Route path = "/centres" element={<CentrePage/>} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
