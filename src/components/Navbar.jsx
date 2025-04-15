import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/authservice'
import { signIn,signOut } from '../features/authslice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        authService.checkLogin()
        .then((user) => {
            setIsLoggedIn(true)
        })
        .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
    }, [])

    const handleLogout = () => {
        authService.signOut()
        .then(data => {
            navigate('/login')
        })
    }

    return (
        <>
            <div className='flex'>
                <div className='w-1/4 text-3xl font-bold ml-2 my-2'>
                    AppWriteTodo
                </div>
                <div className="w-3/4 flex justify-end">
                    <div>
                        <button onClick={handleLogout} className='rounded-md bg-indigo-400 px-4 mr-2 text-white hover:bg-indigo-300 cursor-pointer'>Summary</button>
                    </div>
                    <div>
                        <button onClick={handleLogout} className='rounded-md bg-red-400 px-4 mr-2 text-white hover:bg-red-300 cursor-pointer'>Logout</button>
                    </div>
                </div>
            </div>
        </>
    
  )
}

export default Navbar