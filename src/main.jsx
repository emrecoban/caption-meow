import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route
} from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login, {action as loginAction} from './pages/Login';
import Signup, {action as signupAction} from './pages/Signup';

const mainRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
      <Route index element={<Home />}/>
      <Route element={<ProtectedRoute />}>
          <Route 
                path='login' 
                element={<Login />}
                action={loginAction}
          />
          <Route 
                path='signup' 
                element={<Signup />} 
                action={signupAction}      
          />
      </Route>
  </Route>
))

ReactDOM
.createRoot(document.getElementById('root'))
.render(<RouterProvider router={mainRouter} />)