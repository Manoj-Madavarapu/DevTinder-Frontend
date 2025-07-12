import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

const SwipeCard = ({ user, onSwipeEnd,index,feedData }) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const {photoUrl,firstName,lastName,gender,age,about,role}=user

//   this funtion is used to call the swipeEnd funtion abased on the swiping(how much we move the card towards left or right)
  const handleDragEnd = async (_, info) => {
    if (info.offset.x > 250) {
        // Right swipe
      await onSwipeEnd('right', user);
    } else if (info.offset.x < -250) {
      // Left swipe
      await onSwipeEnd('left', user);
    } else {
      controls.start({ x: 0 }); // Reset if not enough swipe
    }
  };

  return (
    <motion.div
      drag="x"
      style={{ x }}
      className={`absolute flex flex-col max-height-70 touch-none z-1
        ${index === feedData.length-1 ? "translate-x-[15px] translate-y-[12px]" : ""}  
        ${index === feedData.length-2 ? "translate-x-[10px] translate-y-[8px]" : ""}
        ${index === feedData.length-3 ? "translate-x-[5px] translate-y-[4px]" : ""}
        ${index === feedData.length-4 ? "translate-x-[1px] translate-y-[1px]" : ""}
        `}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileTap={{ scale: 1.05 }}
    //  
      transition={{ type: 'spring', stiffness: 300 }}
    >
    <div className="card bg-white image-full  w-full min-w-[300px] lg:min-w-[360px]  h-[460px] card_shadow2 h-[460px] overflow-hidden relative">
      <figure className='relative'>
        <img src={photoUrl} alt="image"  className='card_img image-full w-full h-full min-width-[300px] lg:min-w-[360px]   max-height-70 object-cover !brightness-35 '/>
      </figure>
      <div className="absolute  bottom-0 flex flex-col  p-4 sm:p-4 md:p-5">
        <h2 className="card-title text-3xl mb-3">{firstName} {lastName}</h2>
         <h2 className="font-bold line-clamp-3">{role}</h2>
        { age && gender && <p className='my-1'>{age +", "+ gender}</p>}
        <p className='line-clamp-3 overflow-hidded'>{about}</p>
      </div>
    </div>
    </motion.div>
  );
};
export default SwipeCard;



// motion.div
// This is a special version of the div from Framer Motion, which lets you animate, drag, and control it.
//  drag="x"
// This makes the element draggable only along the X-axis (left/right). Equivalent to:
// state={x}
// this x tracks the position of a card and used to apply the style acording to it
//  whileTap={{ scale: 1.05 }}
// this si use dto zoom on tap 
//   transition={{ type: 'spring', stiffness: 300 }}
// this is relted to swiping css effect
// onDragEnd={handleDragEnd}
// This function is called when the user releases the card after dragging. You check how far it was dragged (info.offset.x) and:
// Swipe right → send connection
// Swipe left → ignore