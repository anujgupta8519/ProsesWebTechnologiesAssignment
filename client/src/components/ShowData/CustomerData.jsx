import React from 'react'
import Input from '../Input/Input';
import Select from '../Select/Select';
import Button from '../Button/Button';
import { deleteCustomer, updateCustomer } from '../../services/client.services';
import { useForm } from 'react-hook-form';
import { parseData } from '../../utils/parseError';

function CustomerData(data) {

  const id = data?.data._id

  const [error, setError] = React.useState("");

  
  const {register,handleSubmit} = useForm({
    defaultValues: {
        name: data?.data.customerName||"Anuj Gupta",
        emailId: data?.data.emailId || "3hS7M@example.com",
        mobileNumber: data?.data.mobileNumber || "1234567890",
        address: data?.data.address || "Delhi, India",
        country: data?.data.country || "India",
        state: data?.data.state || "Delhi",
        city: data?.data.city || "Delhi"
    }
  });

  const update = (data) => {
    console.log(data)
    updateCustomer({_id:id,...data}).then((res) => {
      console.log(res)
    }).catch((err) => {
      setError(parseData(err))
      console.log(err)
    })
  }
  const deleteCustomerFor = () => {
    deleteCustomer(id).then((res) => {
      console.log(res)
      window.location.reload()
    }).catch((err) => {
      setError(parseData(err))
      console.log(err)
    })
  }
  


  return (
    <div className='flex flex-row'>
      {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
      <form  className='flex flex-row'>
        <Input
  
          type="text"
          {...register("name", {
            required: true,

          })}
        />

        <Input

          type="email"
          {...register("emailId", {
            required: true,

          })}
        />


        <Input
          type="text"
          {...register("mobileNumber", {
            required: true,

          })}
        />

        <Input
          type="text"
          {...register("address", {
            required: true,

          })}
        />
        <Select
        options={["India"]}
          {...register("country", {
            required: true,
          })}
        />

        <Select
        options={["Delhi"]}
          {...register("state", {
            required: true,
          })}
        />

        <Select
        options={["Delhi"]} 
          {...register("city", {
            required: true,
          })}
        />

        <Button type="submit" onClick={handleSubmit(update)} >Update</Button>


        


      </form>
      <Button type='button'  className='bg-red-600' onClick={ deleteCustomerFor}>Delete</Button>





    </div>
  )
}

export default CustomerData