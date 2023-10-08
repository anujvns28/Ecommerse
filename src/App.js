import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "../src/pages/Home"

function App() {
  return (
   <div className="w-full bg-slate-50">
    <div className="w-11/12  mx-20" >
     <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
   </div>
   </div>
  );
}

export default App;
