import axios from "axios";
import { nav } from "framer-motion/m";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let Connections=()=> {
    let [store,setStore]=useState()
    let navigate=useNavigate();

    // console.log(store)
let fetchConnections=async ()=>{
    try{
        let res=await axios.get("https://devtinder-tjp2.onrender.com/user/your-connections/accepted",{withCredentials:true})
        // console.log(res.data);
        setStore(res.data)
    }
    catch(err){
        console.log(err)
    }
}

// pagination for dispay cards
let [pages,setPages]=useState(1);
let recordsPerPage=3;
let totalPages=Math.ceil(store?.length/recordsPerPage);
function getPages(){
    let firstIndex=(pages-1)*recordsPerPage;
    let lastIndex=firstIndex+recordsPerPage;
    return store.slice(firstIndex,lastIndex)
}
function nextPage(){
  setPages(pages+1)
}
function prevPage(){
  setPages(pages-1)
}
useEffect(()=>{
    fetchConnections()
},[]);
  if (!store) return <h2 className="font-semibold text-center mt-6">Loading...</h2>
  // if(store.length===0) return <><h1 className="">No Connections found</h1></>
  return store ?(
    <>
    <div className="relative flex flex-col w-full body-bg over_height sm:mb-5">
      <main className="flex flex-col flex-1 justify-center items-center px-4 pt-2">
        <div className="flex max-w-[960px] w110 sm:w-150 lg:w-200 md:w-150 flex-col lg:px-8 md:px-8 sm:px-2 lg:mt-0">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold your_connections mb-3"> Your Connections  &nbsp;<i className="fa-solid fa-handshake-angle text-[20px]"></i></p>
          </div>
          {store.length===0? (<><h1 className="m-auto mt-20 font-bold text-2xl">No Connections found</h1><p className="m-auto font-bold text-base mt-2">Send requests to increase your connections</p></>):(
           getPages().map(x=>(
             <div className="flex  gap-4 px-4 body-bg pt-2  pb-5 mb-5 for_down_border " key={x?._id}>
              <div className="rounded-full h-25 w-20 overflow-hidden  background_img_connec min-w-20 cursor-pointer " 
              onClick={()=>navigate(`/devTinder/usersProfile/${x.firstName+"-"+x.lastName}`,{state:x})}
              >
                <img src={x?.photoUrl} alt="" className="rounded-full w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col justify-center px-4 color">
                <p className="text-white text-base  font-bold leading-normal line-clamp-1 name">{x?.firstName} { x?.lastName}
                   {x?.isPremium && <span className="inline-flex ml-3 bg-blue-500 rounded-full  p-1 relative -top-1"><i className="fa-solid fa-check text-[10px]"></i></span>}</p>
                <p className="text-black text-sm font-normal leading-normal line-clamp-1">{x?.role}</p>
                <p className="text-[#9dacb8] text-sm font-normal leading-normal line-clamp-2">{x?.about}</p>
                <p className="text-[#9dacb8] text-sm font-normal leading-normal line-clamp-2">{x?.age} {x?.age && "years old"}  {x?.gender && "| "}{x?.gender}</p>
              </div>
             <div className="relative lg:right-10  top-1 lg:top-2 tooltip cursor-pointer" data-tip="Chat" 
             onClick={()=>navigate(`/devTinder/Chating/${x._id}`,{state:x})}>
              <i className="fa-solid fa-message !text-white"></i>
             </div>
            </div>
            
           )))
          }
        </div>
        {store.length>3 && <div className='pages sm:mb-5'>
          <button onClick={prevPage} disabled={pages==1}>&lt;</button>
          <button style={{backgroundColor:"#f9c935",cursor:"default"}}>{pages}</button>
          <button onClick={nextPage} disabled={pages==totalPages}>&gt;</button>
        </div>}
      </main>
    </div>
  </>
  ):<>Loading...</>;
}
export default Connections