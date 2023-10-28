import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "../src/pages/Home"
import Footer from "./components/common/Footer";
import SubCategorieWisePage from "./pages/SubCategorieWisePage";
import SingleProductPage from "./pages/SingleProductPage";
import Signup from "./pages/Signup";
import VeryfyEmail from "./pages/VeryfyEmail";
import Login from "./pages/Login";

function App() {
  return (
   <div className="w-full ">
    <div className="w-11/12  mx-10" >
     <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path={`/:categoeId/:subCategoreId`} element={<SubCategorieWisePage/>}/>
      <Route path={`:prouctId`} element={<SingleProductPage/>}/>
      <Route path={"/signup"} element={<Signup/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/verify-email"} element={<VeryfyEmail/>} />
    </Routes>
   </div>
   <Footer/>
   </div>
  );
}

export default App;
