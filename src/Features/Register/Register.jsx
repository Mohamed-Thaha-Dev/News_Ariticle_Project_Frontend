import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Box,
  Avatar,
} from "@mui/material";
import { useState, useRef, useContext } from "react";
import { Visibility, VisibilityOff, Watch } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterVal } from "./RegisterValitation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { UserRegisterContext } from "../../ContextStore/UserProfile";
import party from "party-js";

export default function LoginPage() {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  // store
  const  {setUserProfilePic} = useContext(UserRegisterContext)

  const handleClickShowPassword = () => setShowPassword((prev) => !prev); //password

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset, // reset all filed
    // getValues //irukkura val va ellam yaduthutu varum
  } = useForm({
    resolver: yupResolver(RegisterVal),
  });

  // profile pic  preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
       setProfilePic(file) // profile pic ku send pannurom
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 for preview in UI
      };
      reader.readAsDataURL(file);
     // Store the actual file for upload
      setUserProfilePic(file)  // store file in context
    }
  };

  // from data submit

  let handelRegisterData = async (registerData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...finalData } = registerData;

      const formData = new FormData();
      formData.append("userRegisterData", JSON.stringify(finalData)); // JSON string
      formData.append("profilePic", profilePic);

      console.log("FormData entries:");
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
      const response = await axios.post(
        "http://localhost:8080/auth/new-user",
        formData
      );
      console.log(profilePic)
      console.log("Data Added Successfully", response);
      toast.success(response.data, {
        position: "top-right",
      });
      reset();
       party.confetti(document.body, {
            shapes: ["circle", "square", "star"],
            count: 150,
            size:1,
            spread:40,
            position: { x: 1, y: 1 },
          });
      setPreview(null);
      setTimeout(() => {
        navigation("/login");
      },4000);
    } catch (error) {
      if (error.response) {
        // Backend running but returned error (400, 401, 500, etc.)
        toast.error(error.response?.data || "Something went wrong ❌", {
          position: "top-right",
        });
      } else if (error.request) {
        // Request sent but no response (server down or no internet)
        toast.error("Server not reachable 🚫. Please try again later.", {
          position: "top-right",
        });
      } else {
        // Something else (axios config issue etc.)
        toast.error("Unexpected error occurred ⚠️", {
          position: "top-right",
        });
      }

      console.error("Register Failed:", error.message);
      reset(); // form reset
      setPreview(null);
    } finally {
      // ❌  reset all filed
      setIsLoading(false);
        
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="md:w-[95%] max-w-md md:bg-white md:rounded-2xl md:shadow-lg p-10 sm:p-8 relative z-10 mt-15 md:mt-25">
          {/* Header */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Create an Account (கணக்கு உருவாக்கவும்)
            </h3>
            <p className="mt-4 text-sm text-gray-500">
              Welcome! Create an account to get started
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">வரவேற்கிறோம்!</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form Fields */}
          <form
            className="grid gap-5"
            onSubmit={handleSubmit(handelRegisterData)}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <IconButton
                onClick={() => fileInputRef.current.click()}
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  border: "2px dashed #ccc",
                  overflow: "hidden",
                }}
              >
                {preview ? (
                  <Avatar
                    src={preview}
                    sx={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <PhotoCameraIcon sx={{ fontSize: 48, color: "#ccc" }} />
                )}
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label="Full Name / முழுப்பெயர்"
              variant="outlined"
              size="small"
              type="text"
              {...register("userName")}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
            <TextField
              fullWidth
              label="Email / மின்னஞ்சல்"
              type="email"
              variant="outlined"
              size="small"
              {...register("emailId")}
              error={!!errors.emailId}
              helperText={errors.emailId?.message}
            />
            <TextField
              fullWidth
              label="Mobile Number / கைபேசி எண்"
              type="text"
              variant="outlined"
              size="small"
              {...register("userMobileNumber")}
              error={!!errors.userMobileNumber}
              helperText={errors.userMobileNumber?.message}
            />
            <TextField
              fullWidth
              label="Password / கடவுச்சொல்"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password / கடவுச்சொல்லை உறுதிசெய்க"
              type="password"
              variant="outlined"
              size="small"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register / பதிவு செய்க"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center py-4">
            <p className="text-sm text-gray-600">
              Have an account? / ஏற்கனவே கணக்கு உள்ளதா?{" "}
              <Link to="/login">
                <button className="ml-2 text-blue-600 hover:underline">
                  Login / உள்நுழைய
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>

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
}
