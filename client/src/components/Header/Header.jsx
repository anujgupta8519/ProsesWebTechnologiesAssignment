import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Header() {
     


  return (
    <header className='py-3 shadow bg-gray-800  border-b-2  '>
      
        <nav className='flex'>
          <div className="mr-4 ">
            <Link to='/'>
              <Logo  className='text-white hover:text-gray-400' width=''/>

            </Link>
          </div>
          <ul className='flex ml-auto'>


   

          </ul>
        </nav>
   
    </header>

  
  )
}


export default Header