
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import AdminLogin from './Pages/Login/AdminLogin'
import ClientLogin from './Pages/Login/ClientLogin'
import ClientRegister from './Pages/Register/ClientRegister'
import CustomerRegister from './Pages/Register/CustomerRegister'
import Protected from './authLayout'
import UserProtected from './userlayout'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
    
        {
          path: "/",
          element: (
            <Protected authentication = {false} >
              <AdminLogin/>
            </Protected>
          )
        },
        {
          path:"/user/login",
          element: (
            <UserProtected authentication = {false} >
              <ClientLogin/>
            </UserProtected>
          )
        },{
          path:"/client/dashboard",
          element:(
            <UserProtected authentication = {true} >
              <CustomerRegister/>

            </UserProtected>

          )
        },{
          path:"/admin/dashboard",
          element:(
            <Protected authentication = {true} >
             <ClientRegister/>
            </Protected>
          )
        }

        
      ]

    }
    

  ])


  return (
    <RouterProvider router={router}>
  <Layout/>

    </ RouterProvider>
  )
}

export default App
