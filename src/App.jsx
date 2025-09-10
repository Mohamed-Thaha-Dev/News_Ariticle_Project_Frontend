import './App.css'
import Navbar from './Component/Navbar/Navbar'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import HomePage from './Pages/Home/HomePage'
import News from './Pages/News/News'
import Restaurant from './Pages/Restaurant/Restaurant'
import Login from './Features/LoginPage/Login.jsx'
import Register from './Features/Register/Register'
import ForgotPassword from './Features/ForgotPassword/ForgotPassword.jsx'
import { UserProvider } from './ContextStore/UserProfile.jsx'




function App() {
  return (
    <>
    <Router>
      <UserProvider>
        <Navbar/>
        <Routes>
            <Route path='/' element = {<HomePage/>}/>
            <Route path='/news' element = {<News/>} />
            <Route path='/restaurant' element = {<Restaurant/>}/>
            <Route path='/login' element= {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/forgot_password' element = {<ForgotPassword/>}/>
        </Routes>
        </UserProvider>  
    </Router>
    </>
  )
}

export default App
