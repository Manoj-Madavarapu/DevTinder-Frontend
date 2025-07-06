import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Body from './Components/Body.jsx';
const Login=lazy(()=>import("./Components/Login.jsx"))
// import Login from './Components/Login.jsx'
const SignUp=lazy(()=>import("./Components/SignUp.jsx"))
// import SignUp from './Components/SignUp.jsx';
const Profile=lazy(()=>import("./Components/Profile.jsx"))
// import Profile from './Components/Profile.jsx'
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
const Feed=lazy(()=>import("./Components/Feed.jsx"))
// import Feed from './Components/Feed.jsx';
const EditProfile=lazy(()=>import("./Components/EditProfile.jsx"))
// import EditProfile from './Components/EditProfile.jsx';
const Connections=lazy(()=>import("./Components/Connections.jsx"))
// import Connections from './Components/Connections.jsx';
const RequestSend=lazy(()=>import("./Components/RequestSend.jsx"))
// import RequestSend from './Components/RequestSend.jsx';
const PeopleProfile=lazy(()=>import("./Components/PeopleProfile.jsx"))
// import PeopleProfile from "./Components/PeopleProfile.jsx"
// import Request from './Components/Request.jsx';
const Request=lazy(()=>import("./Components/Request.jsx"))
const App = () => {
  return (
    <div>
     <Provider store={appStore}>
      <BrowserRouter>
      <Suspense fallback={<div className="text-white p-5">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/devTinder" element={<Body/>}>
          <Route path="/devTinder/login" element={<Login/>}></Route>
          <Route path="/devTinder/sign-up" element={<SignUp/>}></Route>
          <Route path="/devTinder/profile" element={<Profile/>}></Route>
          <Route path="/devTinder/feed" element={<Feed/>}></Route>
          <Route path="/devTinder/Profile/Edit" element={<EditProfile/>}></Route>
          <Route path="/devTinder/connections" element={<Connections/>}></Route>
          <Route path="/devTinder/requests-recieved" element={<Request/>}></Route>
          <Route path="/devTinder/Connection-requests/send" element={<RequestSend/>}></Route>
          <Route path="/devTinder/usersProfile/:name" element={<PeopleProfile/>}></Route>
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