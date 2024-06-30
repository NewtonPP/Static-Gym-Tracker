// frontend/src/EditProfile.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("Id");
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/profile/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/user/updateuser/${userId}`, profileData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="ProfilePage h-full w-full bg-[#F0F7F4] flex flex-col items-center">
      {isLoading ? (
        <div className="ProfileContent h-full w-full bg-white p-8 shadow-lg rounded-lg flex flex-col items-center justify-center animate-slideIn">
          <p className="text-5xl font-bold animate-fadeIn mb-8">Loading...</p>
        </div>
      ) : (
        <div className="ProfileContent h-full w-full bg-white p-8 shadow-lg rounded-lg animate-slideIn flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8">Edit Profile Details</h1>
          <form className="ProfileDetails w-full grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
            {[
              { label: "Full Name", value: "FullName" },
              { label: "Email", value: "Email" },
              { label: "Contact", value: "Contact" },
              { label: "Height", value: "Height" },
              { label: "Goal", value: "Goal" },
              { label: "Gender", value: "Gender" },
              { label: "Date of Birth", value: "DateOfBirth" },
              { label: "Age", value: "Age" },
            ].map((field) => (
              <div key={field.value} className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">{field.label}</h2>
                <input
                  type="text"
                  className="text-lg w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData[field.value] || ""}
                  onChange={(e) => setProfileData({ ...profileData, [field.value]: e.target.value })}
                />
              </div>
            ))}
            <div className="col-span-1 sm:col-span-2 flex justify-start">
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
