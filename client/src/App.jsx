import Details from "./pages/details/Details";
import Expence from "./pages/expence/Expence";

import Heading from "./pages/heading/Heading"
import Login from "./pages/login/Login"
import { Profile } from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup"
import { Route, Routes } from "react-router-dom";
function App() {
 

  return (
    <>
      <h1>Expence tracker App</h1>
      <Heading/>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
     <Route path="/profile" element={<Profile/>}/>
      <Route path="/details" element={<Details/>}/>
      <Route path="/expence" element={<Expence/>}/>
     </Routes>
      
       
    </>
  )
}

export default App
