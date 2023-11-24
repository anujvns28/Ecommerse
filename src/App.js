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
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import ProfileInfo from "./components/core/profile/ProfileInfo";
import ProfileImg from "./components/core/profile/ProfileImg";
import ViewAddress from "./components/core/profile/ViewAddress";
import UpdateProfile from "./components/core/profile/UpdateProfile";
import UpdateImg from "./components/core/profile/UpdateImg";
import AddAddress from "./components/core/profile/AddAddress";
import Wishlist from "./components/core/profile/Wishlist";

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
      <Route path={"/cart"} element={<Cart/>}/>
      <Route path={"/verify-email"} element={<VeryfyEmail/>} />
      <Route path={"/create-product"} element={<AddProduct/>} />


      <Route  element={<Profile/>} > 
      <Route path={"my-profile/view-profile"} element={<ProfileInfo/>} />
      <Route path={"my-profile/view-profileImg"} element={<ProfileImg/>} />
      <Route path={"my-profile/view-address"} element={<ViewAddress/>} />
      <Route path={"my-profile/update-profile"} element={<UpdateProfile/>} />
      <Route path={"my-profile/update-profileImg"} element={<UpdateImg/>} />
      <Route path={"my-profile/add-address"} element={<AddAddress/>} />
      <Route path={"my-profile/wishlist"} element={<Wishlist/>} />
      </Route>
    </Routes>
   </div>
   <Footer/>
   </div>
  );
}

export default App;
