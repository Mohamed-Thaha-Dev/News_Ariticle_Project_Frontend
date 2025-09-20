import axios from "axios"


export const baseURL = "http://localhost:8080"
//send otp from user
export const sendOtp = async (email,mobileNumber)=>{
    return await axios.post(`${baseURL}/auth/send-otp`,{
        email,
        mobileNumber
    })
}
//submit otp from verification
 export const verifyOtp = async (email,otp)=>{
    return await axios.post(`${baseURL}/auth/verify-otp`,{
         email,
          otp
        
    })
}

// registerUser Data Handle
export const registerUser = async (finalData, profilePic)=>{      
    const fromData = new FormData();
    fromData.append("userRegisterData",JSON.stringify(finalData));
    if(profilePic){
        fromData.append("profilePic",profilePic)
    }

    return await axios.post(`${baseURL}/auth/new-user`,fromData)
}

// userLogin
export const loginUser = async (loginData) => {
    console.log("logindata",loginData)
  return await axios.post(`${baseURL}/auth/user-login`, loginData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,

  });
};

//ForgotPassword api 
export const forgotPassword = async(emailOrPhone )=>{
    return await axios.post(`${baseURL}/auth/forget-password/request`,{
        emailOrPhone
    })
}

//resetPassword api
export const resetPassword = async (newPassword,resetToken)=>{
    // const { newPassword } = resetData;
    // const resetToken = otp.join("");

    return await axios.post(`${baseURL}/auth/forget-password/reset`,{
        newPassword,
        resetToken
    })

}