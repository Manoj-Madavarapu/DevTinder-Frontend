import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Body from './Components/Body.jsx';
const Login=lazy(()=>import("./Components/Login.jsx"))
const SignUp=lazy(()=>import("./Components/SignUp.jsx"))
const Profile=lazy(()=>import("./Components/Profile.jsx"))
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import Terms from './Components/Terms.jsx';
import PricingPolicy from './Components/PricingPolicy.jsx';
import ShippingPolicy from './Components/ShippingPolicy.jsx';
import RefundPolicy from './Components/RefundPolicy.jsx';
import PrivacyPolicy from './Components/PrivacyPolicy.jsx';
import AboutUs from './Components/About.jsx';
const Feed=lazy(()=>import("./Components/Feed.jsx"))
const EditProfile=lazy(()=>import("./Components/EditProfile.jsx"))
const Connections=lazy(()=>import("./Components/Connections.jsx"))
const RequestSend=lazy(()=>import("./Components/RequestSend.jsx"))
const PeopleProfile=lazy(()=>import("./Components/PeopleProfile.jsx"))
const Request=lazy(()=>import("./Components/Request.jsx"))
const Premium=lazy(()=>import('./Components/Premium.jsx'));
const Chat=lazy(()=>import("./Components/Chat.jsx"));
const App = () => {
  return (
    <div>
     <Provider store={appStore}>
      <BrowserRouter>
      <Suspense fallback={<div className="text-white p-5">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/devTinder/login" element={<Login/>}></Route>
        <Route path="/devTinder/sign-up" element={<SignUp/>}></Route>
        <Route path="/about-and-ContactUs" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/pricing-policy" element={<PricingPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/devTinder" element={<Body/>}>
          <Route path="/devTinder/profile" element={<Profile/>}></Route>
          <Route path="/devTinder/feed" element={<Feed/>}></Route>
          <Route path="/devTinder/Profile/Edit" element={<EditProfile/>}></Route>
          <Route path="/devTinder/connections" element={<Connections/>}></Route>
          <Route path="/devTinder/requests-recieved" element={<Request/>}></Route>
          <Route path="/devTinder/Connection-requests/send" element={<RequestSend/>}></Route>
          <Route path="/devTinder/usersProfile/:name" element={<PeopleProfile/>}></Route>
          <Route path="/devTinder/Premium-membership" element={<Premium/>}></Route>
          <Route path="/devTinder/Chating/:targetUserId" element={<Chat/>}></Route>
        </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
     </Provider>
      
    </div>
  )
}

export default App

// In above <Provider> is used to make the storeData available across all the components for global state management