import React from 'react'
import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) return toast.error("Please enter email");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", { email });
      toast.success(response.data.message || "Password reset link sent!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md md:bg-white w-full  p-8 md:rounded-xl md:shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className='mb-5 text-[15px] text-center text-black-500'>உங்களுடைய மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்</p>
        <TextField
          fullWidth
          label="Email Or Mobile Number"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4,bgcolor:"green" }}
          onClick={handleForgotPassword}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Verify / சரிபார்க்க"}
        </Button>
         <div className="mt-4 text-center py-4">
            <Link to="/login">
              <button className="ml-2 text-blue-600 hover:underline">
                 Go To Login Page / உள்நுழைவு  பக்கத்திற்கு செல்ல ?
              </button>
            </Link>
        </div>
      </div>
      </div>
  );
}

export default ForgotPassword