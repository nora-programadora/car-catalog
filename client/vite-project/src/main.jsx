import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FormUser from './components/FormUser.jsx'
import LoginForm from './components/LoginForm.jsx'
import Catalog from './components/Catalog.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/sign-up",
    element: <FormUser/>
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/catalog",
    element: <Catalog/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
