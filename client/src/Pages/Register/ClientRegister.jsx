import React from 'react'
import ClientRegisterComponent from '../../components/Register/ClientRegister'
import ClientsData from '../ClientsData/ClientsData'

function ClientRegister() {
  return (
    <div>
        <ClientRegisterComponent/>
       <div className='flex items-center justify-center w-full p-10'>
       <ClientsData/>
       </div>
    </div>
  )
}

export default ClientRegister