

import './App.css'


import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import UserProfile from './components/UserProfile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import NewAdminPost from './components/admin/NewAdminPost'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveJobs from './components/SaveJobs'

const appRouter = createBrowserRouter([

  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <UserProfile />
  },
  {
    path: '/saveJobs',
    element: <SaveJobs />
  },
  // admin ke liye yha se start hoga

  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><NewAdminPost /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicant',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }

])



function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </>
  )
}

export default App
