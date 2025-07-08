import { useState } from "react";
import "./App.css";
import Form from "./components/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import NewAdminForm from "./components/NewAdminForm";
import EmplyeHome from "./pages/EmplyeHome";
import Test from "./pages/test";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Evaluation from "./pages/Evaluation";
import SatisfactionRadioGroup from "./components/SatisfactionRadioGroup";
import ChooseCenter from "./pages/ChooseCenter";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Acceuil />} />
        <Route path="/login" element={<Form />} />
        <Route path="/AjouterAdministrateur" element={<NewAdminForm />} />
        <Route path="/avis" element={<EmplyeHome />} />
        <Route path="/test" element={<Test />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/evaluation/:codeCentre" element={<Evaluation />} />
        <Route path="/evaluation" element={<ChooseCenter />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/general">
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="newadmin" element={<NewAdminForm />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
