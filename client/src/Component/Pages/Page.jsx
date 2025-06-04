import React from 'react'
import { useNavigate } from 'react-router-dom'

function Page() {

    const navigate = useNavigate();

    const handleSubmit = (path) => {
        if (path === 'login') {
            navigate('/login')
        } else {
            navigate('/ragister')
        }
    }

    return (
        <div className='text-center flex justify-center items-center w-screen '>
            <div className='flex flex-col'>
                <button
                    onClick={() => handleSubmit('login')}
                    className='border border-gray-500 bg-blue-400 p-4 rounded-xl my-2 '
                >
                    Login
                </button>
                <button
                    onClick={() => handleSubmit('ragister')}
                    className='border border-gray-500 bg-blue-400 p-4 rounded-xl my-2 w-25'
                >
                    Ragister
                </button>
            </div>

        </div>
    )
}

export default Page
