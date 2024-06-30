import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const Navigate = useNavigate();
    const [ProfileData, setProfileData] = useState({});
    const UserId = localStorage.getItem("Id")
    useEffect(()=>{
        const FetchProfileData = ()=>{
            axios.get(`http://localhost:3000/api/user/profile/${UserId}`)
            .then((response)=>{
                console.log(response.data)
                setProfileData(response.data)
                console.log(ProfileData)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        FetchProfileData();
    },[])

    const HandleFormSubmit =(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:3000/api/user/updateuser/${UserId}`,ProfileData,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            Navigate("/home")
        })
    }
  return (
    <>
      <div className="ProfileContent h-full w-full bg-white p-8 shadow-lg rounded-lg animate-slideIn flex flex-col items-start ">
            <h1 className="text-4xl font-bold mb-8">Edit Profile Details</h1>

            <form className="ProfileDetails w-full grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e)=>HandleFormSubmit(e)}>
              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Full Name</h2>
                <input className="text-lg" value={ProfileData.FullName}
                onChange={(e)=>setProfileData({...ProfileData,FullName:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Email</h2>
                <input className="text-lg" value={ProfileData.Email}
                onChange={(e)=>setProfileData({...ProfileData,Email:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Contact</h2>
                <input className="text-lg" value={ProfileData.Contact}
                onChange={(e)=>setProfileData({...ProfileData,Contact:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Height</h2>
                <input className="text-lg" value={ProfileData.Height}
                onChange={(e)=>setProfileData({...ProfileData,Height:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Goal</h2>
                <input className="text-lg" value={ProfileData.Goal}
                onChange={(e)=>setProfileData({...ProfileData,Goal:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Gender</h2>
                <input className="text-lg" value={ProfileData.Gender}
                onChange={(e)=>setProfileData({...ProfileData,Gender:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Date of Birth</h2>
                <input className="text-lg" value={ProfileData.DateOfBirth}
                onChange={(e)=>setProfileData({...ProfileData,DateOfBirth:e.target.value})}></input>
              </div>

              <div className="ProfileDetail p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Age</h2>
                <input className="text-lg" value={ProfileData.Age}
                onChange={(e)=>setProfileData({...ProfileData,Age:e.target.value})}></input>
              </div>

              <button type="submit"className="h-[40px] w-[100px]">Edit</button>
            </form>
          </div>
    </>
  )
}

export default EditProfile  
