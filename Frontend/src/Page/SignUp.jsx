import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Loading from '../Components/Loading';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    FullName: "",
    Contact: "",
    Email: "",
    Height: "",
    Goal: "",
    Gender: "",
    DateOfBirth: dateOfBirth,
    Password: "",
    ConfirmPassword: ""
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    axios.post("http://localhost:3000/api/user/signup", {
      ...signupData,
      DateOfBirth: formattedDateOfBirth
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        localStorage.setItem("User", JSON.stringify(response.data));
        localStorage.setItem("Id", response.data._id);
        setAuthUser(response.data);
        setIsLoading(false);
        navigate(`/profile/${response.data._id}`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      });
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
        isLoading ? <Loading /> :
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
                  selected={dateOfBirth}
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

              <div className="Goal w-full mb-4">
            <label htmlFor="Goal" className="block mb-2 text-sm font-medium text-gray-900">
              What is your Goal
            </label>
            <select
              id="Goal"
              value={signupData.Goal}
              className="h-[40px] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSignupData({ ...signupData, Goal: e.target.value })}
            >
              <option value="">Select your goal</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Muscle Gain">Muscle Gain</option>
            </select>
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
                errorMessage &&
                <div className="ErrorContainer h-[40px] w-[full] text-red-600">
                  {errorMessage}
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
