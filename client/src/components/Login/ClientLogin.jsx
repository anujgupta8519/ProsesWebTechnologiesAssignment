import React from 'react'
import Logo from '../Logo/Logo'
import { useForm } from 'react-hook-form';
import { ClientLoginService } from '../../services/client.services';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';

function ClientLogin() {

  const { register, handleSubmit } = useForm();
  const [error, setError] =React.useState("");
  const navigate = useNavigate();

  const login =  (data) => {
    ClientLoginService(data)
    .then((res) => {
      navigate("/client/dashboard")
      console.log(res)
    })
    .catch((err) => {
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
  
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input

                        label = "Email Id: "
                        placeholder = "Enter your email Id"
                        type="email"
                        {...register("emailId", {
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

                    <Link className='text-blue-500 text-center' to="/">Login As Admin</Link>


                </form>
            </div>

        </div>
  )
}

export default ClientLogin