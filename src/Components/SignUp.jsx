import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const SignUp = () => {
  let [email,setEmail]=useState("manoj@gmail.com");
  let [password,setPassword]=useState("Manoj@123");
  let [firstName,setFirstName]=useState("");
  let [lastName,setLastName]=useState("");
  let [gender,setGender]=useState("");
  let [error,setError]=useState();
  let [showPassword,setShowPaassword]=useState(false);
  let [loading,setLoading]=useState(false);
  let dispatch=useDispatch();
  let navigate=useNavigate();


  let handleSignUp=async ()=>{
    setError("");
    setLoading(true);
    try{
      const res= await axios.post("https://devtinder-tjp2.onrender.com/signup",{
        firstName,
        lastName,
        email,
        password,
        gender
      },{withCredentials:true})
      // console.log(res.data)
      dispatch(addUser(res.data))
      navigate("/devTinder/profile");
    }
    catch(err){
      if(err.response.data.includes("Error E11000 duplicate key error")){
      setError("Account already existed with this email.")
      }
      else{
        setError(err.response.data)
      }
      console.error("Login failed:", err);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className='body_bg h-screen'>
      <Nav></Nav>
      <div className='flex flex-col md:flex-row items-center justify-center mt-10 px-4' >
        <img src="/images/ChatGPT Image Jun 29, 2025, 12_36_32 AM.png" alt=""  className='hidden md:block w-110 h-125 card_shadow_img '/>
        <div className="card bg-base-300 w-100 w-[97%] md:w-[90%] lg:w-[29%] sm:w-[400px]  flex flex-col justify-center card_shadow lg:pl-3 md:pl-2 pl-1 pb-3 lg:p-4 md:p-3 px-2 py-1 lg:mt-0 md:mt-0 mt-8">
              <div className="card-body w-full m-auto">
                <h1 className='font-bold text-xl mb-2'>Sign Up</h1>
                <fieldset className="fieldset  w-full flex flex-col gap-4">
                  <input type="email" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full" placeholder="Enter your First Name" />
                  <input type="email" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input w-full" placeholder="Enter your Last Name" />   
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" placeholder="Enter your Email" />
                  <p className="text-yellow-500 -my-3 mb-0 ">* To receive further updates enter valid Email</p>
                  <div className='relative'>
                  <input type={showPassword?"text":"password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full" placeholder="Enter your Password" />
                     <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"} absolute top-3 text-base -ml-7 cursor-pointer text-gray-400 z-10`} onClick={()=>setShowPaassword((prev)=>!prev)}></i>
                  </div>
                  <select defaultValue="Select Your Gender" className="select w-full max-w-full outline-none cursor-pointer" onChange={(e)=>setGender(e.target.value)}>
                    <option disabled>Select Your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  {error && <p className="text-red-500 -my-2 pr-2 ">{error}</p>}
                </fieldset>
                <button className="btn font-bold login w-full sm:w-auto mt-2" onClick={handleSignUp}>{loading ?"Please wait...":"SignUp"}</button>
                <p className='mt-1'>Already have an Account? <span className='underline font-bold text-blue-500 cursor-pointer' onClick={()=>navigate("/devTinder/login")}>Login</span></p>
              </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp