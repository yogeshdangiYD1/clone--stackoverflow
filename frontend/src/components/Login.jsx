import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

function Login() {

  const navigate = useNavigate(); 

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email && !password) {
      alert("Email and password are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;

      const { message, jwtToken, name, _id } = result;
      

      if (response.status >= 200 && response.status < 300) {
        console.log(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", _id)
        navigate('/home');
      } else {
        throw new Error(message || "Login failed");
      }
    } catch (error) {
      alert(
        `Login failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <header className="w-100vw">
      <div className="container h-screen bg-zinc-800 flex justify-center">
        <div className="py-6 border-zinc-500 border px-8 h-80 mt-20 bg-zinc-750 rounded">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-bold">
                Email:
              </label>
              <input 
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full border py-2 pl-3 rounded mt-2 text-white bg-zinc-700 border-zinc-500 outline-none focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-bold">
                Password:
              </label>
              <input 
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-zinc-700 text-white w-full border border-zinc-500 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
              />

              <a
                href="#"
                className="text-sm font-thin text-white hover:underline mt-2 inline-block hover:text-indigo-600"
              >
                Signup
              </a>
            </div>
            <button 
              type="submit" 
              className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-600 text-white font-bold w-full text-center rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Login;
