import React from 'react'
import CustomerRegisterComponent from '../../components/Register/CustomerRegister'
import CustomersData from '../CustomerData/CustomersData'

function CustomerRegister() {
  return (
    <div>

        <CustomerRegisterComponent/>
        <div className='flex items-center justify-center w-full p-10'>
        <CustomersData/>
        </div>
       
        
    </div>
  )
}

export default CustomerRegister