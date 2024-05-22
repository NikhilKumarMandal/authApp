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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/login' element={<SignIn/>} />
      {/* <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       /> */}
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
