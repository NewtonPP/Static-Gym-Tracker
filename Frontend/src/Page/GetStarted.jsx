import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const HandleSigninClick = ()=>{
      navigate("/signin")
  }

  const HandleSignupClick=()=>{
    navigate("/signup")
  }
  return (
    <>
      <div className="HeaderPart h-[70px] w-[100%] bg-blue-900 flex justify-between items-center px-10">
        <div className="ImageContainer h-[70px] flex items-center gap-5">
          <img src="Image/Logo.jpg" className="h-[60px] w-[60px]" alt="Logo" />
          <h1 className="text-[40px] font-[800] text-white">STATIC</h1>
        </div>
        <div className="ButtonContainer flex gap-5">
          <button className="bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-300" onClick={HandleSigninClick}>Sign In</button>
          <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"onClick={HandleSignupClick}>Get Started</button>
        </div>
      </div>
      <section className="WorkoutPrep relative h-[700px] w-[100%]">
        <img src="Image/WorkoutPrep.jpg" className="absolute inset-0 h-full w-full object-cover" alt="Workout Preparation" />
        <div className="absolute top-[350px] left-[0px] w-full flex flex-col items-center text-center px-4">
          <h1 className="text-[70px] text-white font-[600] leading-tight">Unlock Your Full Potential</h1>
          <p className="text-[30px] text-white font-[300] max-w-[800px]">With Static, you can track your daily workouts, learn about different exercises, and get closer to your goal.</p>
        </div>
      </section>
    </>
  );
}

export default GetStarted;
