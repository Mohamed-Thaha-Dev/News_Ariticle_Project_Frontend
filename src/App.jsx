import './App.css'
import {BrowserRouter as Router} from "react-router-dom"
import AnimateRouters from './Routers/animateRouters.jsx'
import { UserProvider } from './ContextStore/UserProfile.jsx'






function App() {
  return (
    <>
    <UserProvider>
    <Router>
      <AnimateRouters />
    </Router>
    </UserProvider>
    </>
  )
}

export default App
