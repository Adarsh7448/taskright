import React from 'react'
import authService from '../appwrite/authservice'
import { Link, useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    async function registerUser(e){
        e.preventDefault()
        const user = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(user)
        try {
                authService.createAccount(user)
                .then(data => {
                    console.log(data)
                    navigate('/login')
                })
        } catch (error) {
                console.error("APPWRITE AUTH ERROR: ", error)
        }
    }
    return (
        <>
            <div className='px-2 border border-gray-300 rounded py-3 mx-auto w-80'>
            <h1 className='text-2xl font-bold'>Login to your account</h1>
                <form onSubmit = {registerUser} className='w-full my-3'>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="mt-2 block text-sm/6 font-medium text-gray-900">
                            Username
                        </label>
                        <div className="mt-1">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    id="username"
                                    name="name"
                                    type="text"
                                    placeholder="username..."
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <label htmlFor="email" className="mt-2 block text-sm/6 font-medium text-gray-900">
                            email
                        </label>
                        <div className="mt-1">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="abc@example.com..."
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <label htmlFor="password" className="mt-2 block text-sm/6 font-medium text-gray-900">
                            password
                        </label>
                        <div className="mt-1">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link className="text-sm/6 font-semibold text-gray-900 cursor-pointer" to="/login">Login</Link>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">           
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
    }

export default Register