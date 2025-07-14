import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [email,setEmail]=useState("manojmadavarapu7@gmail.com");
  let [password,setPassword]=useState("Manoj@123");
  let [showPassword,setShowPaassword]=useState(false);
  let [isLogin,setIsLogin]=useState(true);
  let [error,setError]=useState();
  let [loading,setLoading]=useState(false);
  
  let dispatch=useDispatch();
  let navigate=useNavigate();


  let handleLogin=async ()=>{
    try{
      setLoading(true);
      const res= await axios.post("https://devtinder-tjp2.onrender.com/login",{
        // email:email  // this is the same as above line
        email,
        password,
      },{withCredentials:true})
      // console.log(res.data)
      dispatch(addUser(res.data))
      // here if we are making a call to another doamin then you will get CORS error to avoid this install cors(npm i cors) in backend and call the cors() middleare in your backend (app.js) file
      // remember to pass the withCredentials:true to get the cookie in browser
      navigate("/devTinder/feed");
    }
    catch(err){
      // setError(err.response.data)
      // console.error("Login failed:", err);
      const errorMsg = err.response?.data || "Something went wrong!";
      setError(errorMsg);
      console.error("❌ Login failed:", errorMsg);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <>
      <h1 className='absolute left-4 top-23 md:left-20 md:top-25 font-bold cursor-pointer text-[16px] text-sm sm:text-base back px-4'onClick={()=>navigate("/")}><i className="fa-solid fa-arrow-left"></i> Go back to Home Page</h1>
      <div className='flex  items-center justify-center mt-20 ' >
        <img src="/images/Collaboration at devTinder Office.png" alt=""  className='hidden md:block w-100 h-100 card_shadow_img'/>
        <div className="card bg-base-300 w-96 h-100  flex flex-col justify-center py-8 card_shadow pl-3">
              <div className="card-body">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email Id</legend>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Enter your Email" />
                  <p className="label"></p>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  {/* <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input mb-6" placeholder="Enter your Password" /> */}
                  <div className='relative'>
                  <input type={showPassword?"text":"password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input mb-6 " placeholder="Enter your Password" />
                     <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"} absolute top-3 text-base -ml-8 cursor-pointer text-gray-400 z-10`} onClick={()=>setShowPaassword((prev)=>!prev)}></i>
                  </div>
                  <p className="label text-red-500 -mt-5 mb-2">{error}</p>
                </fieldset>
                <button className="btn font-bold login w-full sm:w-auto" onClick={handleLogin}>{loading? "Please wait...":"Login"}</button>
                <p className='mt-2'>Don't have an Account? <span className='underline font-bold text-blue-500 cursor-pointer' onClick={()=>navigate("/devTinder/sign-up")}> Sign Up</span></p>
              </div>
        </div>
      </div>
    </>
  )
}

export default Login
 