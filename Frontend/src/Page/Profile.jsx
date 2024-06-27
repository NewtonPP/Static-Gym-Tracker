import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../Components/Loading";

const Profile = () => {
  const [isLoading, setisLoading] = useState(false)
  const location = useLocation();
  const [profileData, setProfileData] = useState(null);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  let pathname = location.pathname;
  pathname = pathname.slice(8, pathname.length);

  const handleProfileClick = () => {
    setIsProfileClicked(true);
  };

  useEffect(() => {
    setisLoading(true)
    const fetchProfileData = () => {
      axios.get(`http://localhost:3000/api/user/profile${pathname}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setProfileData(response.data);
          setisLoading(false)
        });
    };
    fetchProfileData();
  }, [pathname]);

  return (
    <>
      <Header />
      {
        isLoading ? <Loading/> :
      <div className="ProfilePage h-full w-full bg-[#F0F7F4] flex flex-col items-center">
        {!isProfileClicked && profileData && (
          <div className="ProfileContent h-full w-full bg-white p-8 shadow-lg rounded-lg flex flex-col items-center justify-center animate-slideIn">
            <p className="text-5xl font-bold animate-fadeIn mb-8">Welcome, {profileData.FullName}!</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 h-[50px] w-[220px] rounded-full text-xl text-white transition duration-300 ease-in-out transform hover:scale-105 animate-fadeIn"
              onClick={handleProfileClick}
            >
              Visit Your Profile
            </button>
          </div>
        )}
        {isProfileClicked && profileData && (
          <div className="ProfileContent h-full w-full bg-white p-8 shadow-lg rounded-lg animate-slideIn flex flex-col items-start">
            <h1 className="text-4xl font-bold mb-8">Profile Details</h1>
            <div className="ProfileDetails w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Full Name</h2>
                <p className="text-lg">{profileData.FullName}</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-lg">{profileData.Email}</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Contact</h2>
                <p className="text-lg">{profileData.Contact}</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Height</h2>
                <p className="text-lg">{profileData.Height} ft</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Weight</h2>
                <p className="text-lg">{profileData.Weight} kg</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Gender</h2>
                <p className="text-lg">{profileData.Gender}</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Date of Birth</h2>
                <p className="text-lg">{profileData.DateOfBirth}</p>
              </div>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Age</h2>
                <p className="text-lg">{profileData.Age}</p>
              </div>
            </div>
          </div>
        )}
      </div>
}
    </>
  );
};

export default Profile;
