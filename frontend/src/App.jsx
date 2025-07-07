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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Acceuil />} />
        <Route path="/LogIn" element={<Form />} />
        <Route path="/AjouterAdministrateur" element={<NewAdminForm />} />
        <Route path="/avis" element={<EmplyeHome />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;