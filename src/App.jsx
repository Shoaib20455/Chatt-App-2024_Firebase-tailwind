import { useContext } from "react";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  console.log(currentUser);
  return (
    <div className=" font-[Roboto]">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<ProtectedRoute>
            <Home /> 
            </ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
