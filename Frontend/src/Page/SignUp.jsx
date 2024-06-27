import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Loading from '../Components/Loading';

const SignUp = () => {
  const [isLoading, setisLoading] = useState(false) 
  const {authUser, setAuthUser} = useAuthContext();
  const [DateOfBirth, setDateOfBirth] = useState(new Date());
  const [ErrorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    FullName: "",
    Contact: "",
    Email: "",
    Height: "",
    Weight: "",
    Gender: "",
    DateOfBirth: DateOfBirth,
    Password: "",
    ConfirmPassword: ""
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setisLoading(true)
    axios.post("http://localhost:3000/api/user/signup", signupData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      localStorage.setItem("User", JSON.stringify(response.data));
      localStorage.setItem("Id", response.data._id);
      setAuthUser(response.data)
      setisLoading(false)
      navigate(`/profile/${response.data._id}`)
    })
    .catch((error)=>{setErrorMessage(error.response.data.message)})
  };

  const handleDateChange = (date) => {
    setDateOfBirth(date);
    setSignupData({ ...signupData, DateOfBirth: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  return (
    <>
    {
      isLoading ? <Loading/> :
      <div className="SignUpPage h-[1000px] w-[100%] bg-[#F0F7F4] flex justify-center items-center">
        <form
          className="SignUpContainer h-auto w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center p-8"
          onSubmit={handleSignupSubmit}
        >
          <div
            className="BackArrowContainer h-[50px] w-[50px] flex justify-center items-center rounded-full relative bottom-[20px] right-[170px] hover:bg-gray-100 cursor-pointer"
            onClick={handleBackClick}
          >
            <IoIosArrowBack className="h-[30px] w-[30px]" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

          <div className="FullName w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FullName">
              Full Name
            </label>
            <input
              id="FullName"
              name="FullName"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="John Doe"
              onChange={handleInputChange}
            />
          </div>

          <div className="Contact w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Contact">
              Contact
            </label>
            <input
              id="Contact"
              name="Contact"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="xxx-xxx-3211"
              onChange={handleInputChange}
            />
          </div>

          <div className="Email w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input
              id="Email"
              name="Email"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="someone@gmail.com"
              onChange={handleInputChange}
            />
          </div>

          <div className="Date w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
              Date of Birth
            </label>
            <DatePicker
              className="h-[40px] w-[335px] rounded-[5px] px-3 py-2 border border-gray-300"
              selected={DateOfBirth}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          <div className="Gender w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Gender">
              Gender
            </label>
            <input
              id="Gender"
              name="Gender"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Gender"
              onChange={handleInputChange}
            />
          </div>

          <div className="Height w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Height">
              Height
            </label>
            <input
              id="Height"
              name="Height"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="in feet"
              onChange={handleInputChange}
            />
          </div>

          <div className="Weight w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Weight">
              Weight
            </label>
            <input
              id="Weight"
              name="Weight"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="in kg"
              onChange={handleInputChange}
            />
          </div>

          <div className="Password w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
              Password
            </label>
            <input
              id="Password"
              name="Password"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              onChange={handleInputChange}
            />
          </div>

          <div className="ConfirmPassword w-full mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ConfirmPassword">
              Confirm Password
            </label>
            <input
              id="ConfirmPassword"
              name="ConfirmPassword"
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              onChange={handleInputChange}
            />
          </div>
          {
            ErrorMessage &&
          <div className="ErrorContainer h-[40px] w-[full] text-red-600">
            {ErrorMessage}
          </div>
          }
          <button className="h-[40px] w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-300" type="submit">
            Sign Up
          </button>
        </form>
      </div>
}
    </>
  );
};

export default SignUp;
