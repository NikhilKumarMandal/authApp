import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {  RouterProvider, createBrowserRouter} from 'react-router-dom'
const Layout = React.lazy(() => import('./Layout.jsx'))
import './index.css'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Home from './pages/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import PasswordResetLink from './pages/PasswordResetLink.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
      
        element: (
          <ProtectedRoute>
            <Home />
            </ProtectedRoute>
        )
      },
      {
        path: "/login",
        element: <SignIn />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/verify-email/:id",
        element: <VerifyEmail />
      },
      {
        path: "/resetPassword/email",
        element: <ResetPassword/>
      },
      {
        path: '/reset-password/:token',
        element: <PasswordResetLink/>,
      }
    ]
  }
])





ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
