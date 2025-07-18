import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUserFeed } from "../utils/feedSlice";

const PeopleProfile = () => {
  let [status,setStatus]=useState("");
  let [popUp,setPopUp]=useState(false)
  let [loading,setIsLoading]=useState(false);
  let location=useLocation();
  let userData=location.state;
  console.log(userData)
  let dispatch=useDispatch();
  let navigate=useNavigate();

  let fetchStatus=async()=>{
    try{
        let res=await axios.get(`https://devtinder-tjp2.onrender.com/connections/status/${userData._id}`,{withCredentials:true});
        console.log(res.data);
        setStatus(res.data.status)
    }
    catch(err){
        console.log(err)
    }
  }

  let handleRequest=async(status,id)=>{
    setIsLoading(true);
    try{
        let res=await axios.post(`https://devtinder-tjp2.onrender.com/request/${status}/${id}`,{},{withCredentials:true})
        console.log(res.data);
        dispatch(removeUserFeed(id))
        setPopUp(true);
    }
    catch(err){
        console.error(err);
    }
    finally{
      setIsLoading(false);

    }
  }
  useEffect(()=>{
    fetchStatus();
    setPopUp(false)
  },[userData])

  return (
    <>
    {userData?
    <div className="flex justify-center items-center">
    <div className="flex flex-col mt-3 justify-center items-cente w-full sm:w-full lg:w-1/2 md:w-1/2 px-4">
      <div className="flex p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full w-32 h-32 bg-cover  profile_img">
              <img src={userData.photoUrl} alt="" className="rounded-full object-contain w-32 h-32"/>
            </div>
            <div className="text-center ">
              <p className="text-[22px] font-bold  text_shadow name">{userData.firstName+" "+userData.lastName}
                 {userData?.isPremium && <span className="inline-flex ml-3 bg-blue-500 rounded-full  p-1 relative -top-1"><i className="fa-solid fa-check text-[12px]"></i></span>}
              </p>
              <p className="text-base  text_shadow font-bold mb-4 text-white">{userData.role}</p>
              <h1 className="text-left text-[16px] lg:text-[18px] font-bold light_shadow !text-gray-300">About</h1>
              <p className="text-sm lg:text-base truncate-3-lines font-bold text-black text-left">{userData.about}</p>
            </div>
        </div>
      </div>
      <div className="flex  gap-20">
        {userData?.age && <p className="px-4  text-[16px] lg:text-[18px] font-bold text-[#0d141c] light_shadow text-white !text-gray-200">Age : <span className="text-white !text-gray-200 text-[16px] lg:text-[18px]">{userData.age}</span></p>}
        <p className="px-4 text-[16px] lg:text-[18px] font-bold text-[#0d141c] light_shadow text-white !text-gray-300">Gender : <span className="text-white !text-gray-300 text-[16px] lg:text-[18px]">{userData.gender}</span></p>
      </div>
      {/* <h2 className="px-4 pb-2 pt-3 text-[18px] font-bold text-[#0d141c] light_shadow text-white">Skills : </h2> */}
      <div className="flex flex-wrap gap-3 mt-2 pt-1 items-center">
          <h2 className="pl-4 pb-2 pt-3 text-[16px] lg:text-[18px] font-bold text-[#0d141c] light_shadow text-white !text-gray-300">Skills : </h2>
        {userData?.skills?.map((skill,index) => (
          <div key={index} className=" h-7 lg:h-8 rounded-lg bg-[#e7edf4] px-3 lg:px-4 flex items-center mt-2 box_shadow">
            <p className="text-sm font-medium text-[#0d141c]">{skill}</p>
          </div>
        ))}
      </div>
      {status==="friends" && <h2 className="px-4 pb-3 pt-5 text-[16px] lg:text-[18px] font-bold text-white light_shadow text-white !text-gray-300">Email : <span className="text-[16px] lg:text-[18px] text-white !text-gray-300"><a 
      // href={`mailto:${userData.email}`}
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userData.email}`}
      target="_blank">{userData.email}</a></span></h2>}

      <div className="flex justify-center gap-3 lg:gap-4 md:gap-3 mt-10 text-center">
        {status==="friends" &&
           (
            <>
           <button className="pl-2 !pr-5 sm:pr-2 lg:px-6 py-2 font-bold text-[#E2B84B] pointer-events-none -mt-5">
           You are already connected 
        </button>
        <button onClick={()=>navigate(`/devTinder/Chating/${userData._id}`,{state:userData})} className="connect_btn px-5 -ml-6 -mt-5">Start Conversation..</button>
        </>
      )
        }

        {status==="sent" &&
        (<button className="px-5 text-sm  connect_btn waiting pointer-events-none">
          Request Sent by you, Waiting for Response
        </button>)
        }

        {status==="received" &&
        (<>
        <p className="font-semibold text-[#E2B84B] mb-3  ">This user has send you an connection request </p>
        <button className="connect_btn animate-bounce waiting respond" onClick={()=>navigate("/devTinder/requests-recieved")}>
          Respond
        </button>
        </>)
        }

        {status==="ignored" && <p className="font-bold text-red-500 -mt-1 ">Sorry,<i className="fa-solid fa-face-surprise"></i> You have rejected this profile </p>}

        { status==="none" && 
        (<>
        {!popUp?
        <>
        {loading?<p className="font-bold -mt-2">Please Wait...</p>:
          <>
          <button className="px-6 py-2 bg-geen-800 hover:bg-gren-700 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-amber-600 hover:bg-amber-500 connect_btn" onClick={()=>handleRequest("interested",userData._id)}>
          Connect
        </button>
        <button className="px-6 py-2 bg-rd-800 hover:bg-gry-300 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-gray-800 hover:bg-gray-700 ignore_btn " onClick={()=>handleRequest("ignored",userData._id)} disabled={loading}>
          Ignore
        </button>
        </>}
        </>:<p className="font-bold -mt-2 !text-green-600">Request Send</p>}
        </>)
        }
      </div>

    </div>
   </div>
    :<p>Loading...</p>}
    </>
  );
};


export default PeopleProfile;

