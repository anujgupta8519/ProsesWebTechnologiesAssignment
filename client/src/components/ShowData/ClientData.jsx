import React from 'react'
import Input from '../Input/Input'
import parseDate from '../../utils/parseDate'
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { deleteClient, updateClient } from '../../services/admin.services';
import { parseData } from '../../utils/parseError';

function ClientData(data) {
  const id = data?.data._id
  const [error, setError] = React.useState("");

    const {register,handleSubmit,reset} = useForm({
        defaultValues: {
            clientName: data?.data.clientName||"Anuj Gupta",
            emailId: data?.data.emailId || "3hS7M@example.com",
            mobileNumber: data?.data.mobileNumber || "1234567890",
            address: data?.data.address || "Delhi, India",
            subscriptionStartDate:parseDate(data.data?.subscriptionStartDate||"2022-01-01"),
            subscriptionEndDate: parseDate(data?.data.subscriptionEndDate||"2022-01-01")
        }
    });

    const edit = (data) => {
        updateClient({_id:id,...data}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
            setError(parseData(err))
        })
    }

    const deleteClientservice = () => {
     
        deleteClient(id).then((res) => {
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
<form className='flex flex-row' onSubmit={handleSubmit(edit)}>
       <Input   {...register("clientName",{required:true})} />
        <Input    {...register("emailId",{required:true})} />
        <Input    {...register("mobileNumber",{required:true})}/>
        <Input     {...register("address",{required:true})} />
        <Input    type="date"  {...register("subscriptionStartDate",{required:true})} />
        <Input    type="date" {...register("subscriptionEndDate",{required:true})}/>

        <Button type='submit' >Edit</Button>
       
        </form>
         <Button type='button'  className='bg-red-600' onClick={ deleteClientservice}>Delete</Button>
         </div>
       

       


        

  )
}

export default ClientData