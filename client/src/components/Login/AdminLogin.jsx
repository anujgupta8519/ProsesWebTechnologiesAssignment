import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import Logo from '../Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { adminLogin } from '../../services/admin.services';

function AdminLogin() {

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login =  (data) => {

    adminLogin(data)
    .then((res) => {
      localStorage.setItem("login", true)
      window.location.reload()
      navigate("/admin/dashboard")
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
   
  };
  return (
    <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
  
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label = "Username: "
                        placeholder = "Enter your username"
                        type="text"
                        {...register("username", {
                            required: true,

                        })}
                        
                        
                        />
                        <Input 
                        label = "Password: "
                        placeholder="Enter your Password"
                        type="password"
                        {...register("password",{
                            required:true
                        })}
                        />

                        <Button type='submit' className='w-full'>Login</Button>


                    </div>

                   

               <Link className='text-blue-600 text-center' to="/user/login">Login as Customer</Link>
                </form>
            </div>

        </div>
  )
}

export default AdminLogin