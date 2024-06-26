import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const AddExercise = () => {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState({
    Name: '',
    PartInvolved: '',
    Instructions: '',
    Image: null,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', exerciseData.Name);
    formData.append('PartInvolved', exerciseData.PartInvolved);
    formData.append('Instructions', exerciseData.Instructions);
    formData.append('Image', exerciseData.Image);

    axios.post('http://localhost:3000/api/exercises/addexercise', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => console.log(response))
    .catch((error) => console.error('Error:', error));
    navigate("/exercises");
  };

  const handleFileChange = (e) => {
    setExerciseData({ ...exerciseData, Image: e.target.files[0] });
  };

  return (
    <>
      <Header />
      <div className="AddExercise min-h-screen w-full bg-[#F0F7F4] py-8 flex flex-col items-center">
        <div className="Exercises h-16 w-full bg-[#5A5A5A] text-white text-2xl flex justify-center items-center font-semibold">
          Add Exercise
        </div>
        <form className="ExerciseForm w-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setExerciseData({ ...exerciseData, Name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partInvolved">
              Part Focused
            </label>
            <input
              id="partInvolved"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setExerciseData({ ...exerciseData, PartInvolved: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              id="instructions"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              onChange={(e) => setExerciseData({ ...exerciseData, Instructions: e.target.value })}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddExercise;
