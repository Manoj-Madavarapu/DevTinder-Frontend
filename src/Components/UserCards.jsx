import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import TinderCard from 'react-tinder-card';
import { removeUserFeed } from '../utils/feedSlice';
import SwipeCard from './SwipeCard';

const UserCards = ({ feedData }) => {
  let [removeUserData,setRemovedUserData]=useState();
  const [data, setData] = useState(feedData || []);
  let [popUp,setPopUp]=useState(false);
  // console.log(feedData)
  const dispatch=useDispatch();
  
  let currentCard=data[data.length-1]
  let currentCardId=currentCard?._id

  // this is used to handle send and ignore the connections to other users 
  const handleSendRequests = async (dir, user) => {
  try {
    const status = dir === 'right' ? 'interested' : 'ignored';
    const res = await axios.post(`https://devtinder-tjp2.onrender.com/request/${status}/${user._id}`, {}, { withCredentials: true });
    dispatch(removeUserFeed(user._id));
    setRemovedUserData(res.data.data);
    setPopUp(true);
    setData((prev) => prev.filter((u) => u._id !== user._id)); // remove from list
    console.log(dir+"sent sucessfully")
  } catch (err) {
    console.log(err);
    alert("Something went wrong, please refresh the page")
  }
};

  useEffect(()=>{
    let timer=setTimeout(()=>{
      setPopUp(false)
    },1500);
    return ()=>clearTimeout(timer);
  })

  if (!feedData) return;
  // if(feedData.length===0) return <h1>OOPS Sorry, we dont have any users to show in your feed </h1>
  return(
  <>
  <div className='relative '>
    {feedData.length!==0?(
      <>
    <div className='flex justify-center items-center px-4 sm:px-6 md:px-10 mt-10 lg:mt-5'>
  <div className="relative h-[480px] w-full max-w-[370px]">
  
  {feedData.map((x, index) => (
    <SwipeCard
      key={x.id || index} // make sure to have a unique key
      user={x} onSwipeEnd={handleSendRequests} index={index} feedData={feedData}
      // index and feedData is for css design of cards
    >
    </SwipeCard>
  ))}
  </div>
   </div>
  <div className='send_connection_btn flex justify-center  flex-wrap gap-6 gap-15 md:gap-16 lg:gap-20 lg:pb-0 pb-25 mt-8 lg:mt-5'>
    <button className="btn btn-soft bg-red-500 color-white btn1 ignore_btn " disabled={!currentCardId} onClick={()=>handleSendRequests("left",currentCard)}><i className="fa-solid fa-left-long z-100"></i>Ignore</button>
    <button className="btn bg-green-500 text-white btn2 connect_btn" disabled={!currentCardId} onClick={()=> handleSendRequests("right",currentCard)}>Connect<i className="fa-solid fa-right-long"></i></button>
  </div>
 
</>
  ):(<h1 className="mt-50 -ml-30 font-bold">OOPS Sorry, we dont have any users to show in your feed </h1>)}
  </div>
  
  {/* toast(popup) to display sucessfull send request message */}
  {removeUserData && popUp && <div className="toast toast-end ">
    {removeUserData.status==="interested"?<div className="alert alert-success toast_edit font-bold text-black bg-[rgba(0,158,11, 0.86)] border-none">
      <span className='text-green-700'><i className="fa-solid fa-circle-check mr-2"></i>Connection request send sucessfully</span>
    </div>:
    <div className="alert toast_edit font-bold   border-none">
      <span className='text-red-500'><i className="fa-solid fa-circle-xmark mr-2 "></i>Profile Ignored</span>
    </div>
    }
  </div>}
  </>
  );
};

export default UserCards;












// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TinderCard from 'react-tinder-card';
// import { removeUserFeed } from '../utils/feedSlice';

// const UserCards = ({ feedData }) => {
//   let [removeUserData,setRemovedUserData]=useState();

//   let [popUp,setPopUp]=useState(false);
//   // let [buttonClicked,setButtonClicked]=useState("");
//   const {firstName, lastName, age, gender, skills, about, photoUrl } = feedData;
//   // console.log(feedData)
//   // const sendRequestId=feedData.map(x=>x.id)
//   const dispatch=useDispatch();
  
//   let currentCard=feedData[feedData.length-1]
//   let currentCardId=currentCard?._id

//   // this is used to handle send and ignore the connections to other users
//   const handleSendRequests=async (status,id)=>{
//     try{
//        const res=await axios.post(`http://localhost:4000/request/${status}/${id}`,
//         {},{withCredentials:true});
//         // console.log(res.data)
//         dispatch(removeUserFeed(id))
//         setRemovedUserData(res.data.data)
//         setPopUp(true);
//         // in above id we are apssing the id of person for whom we are snding the connection request
//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   const onSwipe = (direction,name) => {
//     console.log('You swiped: ' + direction);
//     if(direction==="right"){
//       handleSendRequests("interested",currentCardId);
//       console.log("Connection request send to "+name+" succesfully")
//     }
//     else if(direction==="left"){
//       handleSendRequests("ignored",currentCardId)
//       console.log(name+ "profile is ignored")
//     }
//   };

//   const onCardLeftScreen = (name) => {
//     console.log(name + ' left the screen');
//   };
  
//   useEffect(()=>{
//     let timer=setTimeout(()=>{
//       setPopUp(false)
//     },1500);
//     return ()=>clearTimeout(timer);
//   })

//   if (!feedData) return;
//   // if(feedData.length===0) return <h1>OOPS Sorry, we dont have any users to show in your feed </h1>
//   return(
//   <>
//   <div className='relative '>
//     {feedData.length!==0?(
//       <>
//     <div className='flex justify-center items-center px-4 sm:px-6 md:px-10 mt-10 lg:mt-5'>
//   <div className="relative h-[480px] w-full max-w-[370px]">
  
//   {feedData.map((x, index) => (
//     <TinderCard
//       key={x.id || index} // make sure to have a unique key
//             // className={`absolute flex flex-col max-height-70 touch-none z-1000 absolute `}
//       className={`absolute flex flex-col max-height-70 touch-none z-1
//         ${index === feedData.length-1 ? "translate-x-[15px] translate-y-[12px]" : ""}  
//         ${index === feedData.length-2 ? "translate-x-[10px] translate-y-[8px]" : ""}
//         ${index === feedData.length-3 ? "translate-x-[5px] translate-y-[4px]" : ""}
//         ${index === feedData.length-4 ? "translate-x-[1px] translate-y-[1px]" : ""}
//         `}
//       onSwipe={(dir) => onSwipe(dir, x.firstName)}
//       // onCardLeftScreen={() => onCardLeftScreen(x.firstName)}
//       preventSwipe={['up', 'down']} // only allow left/right
//     >
//       <div className="card bg-white image-full w-full h-[460px]  card_shadow2 h-[460px] overflow-hidden relative">
//         <figure className='relative'>
//           <img src={x.photoUrl} alt="image"  className='card_img image-full w-full h-full  max-height-70 object-cover !brightness-35 '/>
//         </figure>
//         <div className="absolute  bottom-0 flex flex-col  p-4 sm:p-4 md:p-5">
//           <h2 className="card-title text-3xl mb-3">{x.firstName} {x.lastName}</h2>
//            <h2 className="font-bold">{x.role}</h2>
//           { x.age && x.gender && <p className='my-1'>{x?.age +", "+ x?.gender}</p>}
//           <p className='line-clamp-3 overflow-hidded'>{x.about}</p>
//         </div>
//       </div>
//     </TinderCard>
//   ))}
//   </div>
//    </div>
//   <div className='send_connection_btn flex justify-center  flex-wrap gap-6 gap-15 md:gap-16 lg:gap-20 lg:pb-0 pb-25 mt-8 lg:mt-5'>
//     <button className="btn btn-soft bg-red-500 color-white btn1 ignore_btn " onClick={()=>handleSendRequests("ignored",currentCardId)}><i className="fa-solid fa-left-long z-100"></i>Ignore</button>
//     <button className="btn bg-green-500 text-white btn2 connect_btn" onClick={()=> handleSendRequests("interested",currentCardId)}>Connect<i className="fa-solid fa-right-long"></i></button>
//   </div>
 
// </>
//   ):(<h1 className="mt-50 -ml-30 font-bold">OOPS Sorry, we dont have any users to show in your feed </h1>)}
//   </div>
  
//   {/* toast(popup) to display sucessfull send request message */}
//   {removeUserData && popUp && <div className="toast toast-end ">
//     {removeUserData.status==="interested"?<div className="alert alert-success toast_edit font-bold text-black bg-[rgba(0,158,11, 0.86)] border-none">
//       <span className='text-green-700'><i className="fa-solid fa-circle-check mr-2"></i>Connection request send sucessfully</span>
//     </div>:
//     <div className="alert toast_edit font-bold   border-none">
//       <span className='text-red-500'><i className="fa-solid fa-circle-xmark mr-2 "></i>Profile Ignored</span>
//     </div>
//     }
//   </div>}
//   </>
//   );
// };

// export default UserCards;