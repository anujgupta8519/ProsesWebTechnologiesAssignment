
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import AdminLogin from './Pages/Login/AdminLogin'
import ClientLogin from './Pages/Login/ClientLogin'
import ClientRegister from './Pages/Register/ClientRegister'
import CustomerRegister from './Pages/Register/CustomerRegister'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <AdminLogin/>
        },
        {
          path:"/user/login",
          element: <ClientLogin/>
        },{
          path:"/client/dashboard",
          element:<CustomerRegister/>
        },{
          path:"/admin/dashboard",
          element:<ClientRegister/>
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
