import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {removeUser} from "../utils/userSlice";
import ErrorPage from "./Error";
import { addUsers } from "../utils/searchStore";
// import { fetchRequest } from "./Request";

let Nav=({premiumUser})=>{
  let [searchBox,setSearchBox]=useState(false);
  let [inputValue,setInputValue]=useState("");
  let [isMobile,setIsMobile]=useState(window.innerWidth<900);
  let [loading,setLoading]=useState(false);

  let user=useSelector(store=>store.user)
  let requestData=useSelector(store=>store.request);
  let searchData=useSelector(store=>store.searchStore)
  // useselector will get the store data and amke them available in the component
  // console.log("user",user)
  let dispatch=useDispatch();
  let navigate=useNavigate()

  const searchBoxRef = useRef();
  
  // function toggleSearchBox() {
  //   if( searchBox ) {
  //     setSearchBox(false);
  //   }
  //   else {
  //     setSearchBox(true);
  //   }
  //   //  setSearchBox(searchBox ? false : true);
  // }
  
  let handleLogout=async()=>{
    setLoading(true);
    try{
       let res=await axios.post("https://devtinder-tjp2.onrender.com/logout",{},{withCredentials:true});
       dispatch(removeUser());
      //  this displatch will remove the userData from the store
      navigate("/devTinder/login");
      sessionStorage.removeItem("popUpShown");
    }
    catch(err){
      if(err.response.status===404 ){
        return <ErrorPage />;
      }
      console.error("Logout failed:", err);
    }
    finally{
       setLoading(false);
    }
  }

  let handleSearchData=async ()=>{
    if(inputValue.trim()===""){
      dispatch(addUsers([]));
      searchBox(false);
      return
    }
    try{
       const res=await axios.get(`https://devtinder-tjp2.onrender.com/users/search?q=${inputValue}`,{withCredentials:true})
       console.log(res.data)
       dispatch(addUsers(res.data));
       setSearchBox(true);
    }
    catch(err){
      console.log(err)
    }
  }

 useEffect(() => {
    const handleResize = () => {
    setIsMobile(window.innerWidth<900);
    // console.log(isMobile,window.innerWidth)
  };
  window.addEventListener('resize', handleResize);

    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchBox(false);
        setInputValue("");
      }
      // searchBoxRef.current will checks whetaher the box is present or not and in searchBoxRef.current.contains(event.target)  event.target is the actual element that was clicked. .contains() checks if the clicked element is inside the referenced element (in this case, your search box).
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

    return(
        <>
        <div className="navbar bg-base-300 bg-transparent z-6000 !px-0">
          <div className="flex-1">
            <Link  className="btn bg-transparent border-none app_logo">
                {/* <img src="public/images/ChatGPT Image Jun 19, 2025, 05_16_52 PM.png" alt="" className="mx-6  devTinder-logo"/> */}
                {/* <img src="/images/ChatGPT_Image_Jun_24__2025__03_57_26_PM-removebg-preview.png" alt="" className="mx-6  devTinder-logo" /> */}
                <h1 className="devTinder_logo_h1  md:ml-5 lg:ml-10">&lt;<span>Dev</span>Tinder&gt;</h1>
            </Link>
          </div>
          {user && <div className="flex justify-center items-center gap-1 lg:gap-5">
            {!isMobile && <div className="flex justify-center items-center text-[18px] font-bold gap-10 mt-2 cursor-pointer nav_items      hidden md:flex justify-center items-center text-sm md:text-[18px] font-bold gap-5 md:gap-10 mt-2 cursor-pointer nav_items flex-wrap z-100">
              <Link to="/devTinder/feed"> <p className="">Feed</p></Link>
              <Link to="/devTinder/connections"><p className="">Connections</p></Link>
              <Link to="/devTinder/requests-recieved"><p className="mr-5 indicator z-10">Requests
                {requestData && requestData?.length!==0 && <span className="indicator-item badge ">{requestData?.length}</span>}
              </p></Link>
            </div>}
            <div className=" text-center z-100 search_box cursor-pointer relative mt-2" ref={searchBoxRef}>
              <input type="text" placeholder="Search" className="input w-28 lg:24 md:w-auto mr-2 border-none outline-none font-bold rounded-3xl pl-4" 
              onChange={(e)=>setInputValue(e.target.value)}
              onKeyUp={handleSearchData}
              value={inputValue}
              />
              <i className="fa-solid fa-magnifying-glass mt-3 z-200  absolute right-6" onClick={handleSearchData}></i>
              {searchBox &&
              (searchData && searchData?.length>0 ?<div className="searchUser_div  w-43 max-h-40 md:w-59 md:max-h-45 lg:w-65 lg:max-h-50 absolute top-11 -left-2 overflow-y-scroll">
                  {searchData.map(x=>
                    <div className="flex gap-3 p-2 items-center  inner_div" key={x._id} onClick={()=>navigate(`/devtinder/usersProfile/${x.firstName+"-" +x.lastName}`,{state:x})}>
                      {/* here if you want you can use useParam also by specifing `/devtinder/usersProfile/${x._id}` and in peopelProfile apge use usePara to get this id from url*/}
                      <img src={x.photoUrl} alt="" className="w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 rounded-full object-cover"/>
                        <p className="font-bold text-white text-[12px] lg:text-sm md:text-sm text-left">{x.firstName+" "+x.lastName}</p>
                      </div>
                  )}
              </div>:<div className="searchUser_div absolute top-11  w-40 lg:w-60 md:w-60 mt-1 -ml-3 "><p className="m-auto font-bold inner_di lg:text-base md:text-base text-sm">No Results Found</p></div>)}
            </div>
            <div className="dropdown dropdown-end mr-2 sm:mr-4 md:mr-6 mt-2 z-2000">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className={`w-10 h-10 rounded-full ${premiumUser?.isPremium?"premiumUser":""} `}>
                  {user && <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}  className="w-full h-full object-contain"/> }
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-orange-600 rounded-box  mt-3 lg:w-52  md:w-40 sm:w-35 lg:p-2 shadow shadow-drop font-bold">
                {isMobile&&
                <li>
                   <Link to="/devTinder/feed"> <p className="text-white">Feed</p></Link>
                   <Link to="/devTinder/connections"><p className="text-white">Connections</p></Link>
                   <Link to="/devTinder/requests-recieved"><p className="mr-5 indicator z-10 text-white">Requests
                {requestData && requestData?.length!==0 && <span className="indicator-item badge ">{requestData?.length}</span>}
              </p></Link>
                </li>
                
                }
                <li>
                  <Link to="/devTinder/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li> <Link to="/devTinder/Connection-requests/send">
                     Request's Send
                  </Link></li>
                <li> <Link to="/devTinder/Premium-membership">
                    Premium Membership
                    {premiumUser?.isPremium && <span className="bg-green-500 w-5 h-5 rounded-full flex m-auto justify-center items-center"><i className="fa-solid fa-check font-bold"></i></span>}
                  </Link></li>
                <li><a onClick={handleLogout}>{loading ?"Loging out...":"Logout"}</a></li>
              </ul>
            </div>
          </div>}
        </div>
        
        </>
    )
}
export default Nav;