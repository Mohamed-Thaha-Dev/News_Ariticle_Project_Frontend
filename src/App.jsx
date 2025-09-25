import './App.css'
import {BrowserRouter as Router} from "react-router-dom"

import { LoginContext, LoginProvider, UserProvider } from './ContextStore/UserProfile.jsx'
import AnimateRouters from './Routers/AnimateRouters.jsx'






function App() {
  return (
    <>
    <UserProvider>
      <LoginProvider>
    <Router>
      <AnimateRouters />
    </Router>
     </LoginProvider>
    </UserProvider>
    </>
  )
}

export default App
