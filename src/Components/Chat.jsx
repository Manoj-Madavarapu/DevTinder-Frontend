import axios from "axios";
import { div } from "framer-motion/m";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

let Chat=()=>{
    let [messages,setMessages]=useState([]);
    // console.log(messages)
    let [newMessage,setNewMessage]=useState("");
    let location=useLocation()
    let userData=location.state
    // console.log(userData)
    const {targetUserId}=useParams()
    // console.log(targetUserId)
    const loginUser=useSelector((store)=>store.user)
    const userId=loginUser?._id
    // console.log(userId)

    // making an api call to get the old chat messages from chat Database
    let fetchChatMessages=async ()=>{
      try{
        let chat=await axios.get(`https://devtinder-tjp2.onrender.com/chat/${targetUserId}`,{withCredentials:true});
        // console.log(chat.data.messages);

        let chatMessages=chat.data.messages.map(msg=>{
          let {senderId,text,createdAt}=msg
          return {
            firstName:senderId?.firstName,
            senderId:senderId._id,
            newMessage:text,
            createdAt
          }
        })
        setMessages(chatMessages)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchChatMessages()
    },[messages])

    useEffect(()=>{
      if(!loginUser) return;
      const socket=io("https://devtinder-tjp2.onrender.com")
      // as soon as my page loads, socket connection is made and joinChat event is emitted 
      socket.emit("joinChat",{
        firstName:loginUser?.firstName,
        userId,
        targetUserId
      })
      // socket.emit()==>is use to send the events(here we are sending to server) 
      // socket.on() is used to receive the messages

      socket.on("messageReceived",({firstName,newMessage,userId,targetUserId})=>{
          // console.log(firstName+" : "+newMessage)
          setMessages((messages)=>[...messages,{firstName,senderId:userId,targetUserId,newMessage}])
      })
      // in above we are receiving all the messages from backend from both the users and storing them in messages soo thst we show them in chat box

      return ()=>{
        socket.disconnect();
        // this is used to disconnect the socket when ever it unmounts
      }

    },[loginUser,targetUserId])

    const sendMessage =()=>{
      const socket=io("https://devtinder-tjp2.onrender.com")
      socket.emit("sendMessage",{
        firstName:loginUser?.firstName,
        userId,
        targetUserId,
        newMessage
      })
      setNewMessage("")
    }
    // in above we are making an soket connection and sending the messages to backend  by using sendMessage event
    // socket.emit() is sued to send events
    
    return(
    <>
    <div className="text-white flex flex-col lg:flex-row gap-5 lg:gap-0  py-5 px-4 ">
      {/* <h1>"Great ideas start with a simple 'Hello'</h1> */}
        <h1 className="text-xl lg:text-2xl md:text-2xl your_connections w-80 lg:ml-20 lg:mt-3 md:mt-2 md:mb-2 -mt-2 font-bold great">Great Ideas start with <br />a simple 'Hello'. <br /><span className="text-base lg:text-xl text-white">Start Your Conversation....</span></h1>
      <div className="w-full lg:max-w-3xl md:max-w-3xl bg-gray-700 bg-opacity-20 backdrop-blur-md rounded-2xl shadow-xl px-5 pt-3 py-6 chat_div">
         {/* Chat Header */}
        <div className="flex items-center gap-2 mb-1 border_bottom">
           <img
            src={userData.photoUrl}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-whit object-contain "
          />
          <h1 className="text-[16px] font-bold">
            {userData.firstName + " " + userData.lastName}
            {userData?.isPremium && <span className="inline-flex ml-3 bg-blue-500 rounded-full  p-1"><i className="fa-solid fa-check text-[10px]"></i></span>}
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="space-y-1 max-h-[600px] h-[500px] md:h-[400px] lg:h-[440px] overflow-y-auto scrollbar-hide">
        {messages.map((msg,index)=>(
          msg.senderId===userId ?(
          // Right side Message(loginuser messages)
          <div className="chat chat-end" key={index}>
            <div className="chat-header text-white/80">You</div>
            <div className="chat-bubble bg-blue-300 text-black flex relative">
             <div className="mr-10"> {msg.newMessage} </div>
              <div className="flex justify-end text-[10px] text-black/70 mt-1 ml-10 absolute right-3 bottom-1">
                 {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // or false for 24-hour format
                  })}
                {/* {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} */}
              </div>
            </div>
          </div> 
          ):(
            // left side Message(the other memeber messages on left side)
          <div className="chat chat-start" key={index}>
            <div className="chat-header text-white/80">{msg.firstName}</div>
            <div className="chat-bubble bg-white text-black relative">
              <div className="mr-10"> {msg.newMessage}</div>
              <div className="flex justify-end text-[10px] text-black/70 mt-1 ml-10 absolute right-3 bottom-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // or false for 24-hour format
                  })}
                {/* {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} */}
              </div>
            </div>
          </div>
          )    
        ))}
        </div>

        {/* Input Box */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter" && newMessage.trim()!==""){
                sendMessage();
              }
            }}
            className="flex-1 px-4 py-2 rounded-[8px] bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold  text-white cursor-pointer"
          onClick={()=>sendMessage()}
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>     
    </>
    )
}
export default Chat;