import React, { useState, useRef } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Watch } from "lucide-react";
import { ResetPasswordValidation } from "./ResetPasswordValitation";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    Watch,
  } = useForm({
    resolver: yupResolver(ResetPasswordValidation),
  });
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only one digit allowed
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handelResetData = async (resetData) => {
    const { newPassword } = resetData;
    const resetToken = otp.join("");

    if (resetToken.length !== 6) {
      return toast.error("Please enter full 6-digit OTP", {
        position: "top-right",
      });
    }

    // Send OTP + New Password API call logic here
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/forget-password/reset",
        {
          resetToken,
          newPassword,
        }
      );

      console.log(response.data);
      toast.success(response?.data || "OTP submitted successfully!", {
        position: "top-right",
      });
      reset();
      setOtp(Array(6).fill(""));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response?.data || "Failed to reset password", {
        position: "top-right",
      });
      reset();
      // setOtp(Array(6).fill(""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Box className="max-w-md md:bg-white w-full p-8 md:rounded-xl md:shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>

        <form
          onSubmit={handleSubmit(handelResetData)}
          autoComplete="off"
          className="grid gap-4"
        >
          <Box className="flex gap-2 justify-center">
            {otp.map((value, index) => (
              <TextField
                key={index}
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.5rem" },
                }}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </Box>
          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            size="small"
            type="password"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            size="small"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "கடவுச்சொல்லை மாற்று / Reset PassWord"
            )}
          </Button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
    </Box>
  );
}
