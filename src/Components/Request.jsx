import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestStore'
import { useNavigate } from 'react-router-dom'

const Request = () => {
  let [loadingId,setLoadingId]=useState(null);
  let requestData=useSelector(store=>store.request)
  console.log(requestData);
  let dispatch=useDispatch();
  let navigate=useNavigate()

//   this is used to fetch request data from backend
const fetchRequest=async()=>{
    try{
        const res=await axios.get("https://devtinder-tjp2.onrender.com/user/request/received",{withCredentials:true})
        // console.log(res.data);
        dispatch(addRequest(res.data))
    }
    catch(err){
        console.log(err)
    }
}
useEffect(()=>{
  fetchRequest();
},[])
 
// this is used to reject or accept the recieved requests
let handleRequests=async (status,id)=>{
  setLoadingId(id);
    try{
    let res=await axios.post("https://devtinder-tjp2.onrender.com/request/review/"+status+"/"+id,{},{withCredentials:true});
    dispatch(removeRequest(id))
    }
    catch(err){
        console.log(err)
    }
    finally{
      setLoadingId(null);
    }
    // console.log("inthjdbh"+res.data)
}
// if it is post request the you should pass {}(empty array if we are not passing any kind of data to backend also) after passing link

  return requestData ? (
    <div className="relative flex flex-col body-bg over_height">
      <main className="flex  justify-center  px-4 sm:px-6 md:px-10 pt-2 pt-2">
        <div className="flex  max-w-[960px] flex-col">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white text-[24px] font-bold your_connections"> Requests Recieved</p>
          </div>
           {requestData.length===0? (<><h1 className="m-auto mt-20 font-bold text-2xl">No Requests found</h1></>):
           (requestData.map(x=>{
            const {firstName,lastName,age,role,about,gender,photoUrl,isPremium}=x.fromUserId
            const _id=x._id
            // this is the connection request_id we have to send in api
            return(
             <div className="flex items-center gap-1 lg:gap-4 px-4 lg:px-8   body-bg py-3 lg:py-5 mb-5 for_down_border " key={x._id} >
              <div className="rounded-full h-25 min-w-18 max-w-20  overflow-hidden  background_img_connec cursor-pointer" onClick={()=>navigate(`/devtinder/usersProfile/${firstName+"-" +lastName}`,{state:x.fromUserId})}>
                <img src={photoUrl} alt="" className=" rounded-full w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col justify-center pl-4  color max-w-100 min-w-50 ">
                <p className="text-white text-base  font-bold leading-normal line-clamp-1 name ">{firstName} {lastName}
                    {isPremium && <span className="inline-flex ml-3 bg-blue-500 rounded-full  p-1 relative -top-1"><i class="fa-solid fa-check text-[10px]"></i></span>}
                </p>
                <p className="text-black text-sm font-normal leading-normal line-clamp-1 pt-1">{role}</p>
                <p className="text-[#9dacb8] text-sm font-normal py-1 line-clamp-3">{about}</p>
                <p className="text-[#9dacb8] text-sm font-normal leading-normal line-clamp-2">{age} {age && "years old"}  {gender && " | "} {gender}</p>
              </div>
              <div className='b-none ml-auto flex flex-wrap gap-2 lg:gap-0'>
                <button className="btn sucess_btn mr-2 hover:brightness-80" onClick={()=>handleRequests("accepted",_id)}>{loadingId===x._id?"wait...":"Accept"}</button>
                <button className="btn reject_btn hover:brightness-90 " onClick={()=>handleRequests("rejected",_id)}>{loadingId===_id?"wait...":"Reject"}</button>
              </div>
            </div>)
            }))}
        </div>
      </main>
    </div>
  ):(<h2 className="font-semibold text-center mt-6">Loading...</h2>)
}

export default Request
