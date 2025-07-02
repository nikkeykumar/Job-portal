import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Jobdescription from "./components/Jobdescription";

import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtecedRoute from "./components/admin/ProtecedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <Jobdescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // Admin ka leya
  {
    path: "/admin/companies",
    element: (
      <ProtecedRoute>
        <Companies />
      </ProtecedRoute>
    ),
  },
  {
    path: "/admin/company/create",
    element: (
      <ProtecedRoute>
        <CompanyCreate />
      </ProtecedRoute>
    ),
  },
  {
    path: "/admin/company/:id",
    element: (
      <ProtecedRoute>
        <CompanySetup />
      </ProtecedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtecedRoute>
        <AdminJobs />
      </ProtecedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtecedRoute>
        <PostJob />
      </ProtecedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtecedRoute>
        <Applicants />
      </ProtecedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
