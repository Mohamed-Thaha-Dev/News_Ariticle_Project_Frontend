import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, Watch } from "@mui/icons-material";
import { assects } from "../../assets/Assets";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "./Login";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate()
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const emailOrPhone = watch("emailOrPhone");
  const password = watch("password");

  let handelLogin = async (loginData) => {
    try {
      setIsLoading(true);
      console.log("loading");
      const response = await axios.post(
        "http://localhost:8080/auth/user-login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data;
      localStorage.setItem("authToken", token);

      toast.success("Login Successfully", { position: "top-right" });
      setTimeout(() => {
        navigation("/");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong ❌", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4 pt-15 sm:pt-24">
        <div className="md:w-[95%] max-w-md md:bg-white md:rounded-2xl md:shadow-lg p-6 sm:p-8">
          {/* Header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={assects.companyLogo}
              className="mx-auto h-20 w-20 rounded-full"
            />
            <h4 className="mb-5 text-center text-2xl font-bold tracking-tight text-black">
              Sign in to your account <br /> (உங்கள் கணக்கில் உள்நுழைக)
            </h4>
          </div>

          {/* Form Fields */}
          <form className="grid gap-4" onSubmit={handleSubmit(handelLogin)}>
            <TextField
              fullWidth
              label="Email / Phone Number"
              variant="outlined"
              size="small"
              type="text"
              {...register("emailOrPhone")}
              error={!!errors.emailOrPhone}
              helperText={errors.emailOrPhone?.message}
            />
            <small className="text-gray-500"></small>
            <TextField
              fullWidth
              label="Password / கடவுச்சொல்"
              type={showPassword ? "text" : "password"} // toggle password
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
            {/* forget_password filed */}
            <div className="text-right">
              <Link to="/forgot_password">
                <button className="text-[12px] text-red-600 hover:underline" type="button">
                  Forgot Password? / கடவுச்சொல் மறந்துவிட்டதா?
                </button>
              </Link>
            </div>

            <Button
              fullWidth
              variant="contained"
              sx={{ py: 1.2, borderRadius: 2 }}
              type="submit"
              disabled={!emailOrPhone || !password || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login / உள்நுழைக"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center bg-gray-50 rounded-xl py-4">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account? (கணக்கு இல்லையா?){" "}
              <Link to="/register">
                <button className="ml-2 text-blue-600 hover:underline">
                  Register / பதிவு செய்யவும்
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
    </>
  );
}
