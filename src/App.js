import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "../src/pages/Home"
import Footer from "./components/common/Footer";
import SubCategorieWisePage from "./pages/SubCategorieWisePage";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
  return (
   <div className="w-full ">
    <div className="w-11/12  mx-10" >
     <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path={`/:categoeId/:subCategoreId`} element={<SubCategorieWisePage/>}/>
      <Route path={`:prouctId`} element={<SingleProductPage/>}/>
    </Routes>
   </div>
   <Footer/>
   </div>
  );
}

export default App;
