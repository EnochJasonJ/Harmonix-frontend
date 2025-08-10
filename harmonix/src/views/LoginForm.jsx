import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function LoginForm({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.promise(
            axios.post("https://harmonix-backend.onrender.com/token/", {
                username,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            }),
            {
                loading: 'Logging in...',
                success: (response) => {
                    localStorage.setItem("access", response.data.access);
                    localStorage.setItem("refresh", response.data.refresh);
                    setIsLoggedIn(true);
                    setTimeout(()=>{navigate("/");},7000);
                    return <b>Login successful!</b>;
                },
                error: (err) => {
                    console.error(err);
                    return <b>Login failed. Please check your credentials.</b>;
                }
            }
        );
    };


    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className="text-3xl font-bold mb-5">Login to your account</h1>
            <form onSubmit={handleSubmit} autoComplete='off' className='frm  h-[400px] w-[500px] flex items-center justify-center rounded-xl hover:scale-105 hover:mt-[35px] transition-all duration-700 ease-in-out'>
                <div className='w-[400px] h-auto flex flex-col gap-5'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="username" className='font-semibold text-lg '>User Name:</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="username" placeholder='ex... Alex' className='px-5 py-2 border-[#addab9] border-b-2 active:bg-white w-full bg-transparent' />
                    </div>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="password" className='font-semibold text-lg'>Password:</label>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='*******' className='px-5 py-2 border-[#addab9] border-b-2 w-full bg-transparent' />
                    </div>
                    <button type='submit' className='bg-black hover:bg-[#353535] hover:text-[#addab9] text-white font-bold py-2 px-4 rounded-md flex flex-row items-center justify-center w-[100px] hover:w-full active:w-full transition-all duration-700 ease-in-out'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm