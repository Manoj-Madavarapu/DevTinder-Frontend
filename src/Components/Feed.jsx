import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCards from './UserCards';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const [popUp, setPopUp] = useState(false);
  const userData = useSelector(store => store.user);
  const feedData = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeedData = async () => {
    try {
      const res = await axios.get("https://devtinder-tjp2.onrender.com/feed", {withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Error fetching feed data:", err);
    }
  }

  useEffect(() => {
    getFeedData();
    const alreadyShownPopUp = sessionStorage.getItem("popUpShown");
    if (userData && !alreadyShownPopUp) {
      setPopUp(true);
      sessionStorage.setItem("popUpShown", "true");
    }
    const timer = setTimeout(() => {
      setPopUp(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-20 lg:mt-4 mt-8 md:body_bg ">
      {/* Greeting Text */}
      <div className="flex flex-col md:mt-10 ">
        <h1 className="text-[22px] md:text-[24px] font-bold your_connections">
          Hey, {userData?.firstName}
        </h1>
        <span className="text-[20px] md:text-[24px] font-bold your_connections mt-1">
          <span className="stop">Stop scrolling,</span> <br />
          <span className="start">Start swiping to grow smarter.</span>
        </span>
      </div>

      {/* Toast Message */}
      {popUp && (
        <div className="toast toast-top toast-center ">
          <div className="alert alert-success mt-12 lg:mt-7 md:mt-8 toast_edit bg-white border-none w-[100%] sm:w-[190px] md:w-[200px]">
            <span className="font-bold text-green-600">
              <i className="fa-solid fa-circle-check mr-2"></i> Login Successful
            </span>
          </div>
        </div>
      )}

      {/* Feed Content */}
      <div className="lg:w-1/2 sm:w-full ">
        {feedData ? (
          <UserCards feedData={feedData} />
        ) : (
          <h2 className="font-semibold text-center mt-6">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Feed;
