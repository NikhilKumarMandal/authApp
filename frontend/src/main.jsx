import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
const Layout = React.lazy(() => import('./Layout.jsx'))
import './index.css'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import VerifyEmail from './pages/VerifyEmail.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/verify-email/:id' element={<VerifyEmail/>} />
      <Route path='/login' element={<SignIn/>} />    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>,
    </Provider>
)
