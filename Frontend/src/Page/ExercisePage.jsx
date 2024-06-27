import axios from "axios";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import Loading from "../Components/Loading";

const ExercisePage = () => {
  const [Exercises, setExercises] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const Navigate = useNavigate()
  useEffect(() => {
    const fetchExercises = () => {
      setisLoading(true)
      axios.get("http://localhost:3000/api/exercises/getexercises", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setExercises(response.data);
          setisLoading(false)
        });
    };
    fetchExercises();
  }, []);

  const HandlePenClick=(id)=>{
    Navigate(`/editexercise/${id}`)
  }
  return (
    <>
      <Header />
      {
        isLoading ? <Loading/> :
      <div className="ExercisePage min-h-screen w-full bg-[#F0F7F4] py-8">
        <div className="Exercises h-16 w-full bg-[#5A5A5A] text-white text-2xl flex justify-center items-center font-semibold">
          Exercises
        </div>
        <div className="ExerciseList max-w-[1200px] mx-auto mt-8">
          {Exercises.map((exercise) => (
            <div key={exercise.Name} className="EachExercise bg-white shadow-lg rounded-lg overflow-hidden flex items-center mb-8">
              <FaPen className="relative top-[-130px] left-[1160px]" onClick={()=>HandlePenClick(exercise._id)}/>
              <img
                src={`http://localhost:3000/${exercise.Image}`}
                className="h-[300px] w-[300px] object-cover"
                alt={exercise.Name}
              />
              <div className="p-6 flex flex-col justify-between min-h-[200px] w-[800px]">
                <h2 className="text-2xl font-bold mb-2">{exercise.Name}</h2>
                <p className="text-lg text-gray-700 mb-4">
                  {exercise.PartInvolved}
                </p>
                <div
                  className="text-base text-gray-600 w-[800px]"
                  dangerouslySetInnerHTML={{
                    __html: exercise.Instructions.replace(/\n/g, "<br>"),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
}
    </>
  );
};

export default ExercisePage;
