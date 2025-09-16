
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import News from "../Pages/News/News";
import Restaurant from "../Pages/Restaurant/Restaurant";
import Login from "../Features/LoginPage/Login.jsx";
import Register from "../Features/Register/Register";
import ForgotPassword from "../Features/ForgotPassword/ForgotPassword.jsx";
import { UserProvider } from "../ContextStore/UserProfile.jsx";
import ResetPasswordPage from "../Features/ResetPassword/ResetPassword.jsx";
import Navbar from "../Component/Navbar/Navbar.jsx";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "../Component/BottomNavbar/BottomNav.jsx";
import RestaurantList from "../Component/Restaurant/RestaurantList.jsx";
import UploadPage from "../Pages/Upload/UploadPages.jsx";
import PageNotFound from "../Component/PageNoteFound/PageNotFound.jsx";

const AnimateRouters = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot_password', '/reset_password',"*"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <div className="overflow-x-hidden ">
           
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/news"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <News />
                </motion.div>
              }
            />
            <Route
              path="/restaurant"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <RestaurantList />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Register />
                </motion.div>
              }
            />
            <Route
              path="/forgot_password"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <ForgotPassword />
                </motion.div>
              }
            />
            <Route
              path="/reset_password"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <ResetPasswordPage />
                </motion.div>
              }
            />
            <Route
              path="/upload"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <UploadPage/>
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                 <PageNotFound/>
                </motion.div>
              }
            />
          </Routes>
        </div>
      </AnimatePresence>
      {!shouldHideNavbar && <BottomNavBar/>} 
    </>
  );
};

export default AnimateRouters;
