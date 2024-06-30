import { useAuthContext } from "../Context/AuthContext";
import { RiUser3Fill } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { BsJournalText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./Loading";

const Header = () => {
    const [isLoading, setisLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const PrevUser = localStorage.getItem("Id")
    const handleNavigation =(path) => {
        setisLoading(true);
        navigate(path);
        setisLoading(false);
    };

    const handleProfileClick = () => {
        const Id = localStorage.getItem("Id");
        handleNavigation(`/profile/${Id}`);
    };

    const handleAddDayClick = () => {
        handleNavigation("/addday");
    };

    const handleHistoryClick = () => {
        handleNavigation("/history");
    };

    const handleExercisesClick = () => {
        handleNavigation("/exercises");
    };
    const handleProgressClick=()=>{
        handleNavigation("/progress")
    }
    const handleJournalClick=()=>{
        handleNavigation("/journal")
    }
    const handleAddExerciseClick = () => {
        handleNavigation("/addexercise");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("Id");
        setAuthUser(null)
        handleNavigation("/");
    };


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="Header h-[80px] w-full bg-gradient-to-r from-[#E0E2DB] to-[#C8C9C5] shadow-lg flex justify-center items-center">
                    <div className="HeaderInnerContainer h-[60px] w-[90%] max-w-[800px] flex justify-around items-center">
                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleProfileClick}
                        >
                            <RiUser3Fill className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Profile</span>
                        </div>

                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleAddDayClick}
                        >
                            <IoAddSharp className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Add Day</span>
                        </div>

                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleHistoryClick}
                        >
                            <MdHistory className="text-2xl mb-1" />
                            <span className="text-sm font-medium">History</span>
                        </div>

                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleExercisesClick}
                        >
                            <FaDumbbell className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Exercises</span>
                        </div>
                        
                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleProgressClick}
                        >
                            <GiProgression className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Progress</span>
                        </div>
                        
                        <div
                            className="header-item h-full w-[120px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleJournalClick}
                        >
                            <BsJournalText className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Journal</span>
                        </div>

                        {authUser.UserType === "ADMIN" && (
                            <div
                                className="header-item h-full w-[140px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                                onClick={handleAddExerciseClick}
                            >
                                <IoAddSharp className="text-2xl mb-1" />
                                <span className="text-sm font-medium">Add Exercise</span>
                            </div>
                        )}
                        <div
                            className="header-item h-full w-[140px] flex flex-col items-center justify-center text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={handleLogoutClick}
                        >
                            <IoMdLogOut className="text-2xl mb-1" />
                            <span className="text-sm font-medium">Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
