import React from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const DevTinder = () => {
  let navigate=useNavigate()
  return (
    <>
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden body_bg" >
       <Nav></Nav>
      <div className="flex flex-col h-full flex-grow px-10 sm:px-10 md:px-20 lg:px-40 py-5 justify-center text-white mb-5">
        <div className="flex flex-col flex-1 max-w-[960px] w-full text-white">
          <div>
            <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white rounded-xl min-h-[218px] h-[230px]"
              // style={{
              //   backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDm-mZq-j-OnS67S7CqZNy2qHaD1z_k7WlVj9ZWrZz4X7kzuOB3e4Je_0ep0wh5XzW2hZAAh-oI5uX4DILaLkGf7WeYsusYlZ1Gf_78Thg1lpez_KCh4SogEnPr2gqavh5Fv5QcG-vHbqBn6JFT04cddtjEvL4VUW2PoE8jqRymnr9vd1a7Qyyg3sRgS29Wd8qjUIzOYY3YPo21Plm4GCP0eBATSfzhn7-SpTAE1KxFJ5Uls50YX2-RgIRj88toD1xVccQ9BoLRGSg")`,
              // }}
              >
              <img src="images/ChatGPT Image Jul 1, 2025, 04_47_51 PM.png" alt="" className="w-full h-full brightness-90 contrast-95"/>
              {/* <img src="public/images/DevTinder_ Connecting Ideas and People.png" alt="" className="w-300 h-full object-fit"/> */}
            </div>
          </div>
          <h1 className=" text-[28px] sm:text-[32px] md:text-[34px] font-bold text-center pt-6 pb-1 welcome"> Welcome to DevTinder </h1>
          <h2 className=" text-[25px] font-bold text-center pb- highlight !text-white">Connect with People Who Speak Your Thoughts.</h2>
          <p className=" text-base  text-center px-4 pt-1 font-bold">
            DevTinder is the place where code meets collaboration. Whether
            you're a frontend wizard, backend architect, full-stack explorer, or
            just starting your dev journey — DevTinder helps you discover,
            match, and connect with other developers based on interests, skills,
            and goals.
          </p>
          <div className="flex flex-col gap-10  py-8">
            <div className="flex flex-col gap-1">
              <h1 className=" text-[26px] sm:text-[32px] md:text-[32px] font-bold max-w-[720px] highlight">Connect, Collaborate, Create</h1>
              <p className="text-base font-bold max-w-[720px]"> Network with Purpose</p>
            </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] sm:grid-cols-2 md:grid-cols-3 gap-3 -mt-4">
            {/* Card 1 */}
            <div className="flex flex-col gap-3 border border-[#e5e0dc] bg-white p-4 rounded-lg">
              <div className="text-[#181411]">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight text-[#181411]">
                  Find Coding Partners
                </h2>
                <p className="text-sm font-normal leading-normal text-[#887263]">
                  Find coding partners for your next project or hackathon.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col gap-3 border border-[#e5e0dc] bg-white p-4 rounded-lg">
              <div className="text-[#181411]">
                <i className="fa-solid fa-users"></i><i className="fa-solid fa-users"></i>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight text-[#181411]">
                  Grow Your Network
                </h2>
                <p className="text-sm font-normal leading-normal text-[#887263]">
                  Expand your professional network with like-minded people.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col gap-3 border border-[#e5e0dc] bg-white p-4 rounded-lg">
              <div className="text-[#181411]">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight text-[#181411]">
                  Learn From Best
                </h2>
                <p className="text-sm font-normal leading-normal text-[#887263]">
                  Learn from experienced developers and improve your skills.
                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="flex justify-center pb-10 text-center">
            <button className="btn btn-primary get-started" onClick={()=>navigate("/devTinder/login")}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default DevTinder;



// import React from 'react';
// import Nav from './Nav.jsx';
// import Footer from './Footer.jsx';
// import { useNavigate } from 'react-router-dom';
// import Body from './Body.jsx'; // Assuming

// const Home = () => {
//   let navigate = useNavigate();
//   return (
//     <div>
//       <div>
//       <div className=" bg-white w-100% h-100% body_bg">
//           <div className="text-white  w-100% flex hero-two h-100% body_bg ">
//             <div className='w-200 min-w-100'>
//               <img src="public/images/ChatGPT Image Jun 23, 2025, 07_00_18 PM.png" alt="image"  className='w-200 h-193.5 z-1 -mt-20'/>
//               {/* <img src="public/images/can you generate a images of like that i can use that image in my project cover page that image should contain the as deveopers connecting ecat other .jpg" alt="" className='w-185 h-150'/> */}
//             </div>
//             <div className="w-150 mx-auto  flex flex-col items-start justify-center  tracking-wide body_bg">
//               <h1 className="text-5xl font-bold text-blue-900 tracking-tight text-start welcome"><span className='text-white welcome2'>Welcome to,<br /> </span>DevTinder</h1>
//               <h3 className='text-lg leading-[1.5] tracking-wide font-bold mt-8 -mb-3 box-shadow'>Connect with Developers Who Speak your code. <br />DevTinder is the place where code meets collaboration.</h3>
//               <p className="pt-6 pb-3 text-base leading-[1.5]tracking-wide box-shadow">
//                 Whether you're a frontend wizard, backend architect, full-stack explorer, or just starting your dev journey — devTinder helps you discover, match, and connect with other developers based on interests, skills, and goals.
//               </p>
//              <div className='flex flex-col justify-between gap-2 text-base font-bold highlight mt-3 text-base'>
//                <p className='mr-3'><i className="fa-solid fa-handshake-angle mr-2"></i>Find Coding Partners</p>
//                <p className='mr-3'><i className="fa-solid fa-globe mr-2"></i>Grow Your Network </p>
//                <p><i className="fa-solid fa-crown mr-2"></i>Learn From Best</p>
//              </div>
//             {/* <h3 className='text-lg leading-[1.3] font-bold mt-4 '>Welcome to the new era of developer networking.</h3>
//              <div className='buttons flex -mt-2'>
//                <button className='btn1'>Swipe</button>
//               <button className='btn2'>Connect</button>
//               <button className='btn3'>Build</button>
//              </div> */}
//               <button className="btn btn-primary get-started mt-7" onClick={()=>navigate("/devTinder/login")}>Get Started</button>
//             </div>
//           </div>
//         </div> 
//     </div>
//     </div>
//   )
// }

// export default Home;

