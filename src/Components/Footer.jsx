import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 bottom-0  lg:bottom-0 md:bottom-0">
         <aside>
           <p>Copyright © {new Date().getFullYear()} - All right reserved by Manoj Industries Ltd</p>

         </aside>
       </footer>     
    </div>
  )
}

export default Footer
