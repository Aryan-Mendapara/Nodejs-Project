import React, { useState } from 'react'
import RagisterApi from '../apiServices/RagisterApi';
import { useNavigate } from 'react-router-dom';

function Ragister() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setaddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileno, setmobileno] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError();
        setSuccess();

        if (!fname || !lname || !address || !email || !mobileno) {
            setError("Please fill all the fields");
            return;
        }

        try {
            const response = await RagisterApi({
                body: { fname, lname, address, email, mobileno, password },
            });

            setSuccess("Ragister successful");
            console.log("Server response : ", response);
        } catch (error) {
            const message = error.response?.data?.message || "Ragister failed. Try again.";
            setError(message);
        }


    }

    return (
        <div className='text-center flex justify-center p-5'>
            <div>
                <form type="submit" onClick={handleSubmit}>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder='Enter First name'
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                        className='w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg'
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder='Enter Last name'
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                        className='w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg'
                    />
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        required
                        className='w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg'
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg'
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg"
                    />
                    <label>MobileNo</label>
                    <input
                        type="text"
                        placeholder='Enter MobileNo'
                        value={mobileno}
                        onChange={(e) => setmobileno(e.target.value)}
                        required
                        className='w-full p-4 mb-4 border border-gray-500 rounded-lg'
                    />
                    <button
                        onClick={() => navigate('/')}
                        className='p-4 border border-gray-500 rounded-lg bg-blue-500  mx-2'
                    >
                        Cancel
                    </button>
                    <button className="p-4 border border-gray-500 rounded-lg bg-blue-500">
                        Submit
                    </button>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                </form>
            </div>
        </div>
    )
}

export default Ragister
