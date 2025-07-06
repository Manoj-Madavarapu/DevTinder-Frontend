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
  const maxAboutLength = 250;
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
        const res=await axios.patch("http://localhost:4000/profile/edit",{
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

  }

  if(error) return <Error/>
  return userData?(
    <div className="flex flex-col justify-center items-center w-full py-3 px-2 ">
      <div className='profile_border flex flex-col justify-center items-center pt-6  pb-5 px-2 md:px-6 lg:px-20'>
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
          <input id="image" type="input"  className="input w-full" placeholder='Pass PhotUrl' onChange={(e)=>setImage(e.target.value)}/>
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
        onClick={()=>{handleProfileUpadte();handleProfileUpadte2()}}
      >
        Save Changes
      </button>
      </div>
    </div>
  ):<p>Loading...</p>
};

export default EditProfile;



// import React from 'react'
// const EditProfile = () => {
//   return (
// <div className='flex  flex-col justify-center items-center h-100% w-100% '>
//     <h1 className='text-3xl font-bold my-5 '>Edit Profile</h1>
//      <div className='flex'>
//         <div className='mx-5 w-100 '>
//          <legend className="fieldset-legend">FirstName</legend>
//          <input type="text" className="input bg-white" placeholder="FirstName" />
//          <legend className="fieldset-legend">LastName</legend>
//          <input type="text" className="input" placeholder="LastName" />
//          <legend className="fieldset-legend">Role</legend>
//          <input type="text" className="input" placeholder="Enter your Role" />
//          <legend className="fieldset-legend">Age</legend>
//          <input type="number" className="input" placeholder="Enter your age" />
//        </div>
//         <div className='w-100'>
//          <legend className="fieldset-legend">Gender</legend>
//          <input type="text" className="input" placeholder="Type here" />
//          <legend className="fieldset-legend">Skills</legend>
//          <input type="text" className="input" placeholder="Type here" />
//          <legend className="fieldset-legend">Image</legend>
//          <input type="text" className="input" placeholder="Type here" />
//          <legend className="fieldset-legend">About</legend>
//          <input type="text" className="input" placeholder="Type here" />
//        </div>
//      </div>
// </div>
//   )
// }
// export default EditProfile



// import React from "react";

// const EditProfile = () => {
//   return (
//     <div
//       className="relative flex min-h-screen flex-col overflow-x-hidden"
//     >
//       <div className="layout-container flex h-full grow flex-col">
//         <div className="px-40 flex flex-1 justify-center py-5">
//           <div className="flex flex-col w-full max-w-[512px] py-5">
//             <p className="text-[#101419] text-[32px] font-bold leading-tight px-4">Edit Profile</p>
//             {['First Name', 'Last Name', 'Age', 'Skills', 'Role'].map(label => (
//               <div key={label} className="flex flex-wrap items-end gap-4 px-4 py-3">
//                 <label className="flex flex-col min-w-40 flex-1">
//                   <p className="text-[#101419] text-base font-medium pb-2">{label}</p>
//                   <input
//                     type="text"
//                     className="form-input w-full resize-none rounded-xl text-[#101419] bg-[#e9edf1] h-14 p-4 text-base focus:outline-0 focus:ring-0 border-none"
//                   />
//                 </label>
//               </div>
//             ))}

//             <div className="flex flex-wrap items-end gap-4 px-4 py-3">
//               <label className="flex flex-col min-w-40 flex-1">
//                 <p className="text-[#101419] text-base font-medium pb-2">Gender</p>
//                 <select className="form-input w-full rounded-xl bg-[#e9edf1] h-14 p-4 text-base text-[#101419] focus:outline-0 border-none">
//                   <option value=""></option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </label>
//             </div>

//             <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Profile Image</h3>
//             <div className="flex w-full p-4">
//               <div className="w-full aspect-[2/3] rounded-xl">
//                 <div
//                   className="w-full bg-center bg-no-repeat bg-cover rounded-xl h-72"
//                   style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ00at7FEDElqpkq9z9aAIpaJ-OW-NAhvfvlAio6YJ18v3WaNzFPtNu1a-IxVDBZPsOWlsa5_l_d4Ya-Y8Woxlh232_l75HOCbUWWck_YU1RFjuzYQ_vO6gqYVOradcfmZnp4SgulpNY0DbqQF2AWXW0vhKkEmGQ8fhJt9eOOvVqvPJ9VTEK3vi73SSyTXpl0WN6e6eLorLOUcZHLouoDeDvMqet4pS-fIMMtwo_prpvwhiwnnUQJA-bkCnTD1c9t6ZA1PUf5wKPYh')` }}
//                 ></div>
//               </div>
//             </div>
//             <div className="flex px-4 py-3">
//               <button className="rounded-xl h-10 px-4 bg-[#e9edf1] text-[#101419] text-sm font-bold">Change Image</button>
//             </div>

//             <div className="flex flex-wrap items-end gap-4 px-4 py-3">
//               <label className="flex flex-col min-w-40 flex-1">
//                 <p className="text-[#101419] text-base font-medium pb-2">About</p>
//                 <textarea className="form-input w-full resize-none rounded-xl bg-[#e9edf1] p-4 min-h-36 text-base text-[#101419] focus:outline-0 border-none" />
//               </label>
//             </div>

//             <div className="flex px-4 py-3 justify-end">
//               <button className="rounded-xl h-10 px-4 bg-[#d2e2f3] text-[#101419] text-sm font-bold">Save Changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

