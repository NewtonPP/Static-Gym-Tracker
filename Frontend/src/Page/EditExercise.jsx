import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header';

const AddExercise = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.slice(13);
  const [exerciseData, setExerciseData] = useState({
    Name: '',
    PartInvolved: '',
    Instructions: '',
    Image: null,
  });

  useEffect(() => {
    const fetchExerciseData = () => {
      axios.get(`http://localhost:3000/api/exercises/${pathname}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setExerciseData({
          Name: response.data.Name,
          PartInvolved: response.data.PartInvolved,
          Instructions: response.data.Instructions,
          Image: response.data.Image,
        });
        console.log('Fetched data:', response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
    };

    fetchExerciseData();
  }, [pathname]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('Name', exerciseData.Name);
    // formData.append('PartInvolved', exerciseData.PartInvolved);
    // formData.append('Instructions', exerciseData.Instructions);
    // if (exerciseData.Image instanceof File) {
    //   formData.append('Image', exerciseData.Image);
    // }

    // Print FormData contents
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios.put(`http://localhost:3000/api/exercises/${pathname}`, exerciseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Updated data:', response.data);
      navigate("/exercises");
    })
    .catch((error) => console.error('Error updating exercise:', error));
  };

  const handleFileChange = (e) => {
    setExerciseData({ ...exerciseData, Image: e.target.files[0] });
    console.log('File selected:', e.target.files[0]);
  };

  return (
    <>
      <Header />
      <div className="AddExercise min-h-screen w-full bg-[#F0F7F4] py-8 flex flex-col items-center">
        <div className="Exercises h-16 w-full bg-[#5A5A5A] text-white text-2xl flex justify-center items-center font-semibold">
          Edit Exercise
        </div>

        <form className="ExerciseForm w-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={exerciseData.Name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setExerciseData({ ...exerciseData, Name: e.target.value });
                console.log('Name changed:', e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partInvolved">
              Part Focused
            </label>
            <input
              id="partInvolved"
              type="text"
              value={exerciseData.PartInvolved}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setExerciseData({ ...exerciseData, PartInvolved: e.target.value });
                console.log('PartInvolved changed:', e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={exerciseData.Instructions}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              onChange={(e) => {
                setExerciseData({ ...exerciseData, Instructions: e.target.value });
                console.log('Instructions changed:', e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddExercise;
