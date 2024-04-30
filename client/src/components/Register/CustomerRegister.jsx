import React from 'react'
import { useForm } from 'react-hook-form';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { addCustomer } from '../../services/client.services';
import Button from '../Button/Button';

function CustomerRegister() {

    const { register, handleSubmit,reset } = useForm();


    const registerCustomer = async (data) => {

        addCustomer(data).then((res) => {
            reset();
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })

    }





  return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <form onSubmit={handleSubmit(registerCustomer)} >
                    <Input
                        label="Customer Name: " 
                        placeholder="Enter your username"
                        type="text"
                        {...register("name", {
                            required: true,

                        })}
                    />

                    <Input
                        label="Email Id: "
                        placeholder="Enter your Email Id"
                        type="email"
                        {...register("emailId", {
                            required: true,
                            
                        })}
                    />

                    <Input
                        label="Mobile Number: "
                        placeholder="Enter your Mobile Number"
                        type="number"
                        {...register("mobileNumber", {
                            required: true,
                        })}
                    />

                    <Input
                        label="Address: "
                        placeholder="Enter your address"
                        type="text"
                        {...register("address", {
                            required: true,
                        })}
                    />
                    <Select
                        label="Country: "
                        {...register("country", {
                            required: true,
                        })}
                        options={["India"]}
                    />

                    <Select
                        label="State: "
                        {...register("state", {
                            required: true,
                        })}
                        options={["Delhi"]}
                    />

                    <Select
                        label="City: "
                        {...register("city", {
                            required: true,
                        })}
                        options={["Delhi"]}
                    />

                    <Button type='submit' className='w-full'>Register</Button>

                    


                </form>


                </div>
                </div>
  )
}

export default CustomerRegister