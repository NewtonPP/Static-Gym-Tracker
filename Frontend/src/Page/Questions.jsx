import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as yyyy-MM-dd
    setCurrentDate(formattedDate);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      Date: formattedDate,
      User: userId,
    }));
  }, [userId]);

  const [answers, setAnswers] = useState({
    User: "",
    Weight: "",
    BodyFat: "",
    Date: new Date().toISOString().split('T')[0] // Format as yyyy-MM-dd,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/progress/addprogress", answers, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      const today = new Date().toISOString().split('T')[0];
      const lastSubmittedDates = JSON.parse(localStorage.getItem('lastSubmittedDates')) || {};
    
      lastSubmittedDates[userId] = today;
      localStorage.setItem('lastSubmittedDates', JSON.stringify(lastSubmittedDates));

      navigate(`/profile/${userId}`);
    })
    .catch((error) => {
      setError(error.response?.data?.message || "An error occurred");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Set Your Daily Progress</h1>

        <form onSubmit={handleSubmit}>
          {/* <div className="mb-6">
            <label htmlFor="Goal" className="block mb-2 text-sm font-medium text-gray-900">
              What is your Goal
            </label>
            <select
              id="Goal"
              value={answers.Goal}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setAnswers({ ...answers, Goal: e.target.value })}
            >
              <option value="">Select your goal</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Muscle Gain">Muscle Gain</option>
            </select>
          </div> */}

          <div className="mb-6">
            <label htmlFor="Weight" className="block mb-2 text-sm font-medium text-gray-900">
              Your Weight (kg)
            </label>
            <input
              type="text"
              id="Weight"
              placeholder="Enter your weight"
              value={answers.Weight}
              onChange={(e) => setAnswers({ ...answers, Weight: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="BodyFat" className="block mb-2 text-sm font-medium text-gray-900">
              Body Fat Percentage
            </label>
            <input
              type="text"
              id="BodyFat"
              placeholder="Enter your body fat percentage"
              value={answers.BodyFat}
              onChange={(e) => setAnswers({ ...answers, BodyFat: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="Date" className="block mb-2 text-sm font-medium text-gray-900">
              Date
            </label>
            <input
              type="date"
              id="Date"
              value={currentDate}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          
          {error && 
            <div className='text-red-600 text-center my-2'>
              {error}
            </div>
          }
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm font-medium rounded-lg px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questions;
