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
import EmplyeHome from "./pages/EmplyeHome";
import Test from "./pages/test";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ChooseCenter from "./pages/ChooseCenter";
import CentrePage from "./pages/CentrePage";
import AdministrateursListe from "./pages/AdministrateursListe";
import AjouterAdmin from "./pages/AjouterAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import Evaluation from "./pages/Evaluation";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Acceuil />} />
        <Route path="/login" element={<Form />} />
        <Route path="/avis" element={<EmplyeHome />} />
        <Route path="/test" element={<Test />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* <Route path="/evaluation" element={<ChooseCenter />} /> */}

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="evaluation" element={<Evaluation />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/general">
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="administrateurs" element={<AdministrateursListe />} />
            <Route path="newadmin" element={<AjouterAdmin />} />
            <Route path="centres" element={<CentrePage />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
