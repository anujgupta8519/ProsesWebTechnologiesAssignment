import React from 'react'
import { useForm } from 'react-hook-form';
import Logo from '../Logo/Logo';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { addClient } from '../../services/admin.services';

function ClientRegister() {
    const { register, handleSubmit,reset } = useForm();



    const registerClient = async (data) => {

        addClient(data).then((res) => {
            reset();
            

            console.log(res)
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


                <form onSubmit={handleSubmit(registerClient)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Client Name: "
                            placeholder="Enter your username"
                            type="text"
                            {...register("clientName", {
                                required: true,

                            })}


                        />
                        <Input
                            label="Email Id: "
                            placeholder="Enter your Email Id"
                            type="email"
                            {...register("emailId", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }

                            })}
                        />

                        <Input
                            label="Mobile Number: "
                            placeholder="Enter your Mobile Number"
                            type="number"
                            {...register("mobileNumber", {
                                required: true,
                                minLength: 10,
                                maxLength: 10
                            })}
                        />

                        <textarea
                            placeholder="Enter your address"
                            {...register("address", {
                                required: true,
                            })}
                            className="border border-black/10 w-full rounded-lg p-3"
                        />


                        <Input
                            label="Subscription Start Date: "
                            placeholder="Enter your Subscription Start Date"
                            type="date"
                            {...register("subscriptionStartDate", {
                                required: true
                            })}
                        />

                        <Input
                            label="Subscription End Date: "
                            placeholder="Enter your Subscription End Date"
                            type="date"
                            {...register("subscriptionEndDate", {
                                required: true
                            })}
                        />

                        <Input
                            label="Password: "
                            placeholder="Enter your Password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />


                        <Button type='submit' className='w-full'>Register</Button>


                    </div>

                    


                </form>
            </div>

        </div>
    )
}

export default ClientRegister