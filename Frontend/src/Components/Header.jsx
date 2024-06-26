import { RiUser3Fill } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const Navigate = useNavigate();

    // Methods
    const HandleProfileClick = () => {
        const Id = localStorage.getItem("Id")
        Navigate(`/profile/${Id}`);
    };

    const HandleAddDayClick = () => {
        Navigate("/addday");
    };

    const HandleHistoryClick = () => {
        Navigate("/history");
    };
    
    const HandleExercisesClick = () => {
        Navigate("/exercises");
    };

    const HandleAddExerciseClick = () => {
        Navigate("/addexercise");
    };

    return (
        <div className="Header h-[80px] w-full bg-gradient-to-r from-[#E0E2DB] to-[#C8C9C5] shadow-lg flex justify-center items-center">
            <div className="HeaderInnerContainer h-[60px] w-[90%] max-w-[800px] flex justify-around items-center">
                <div
                    className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={HandleProfileClick}
                >
                    <RiUser3Fill className="text-2xl mb-1"/>
                    <span className="text-sm font-medium">Profile</span>
                </div>

                <div
                    className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={HandleAddDayClick}
                >
                    <IoAddSharp className="text-2xl mb-1"/>
                    <span className="text-sm font-medium">Add Day</span>
                </div>

                <div
                    className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={HandleHistoryClick}
                >
                    <MdHistory className="text-2xl mb-1"/>
                    <span className="text-sm font-medium">History</span>
                </div>

                <div
                    className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={HandleExercisesClick}
                >
                    <FaDumbbell className="text-2xl mb-1"/>
                    <span className="text-sm font-medium">Exercises</span>
                </div>

                <div
                    className="header-item h-full w-[140px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={HandleAddExerciseClick}
                >
                    <IoAddSharp className="text-2xl mb-1"/>
                    <span className="text-sm font-medium">Add Exercise</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
