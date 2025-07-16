import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestStore'

const RequestSend = () => {
    let [store,setStore]=useState()

//   this is used to fetch request data from backend
const fetchRequest=async()=>{
    try{
        const res=await axios.get("https://devtinder-tjp2.onrender.com/user/Connection-requests/send",{withCredentials:true})
        console.log(res.data);
        setStore(res.data);
    }
    catch(err){
        console.log(err)
    }
}

 let [pages,setPages]=useState(1)
 let recordsPerPage=6;
 let totalPages=Math.ceil(store?.length/recordsPerPage);
 function getPages(){
    let firstIndex=(pages-1)*recordsPerPage;
    let lastIndex=firstIndex+recordsPerPage;
    return store.slice(firstIndex,lastIndex);
 }


useEffect(()=>{
  fetchRequest();
},[])



 return store ? (
    <div className="relative flex flex-col body-bg over_height">
      <main className="flex  flex-col items-center px-4 sm:px-6 md:px-10 w-full">
        <div className="flex  max-w-[960px] w-full flex-col">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white text-[20px] font-bold your_connections">Connection Request's Send by you</p>
          </div>
           {store?.length===0? (<><h1 className="m-auto mt-20 font-bold text-2xl">No Requests found</h1></>):
           (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-4">
           {getPages().map(x=>{
            const {firstName,lastName,age,role,about,gender,photoUrl,isPremium}=x.toUserId
            const _id=x._id
            // this is the connection request_id we have to send in api
            return(
             <div className="flex items-center gap-1 sm:gap-1 px-3 sm:px-5 lg:px-8 w-full body-bg py-4 sm:py-5 mb-3 for_down_border " key={x._id}>
              <div className="rounded-full h-25 w-18 min-width-18 overflow-hidden  background_img_connec ">
                <img src={photoUrl} alt="" className=" rounded-full  w-full h-full min-width-18 object-cover"/>
              </div>
              <div className="flex flex-col justify-center pl-4  color max-w-75 ">
                <p className="text-white text-base  font-bold leading-normal line-clamp-1 name ">{firstName} {lastName}
                    {isPremium && <span className="inline-flex ml-3 bg-blue-500 rounded-full  p-1 relative -top-1"><i class="fa-solid fa-check text-[10px]"></i></span>}
                </p>
                <p className="text-black text-sm font-normal leading-normal line-clamp-1 pt-1">{role}</p>
                {/* <p className="text-[#9dacb8] text-sm font-normal py-1 line-clamp-3">{about}</p> */}
                <p className="text-[#9dacb8] text-sm font-normal leading-normal line-clamp-2">{age} {age && "years old"}  {gender && " | "} {gender}</p>
              </div>
            </div>)
            })}
            </div>)
}
        </div>
        {store.length>6 && <div className='pages'>
          <button onClick={()=>setPages(prev=>prev-1)} disabled={pages==1}>&lt;</button>
          <button style={{backgroundColor:"#f9c935",cursor:"default"}}>{pages}</button>
          <button onClick={()=>setPages(prev=>prev+1)} disabled={pages==totalPages}>&gt;</button>
        </div>}
      </main>
    </div>
  ):(<h2 className="font-semibold text-center mt-6">Loading...</h2>)
}
export default RequestSend;

