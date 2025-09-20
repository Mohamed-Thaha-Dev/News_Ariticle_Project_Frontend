import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import { forgotPassword } from "../../AllApi/AuthApi";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate =useNavigate()
 
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default page reload

    if(!emailOrPhone) {
      return toast.error("உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும் / Please enter email or phone number",{
      position:"top-right"
    })};

    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   "http://localhost:8080/auth/forget-password/request",{emailOrPhone }
      // );
      const response = await forgotPassword(emailOrPhone)
      console.log(response.data)
      toast.success(response?.data || "Password reset link sent!",{
        position:"top-right"
      });
      setEmailOrPhone("")
      setTimeout(() => {
        navigate("/reset_password")
      }, 3000);
    } catch (err) {
      console.log(err.response?.data)
      toast.error(err.response.data || "Failed to send reset link",{
        position:"top-right"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md md:bg-white w-full p-8 md:rounded-xl md:shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="mb-5 text-[15px] text-center text-black-500">
          உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்
        </p>

        <form onSubmit={handleForgotPassword} className="grid gap-4">
          <TextField
            fullWidth
            label="Email Or Mobile Number"
            variant="outlined"
            size="small"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "green" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify / சரிபார்க்க"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center py-4">
          <Link to="/login">
            <button className="ml-2 text-blue-600 hover:underline">
              Go To Login Page / உள்நுழைவு பக்கத்திற்கு செல்ல
            </button>
          </Link>
        </div>
      </div>
    </div>
            
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
  
    </>
  );
};

export default ForgotPassword;
