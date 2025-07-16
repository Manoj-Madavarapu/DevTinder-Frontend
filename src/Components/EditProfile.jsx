import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Error from "./Error"
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const userData=useSelector(store=>store.user)
//   console.log(userData)
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [role,setRole]=useState("");
  const [age,setAge]=useState("");
  const [gender,setGender]=useState("");
  const [skills, setSkills] = useState(  userData?.skills?.length ? userData.skills.join(", ") : "");
  const [about, setAbout] = useState("");
  const [image,setImage]=useState("");
  const [error,setError]=useState(false)
  const [upadting,setUpdating]=useState(false);
  const maxAboutLength = 500;
  const dispatch=useDispatch()
  let navigate=useNavigate();

  useEffect(() => {
    // setError(flase);
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setRole(userData.role || "");
      setAge(userData.age || "");
      setGender(userData.gender || "");
      setSkills(userData?.skills.join(", ") || [])
    // setSkills(Array.isArray(userData.skills) ? userData.skills.join(', ') : '');
      setAbout(userData.about || "");
      setImage(userData.photoUrl || "")
    }
  }, [userData]);

  const handleProfileUpadte=async ()=>{
    setUpdating(true);
    try{
        // const skillsArray = skills
        const skillsArray= (Array.isArray(skills) ? skills.join(",") : (skills || ""))
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    // console.log(skillsArray)
    if (skillsArray.length > 15) {
      alert('You can only add up to 15 skills.');
      return;
    }
        const res=await axios.patch("https://devtinder-tjp2.onrender.com/profile/edit",{
        firstName,lastName,role,age,gender,about,photoUrl:image,skills:skillsArray
    },{withCredentials:true})
    // console.log(res.data.data)
    dispatch(addUser(res.data.data))
    navigate("/devTinder/profile")
    }
    catch(err){
        setError(true)
        console.log("Error",err.message)
    }
    finally{
      setUpdating(false);
    }

  }

  if(error) return <Error/>
  return userData?(
    <div className="flex flex-col justify-center items-center w-full py-3 px-2 sm:pb-3">
      <div className='profile_border flex flex-col justify-center items-center pt-6  pb-5 px-2 sm:px-2 md:px-6 lg:px-20'>
      <h1 className="text-3xl font-bold my-1 edit_profile_title">Edit Profile</h1>
      <div className="flex flex-wrap justify-center gap-3 lg:gap-20 md:gap-10 edit_div px-3">
        <div className="w-85 md:w-80 lg:w-80">
          <label className="fieldset-legend ">First Name</label>
          <input id="firstName" type="text" value={firstName} className="input w-full" placeholder="First Name" 
          onChange={(e)=>setFirstName(e.target.value)}/>

          <label className="fieldset-legend">Last Name</label>
          <input id="lastName" type="text" value={lastName} className="input w-full" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>

          <label className="fieldset-legend">Role</label>
          <input id="role" type="text" value={role}className="input w-full" placeholder="Enter your Role" onChange={(e)=>setRole(e.target.value)}/>

          <label className="fieldset-legend">Age</label>
          <input  type="number" value={age} className="input w-full" placeholder="Enter your age" onChange={(e)=>setAge(e.target.value)}/>
        </div>

        <div className="w-85 md:w-80 lg:w-80">
          <label className="fieldset-legend">Gender</label>
          <select className=" select select_edit w-full cursor-pointer" onChange={(e)=>setGender(e.target.value)} >
            <option >{gender? gender: "Select your gender" }</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="fieldset-legend">Skills </label>
          <input
            type="text"
            value={skills}
            onChange={(e)=>setSkills(e.target.value)}
            className="input w-full"
            placeholder="e.g. React, JavaScript, Node.js"
          />

          <label className="fieldset-legend">Profile Image</label>
          {/* <input id="image" type="file" accept="image/*" className="file-input-ghost  w-full" onChange={(e)=>setImage(e.target.value)}/> */}
          <input id="image" type="input"  className="input w-full" placeholder='Please pass photo url'
           onChange={(e)=>{
            let url=e.target.value;
            if(!url.startsWith("http://") && !url.startsWith("https://")){
              url= "https://"+url;
            }
            setImage(url);
            }}/>
          <label className="fieldset-legend">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={maxAboutLength}
            rows="4"
            className="textarea w-full h-24 resize-none"
            placeholder="Tell us about yourself"
          />
          <p className="text-sm text-gray-500 text-right">{about.length}/{maxAboutLength} characters</p>
        </div>
      </div>

      <button
        className="mt-1  text-white px-6 py-2 saveChanges_btn cursor-pointer font-bold"
        onClick={()=>{handleProfileUpadte()}}
      >
        {upadting?"Updating Changes...":"Save Changes"}
      </button>
      </div>
    </div>
  ):<p>Loading...</p>
};

export default EditProfile;
