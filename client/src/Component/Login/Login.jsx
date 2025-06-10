import React, { useState } from 'react';
import LoginUser from '../apiServices/LoginApi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError("");
    setSuccess("");

    if (!email || !password || !fname || !lname) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await LoginUser({
        body: { fname, lname, email, password },
      });

      setSuccess("User login successfull!");
      console.log("Server response:", response);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      setError(message);
    }
  };

  return (
    <div className="text-center flex justify-center p-5">
      <div>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg"
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            className="w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full flex justify-center items-center p-4 mb-4 border border-gray-500 rounded-lg"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 mb-4 border border-gray-500 rounded-lg"
          />

          <button 
            onClick={() => navigate('/')}
            className='p-4 border border-gray-500 rounded-lg bg-blue-500  mx-2'
          >
            Cancel
          </button>

          <button type="submit" className="p-4 border border-gray-500 rounded-lg bg-blue-500 ">
            Submit
          </button>          

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
