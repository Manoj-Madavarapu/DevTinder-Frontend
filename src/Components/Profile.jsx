import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userData=useSelector(store=>store.user);
  //  let [popUp,setpopUp]=useState(false);
  // const {firstName,lastName,role,age,gender,skills,photoUrl}=userData
  console.log(userData)
  let navigate=useNavigate(); 
  return (userData?
      <div>
        <div className="flex items_center justify-center px-2">
          <div className="flex flex-col mt-10 profile_border py-10 px-3 lg:px-10 md:px-7 realtive w-220" >
              <h1 className="text-xl lg:text-2xl font-bold your_profile -mb-10 absolute -top-5  lg:-top-2 ">Your Profile </h1>
            <div className="flex p-4
            ">
                {/* <h1 className="text-3xl font-bold your_profile">Your Profile</h1> */}
              <div className="flex w-full items-center justify-center ">
                <div className="flex flex-col items-center gap-4">
                  {/* <h1>Your Profile</h1> */}
               <div className="rounded-full w-32 h-32 bg-cover  profile_img">
                    {/* <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaV0nv8O3-AxGRxwv3o6dH_dVRy0vpDFeIZbnno1Bmf0HiZAee1AfIJnulwVa1bNcenmOwZoUaOqWeMVWL-2EiFtZGiWAb2ZFbu9g2OpQEULjrRaERPLHK1Shj24sJ0KFFKdADB05crI4YCGumknYOpOEXEN5PWp7SxIzE8IfuQp7K1xFrCTjD3F0eqVyIEgEi93kiEOtOOJdCt8CxBw1CodhlMtehlrXYOZnfHmHWKRH2sTBfi7LiSh7ATrGqKQ8zZr_wPFRIQQnL" alt="" className="rounded-full object-cover"/> */}
                    <img src={userData.photoUrl} alt="" className="rounded-full object-contain w-full h-full"/>
                    <div className="edit_profile_icon tooltip font-bold tooltip-info" data-tip="Edit Profile" ><i className="fa-solid fa-user-pen text-xl" onClick={()=>navigate("/devTinder/Profile/Edit")}></i></div>
                  </div>
                  <div className="text-center ">
                    <p className="text-[20px] lg:text-[22px] font-bold  text_shadow name">{userData.firstName+" "+userData.lastName}</p>
                    <p className=" text-sm lg:text-base  text_shadow font-bold">{userData.role}</p>
                    <p className="text-sm lg:text-base truncate-3-lines font-bold text-black mt-1">{userData.about}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-20">
              <p className="px-4  text-[18px] lg:text-[20px] font-bold text-[#0d141c] light_shadow">Age : <span className="">{userData.age?userData.age:" "}</span></p>
              <p className="px-4 text-[18px]  lg:text-[20px] font-bold text-[#0d141c] light_shadow">Gender : {userData.gender}</p>
            </div>
            {/* Skills */}
            <h2 className="px-4 pb-3 pt-5 text-[18px]  lg:text-[20px] font-bold text-[#0d141c] light_shadow">Skills : </h2>
            {userData && userData.skills.length>0 ?
            <div className="flex flex-wrap gap-3 px-3 py-0 lg:p-3">
              {userData.skills.map((skill,index) => (
                <div key={index} className="h-7 lg:h-8 rounded-lg bg-[#e7edf4] px-4 flex items-center box_shadow">
                  <p className="text-sm font-medium text-[#0d141c] ">{skill}</p>
                </div>
              ))}
            </div>
            :<p className="text-base font-bold text-[rgb(120,113,113)] ml-8">Please add your skills</p>}
            <h2 className="px-4 pb-3 pt-5 text-[18px]  lg:text-[20px] font-bold text-black light_shadow">Email : <span className="text-[18px] ">{userData.email}</span></h2>
          </div>
        </div>
      </div>
    :<p className="pl-5">Loading...</p>
  );
};

// export const userData=userData;
export default Profile;

