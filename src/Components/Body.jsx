import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Feed from './Feed';

const Body = () => {
  let [premiumUser,setPremiumUser]=useState();
  let userData=useSelector(store=>store.user);
  let navigate = useNavigate();
  let dispatch=useDispatch();
  let fetchUser=async()=>{
    if(userData) return ;
    try{
      let res=await axios.get("https://devtinder-tjp2.onrender.com/profile/view",{withCredentials:true})
      // console.log("userData",res.data)
      dispatch(addUser(res.data))
      // isPremiumUser()
    }
    catch(err){
      if(err?.response?.status===401){
        navigate("/devTinder/login")
      }
      console.log(err)
    }
  }

   const isPremiumUser=async ()=>{
    try{
      const res=await axios.get("https://devtinder-tjp2.onrender.com/membership/verification",{withCredentials:true})
      // console.log(res.data)
      setPremiumUser(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchUser();
    // isPremiumUser();
  },[])
  
  useEffect(() => {
  if (userData) {
    isPremiumUser(); // call this only after user is confirmed
  }
}, [userData]);

  // we have written fetchUSer code because if we refresh the store data will be lost soo for storing the data again in store.(if we refresh also it will check if user is logged in or not and if not it will redirect to login page
  // if user is logged in then it will fetch the user data and store it in redux store)
  return (
   <div className="w-100% min-h-screen body_bg">
   <Nav premiumUser={premiumUser}/>
   <Outlet context={{ premiumUser, setPremiumUser }} />
   {/* <Footer/> */}
   </div>
  )
}

export default Body
