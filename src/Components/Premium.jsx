import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import axios from 'axios';
const Premium = () => {
  let [selectedPlan,setSelectedPlan]=useState(null);
  let [premiumUser,setPremiumUser]=useState()
  // let[loading,setLoading]=useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  // this is used to check wheather the user is having premium membership or not
  const isPremiumUser=async ()=>{
    try{
      const res=await axios.get("https://devtinder-tjp2.onrender.com/membership/verification",{withCredentials:true})
      console.log(res.data)
      setPremiumUser(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
   
   useEffect(()=>{
    isPremiumUser()
  },[]) 

  const handlePayment=async (membershipType)=>{
    setLoadingPlan(membershipType)
    setSelectedPlan(membershipType)
    alert("Please avoid payments using QRcode! we are facing some issues, use alternate payment methods")
     console.log(membershipType)
    //  setLoading(true)
    try{
      const order=await axios.post("https://devtinder-tjp2.onrender.com/payment/create",{
        membershipType
      },{withCredentials:true})
      console.log(order.data)
      setSelectedPlan(membershipType)

      const {amount,currency,orderId,notes}=order.data
      
      // this below code is related to Razopay 
      const options = {
        // key: 'rzp_test_G7L8SyvJBPB7ZD',   // this key is used in test mode of razorpay
        key:"rzp_live_Z8DXoHPzPXUtGC",
        // this key is the key id which you get from Razorpay accounts and settings(the same you use in instance of backend code) 
        amount,
        currency,
        name: 'DevTinder',
        description: `DevTinder's ${membershipType} Plan`,
        order_id: orderId,
        handler: function (response) {
          alert('Payment successful!');
          isPremiumUser()
          window.location.reload()
        },
        prefill: {
          name: notes.firstName+" "+ notes.lastName,
          email: notes.email,
          contact: '9848998489',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      //  rzp.on("payment.failed", function (response) {
      //  alert("❌ Payment failed! Please try again.");
      //  console.log("💥 Payment failed:", response.error);
      //  });
      rzp.open();

    }
    catch(err){
      console.log("Error"+err.message)
    }
    finally{
      // setLoading(false);
      setLoadingPlan(null)
    }

  }

  const availablePlans = [
    {
      name: 'Pro',
      price: '₹ 11',
      features: ['Premium Verified', 'Pro Member', 'Priority support', 'Exclusive features']
    },
    {
      name: 'VIP',
      price: '₹ 29',
      badge: 'Best Value',
      features: ['Premium Verified', 'VIP Gold Member', '24/7 priority support', 'All exclusive features']
    }
  ];

  // 💡 Determine which plans to show
  let plansToShow = [];

  if (!premiumUser?.isPremium) {
    plansToShow = availablePlans; // show both plans if he is not a premium user 
  } else if (premiumUser?.isPremium && premiumUser.membershipType === "Pro") {
    plansToShow = availablePlans.filter(plan => plan.name === "VIP"); // show VIP only if he is heving pro membership
  }

  return (
    <>
    <div className='min-h-screen flex flex-col'>
        <section className="px-3 pt-15 md:pt-13 lg:pt-8 md:py-9 lg:py-7 flex flex-1 justify-center flex-grow">
          <div className="max-w-[960px] w-full">
            <div className="bg-cover bg-center bg-no-repeat  rounded-lg text-white text-center">
              <h1 className="text-4xl font-black tracking-[-0.033em] mb-2">Unlock Premium Features</h1>
              <p className="text-base font-bold">
                Enhance your devTinder experience with exclusive benefits. Chat with more developers, boost your profile visibility, and access premium features.
              </p>
            </div>

            {premiumUser?.isPremium===true && premiumUser?.membershipType==="VIP"?
            (
            <div className="flex justify-center mt-15">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg rounded-2xl p-6  w-[90%] max-w-xl text-white text-center">
                <h2 className="text-2xl font-bold mb-4 text-black ">🎉 You're a VIP Premium User!</h2>
                <p className="text-[18px] font-bold text-black">
                  Thank you for supporting <span className="">DevTinder</span>. 
                  As a VIP member, you have full access to all exclusive features, 24/7 priority support, and top visibility.
                </p>
                <div className="mt-8 mb-4">
                  <span className="bg-black text-yellow-300 font-semibold px-5 py-3 rounded-full shadow-sm text-white">
                    Membership: VIP
                  </span>
                </div>
              </div>
            </div>        
            )
            : 
            <>
            <h2 className="text-[22px] font-bold tracking-[-0.015em] px-4 pt-2 pb-3">{premiumUser?.membershipType==="Pro"?"Upgrade to VIP":"Choose Your Plan"}</h2>
            <div className="flex justify-center min-w-250px gap-4 px-4 py-3 pb-10">
              {
              plansToShow.map((plan, index) => (
                <div key={index} className={`flex flex-col w-90 gap-4 border border-[#dbe0e6] rounded-lg p-6 lg:pb-15 bg-white 
                 ${selectedPlan === plan.name
                      ? "activePayment_card"
                      : ""}
                `}>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <h1 className="text-base font-bold text-[#111418]">{plan.name}</h1>
                      {plan.badge && <span className="text-white text-xs font-medium bg-[#0c7ff2] px-3 py-[3px] rounded-lg">{plan.badge}</span>}
                    </div>
                    <p className="text-4xl font-black tracking-[-0.033em] text-[#111418]">{plan.price}</p>
                    <span className="text-base font-bold text-[#111418]">Lifetime Access</span>
                  </div>
                  <button className={`h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold rounded-lg cursor-pointer  
                  ${selectedPlan === plan.name
                      ? '!bg-[rgb(228,171,65)] '
                      : 'bg-[#f0f2f5] '}`} 
                    onClick={()=>handlePayment(plan.name)}>
                    {/* {loading ? "Please wait..."  : (selectedPlan===plan.name?"Selected":premiumUser?.membershipType==="Pro"?"Upgrade":"Select")} */}
                     {loadingPlan === plan.name
                      ? "Please wait..."
                      : selectedPlan === plan.name
                      ? "Selected"
                      : premiumUser?.membershipType === "Pro"
                      ? "Upgrade"
                      : "Select"}
                    </button>
                  <div className="flex flex-col gap-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex gap-3 text-[13px] text-[#111418]">
                        <i className="fa-solid fa-check"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </>
            }
          </div>
        </section>
      </div>
      <Footer/>
      </>
  );
};

export default Premium;