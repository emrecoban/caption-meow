import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login, {action as loginAction} from './pages/Login';
import Signup, {action as signupAction} from './pages/Signup';
import { AuthProvider } from './context/AuthProvider';
import { AfterLoginProvider } from './context/AfterLoginProvider';


const mainRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
      <Route index element={<Home />}/>
      
        <Route 
          path='dashboard' 
          element={
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        }/>
      
          <Route 
                path='login' 
                element={
                <AfterLoginProvider>
                  <Login />
                </AfterLoginProvider>
                }
                action={loginAction}
          />
          <Route 
                path='signup' 
                element={
                  <AfterLoginProvider>
                    <Signup />
                  </AfterLoginProvider>
                } 
                action={signupAction}      
          />
  </Route>
))

ReactDOM
.createRoot(document.getElementById('root'))
.render(<RouterProvider router={mainRouter} />)