import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { logout } from '../../services/logout.service';

function Header() {
  const authStatus = localStorage.getItem('login')
  console.log(authStatus)

  const logoutFunction = () => {
    logout()
    .then((res) => {
      localStorage.removeItem("login")
      console.log(res)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }

     


  return (
    <header className='py-3 shadow bg-gray-800  border-b-2  '>
      
        <nav className='flex'>
          <div className="mr-4 ">
            <Link to='/'>
              <Logo  className='text-white hover:text-gray-400' width=''/>

            </Link>
          </div>
          <ul className='flex ml-auto'>

            <Button hidden={!authStatus } onClick={logoutFunction} className='text-white hover:text-gray-400'>Logout</Button>


   

          </ul>
        </nav>
   
    </header>

  
  )
}


export default Header