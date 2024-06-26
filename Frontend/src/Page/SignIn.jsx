import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import axios from "axios"

const SignIn = () => {
    const navigate = useNavigate();
    const [SigninData, setSigninData] = useState({
      Email:"",
      Password:""
    })

    const HandleBackClick=()=>{
        navigate("/")
    }
    const HandleSigninSubmit = (e)=>{
      e.preventDefault();
      axios.post("http://localhost:3000/api/user/login",SigninData,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then((response)=>{
          localStorage.setItem("User",JSON.stringify(response.data))
          localStorage.setItem("Id",response.data._id)
          navigate(`/profile/${response.data._id}`)
      })
    }
  return (
    <>
      <div className="SignInPage h-[570px] w-[100%] bg-[#F0F7F4] flex justify-center items-center">
        <form className="SignInContainer h-[500px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center p-8"
        onSubmit={(e)=>HandleSigninSubmit(e)}>
            <div className="BackArrowContainer h-[50px] w-[50px] flex justify-center items-center rounded-[100px] relative top-[-80px] left-[-170px] hover:bg-gray-50 cursor-pointer" onClick={HandleBackClick}>
                <IoIosArrowBack className='h-[30px] w-[30px]'/>
             </div>
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <div className="Email w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="someone@gmail.com"
              onChange={(e)=>{setSigninData({...SigninData, Email:e.target.value})}}
            />
          </div>

          <div className="Password w-full mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              onChange={(e)=>{setSigninData({...SigninData, Password:e.target.value})}}
            />
          </div>

          <button className="h-[40px] w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-300"
          type='submit'
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
