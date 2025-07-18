import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

const Profile = () => {
  const userData=useSelector(store=>store.user);
  //  let [popUp,setpopUp]=useState(false);
  // const {firstName,lastName,role,age,gender,skills,photoUrl}=userData
  console.log(userData)
  const { premiumUser } = useOutletContext(); 
  let navigate=useNavigate(); 
  return (userData?
      <div>
        {/* <a href="mailto:someone@example.com">someone@example.com</a> */}

        <div className="flex items_center justify-center px-2 pb-3">
          <div className={`flex flex-col mt-10 profile_border py-10 px-3 lg:px-10 md:px-7 realtive w-220 ${ premiumUser?.membershipType==="VIP"?"VIP_bg":""} `} >
              <h1 className="text-xl lg:text-2xl font-bold your_profile -mb-10 absolute -top-5  lg:-top-2 text-white">Your Profile </h1>
              {/* <h1 className="text-xl lg:text-2xl  -mb-10 absolute right-20 ">Your Profile </h1> */}
            <div className="flex p-4 relative">
              {premiumUser?.isPremium&&<h1 className="text-[12px] font-bold absolute right-5 top-2"><span className="text-white font-bold bg-[#0c7ff2] px-4 py-[4px] rounded-lg">{premiumUser.membershipType==="VIP" ? "VIP Access" : "Pro Access" }</span></h1>}
              <div className="flex w-full items-center justify-center ">
                <div className="flex flex-col items-center gap-4">
                  {/* <h1>Your Profile</h1> */}
               <div className="rounded-full w-32 h-32 bg-cover  profile_img">
                    <img src={userData.photoUrl} alt="" className="rounded-full object-contain w-full h-full"/>
                    <div className="edit_profile_icon tooltip font-bold tooltip-info bg-red-900 " data-tip="Edit Profile" ><i className="fa-solid fa-user-pen text-xl ml-1" onClick={()=>navigate("/devTinder/Profile/Edit")}></i></div>
                  </div>
                  <div className="text-center ">
                    <p className="text-[20px] lg:text-[22px] font-bold text_shadow name mb-2">{userData.firstName+" "+userData.lastName} 
                      {premiumUser?.isPremium && <span className="inline-flex ml-2 bg-blue-500 rounded-full p-1"><i className="fa-solid fa-check text-[12px]"></i></span>}
                    </p>
                    <p className=" text-sm lg:text-base  text_shadow font-bold !text-white">{userData.role}</p>
                    <p className="text-sm lg:text-base truncate-3-lines font-bol  mt-1">{userData.about}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-20">
              <p className="px-4  text-[18px] lg:text-[20px] font-bold text-[#0d141c] light_shado text-white !text-gray-300">Age : <span className="">{userData.age?userData.age:" "}</span></p>
              <p className="px-4 text-[18px]  lg:text-[20px] font-bold text-[#0d141c] light_shado text-white !text-gray-300">Gender : {userData.gender}</p>
            </div>
            {/* Skills */}
            <h2 className="px-4 pb-3 pt-5 text-[18px]  lg:text-[20px] font-bold text-[#0d141c] light_shado text-white !text-gray-300">Skills : </h2>
            {userData && userData.skills.length>0 ?
            <div className="flex flex-wrap gap-3 px-3 py-0 lg:p-3">
              {userData.skills.map((skill,index) => (
                <div key={index} className="h-7 lg:h-8 rounded-lg bg-[#e7edf4] px-4 flex items-center box_shadow ">
                  <p className="text-sm font-medium text-[#0d141c] ">{skill}</p>
                </div>
              ))}
            </div>
            :<p className="text-base font-bold text-[rgb(120,113,113)] ml-8">Please add your skills</p>}

            <h2 className="px-4 pb-3 pt-5 text-[18px]  lg:text-[20px] font-bold text-white !text-gray-300 light_shado">Email :  <span className="text-[18px] text-white !text-gray-300">{userData.email}</span></h2>
          </div>
        </div>
      </div>
    :<p className="pl-5">Loading...</p>
  );
};

// export const userData=userData;
export default Profile;

