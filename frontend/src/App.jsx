import { useState, lazy, Suspense } from "react";
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
import EvaluationsWithComments from "./pages/EvaluationsWithComments";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AdminComments from "./pages/AdminComments";
import EachCenterData from "./pages/EachCenterData";
import EvaluationTable from "./components/EvaluationTableTotalCenter";
import AllCenters from "./pages/AllCenters";
import EditAdminForm from "./components/EditAdminForm";
import NewCentreForm from "./components/newCentreForm";
import EditCentreForm from "./components/EditCentreForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<Acceuil />} />
        <Route path="/login" element={<Form />} />
        <Route path="/avis" element={<EmplyeHome />} />
        <Route path="/test" element={<Test />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="feedback" element={<AdminComments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
          <Route path="/general">
            <Route path="dashboard" element={<SuperAdminDashboard />} />

            <Route path="administrateurs" element={<AdministrateursListe />} />
            <Route path="newadmin" element={<AjouterAdmin />} />
            <Route path="feedback" element={<EvaluationsWithComments />} />
            <Route path="centres" element={<CentrePage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset" element={<ChangePassword />} />
            <Route path="center/:idCentre" element={<EachCenterData />} />
            <Route path="editadmin/:id" element={<EditAdminForm />} />
            <Route path="editcentre/:id" element={<EditCentreForm />} />

            <Route
              path="CenterFeedback/:idCentre"
              element={<EvaluationTable />}
            />
            <Route path="moreCenters" element={<AllCenters />} />
            <Route path="newCentre" element={<NewCentreForm />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
