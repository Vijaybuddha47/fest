import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Messages from "./pages/Messages";
// import FileManager from "./pages/FileManager";
// import Analytics from "./pages/Analytics";
// import Order from "./pages/Order";
// import Saved from "./pages/Saved";
// import Setting from "./pages/Setting";
import Viewactor from "./pages/actor/Viewactor";
import Addactor from "./pages/actor/Addactor";
import Editactor from "./pages/actor/Editactor";
import Login from "./pages/Login";
import Protected from "./components/Sidebar/Protected";
import Viewdirector from "./pages/director/Viewdirector";
import Adddirector from "./pages/director/Adddirector";
import EditDirector from "./pages/director/EditDirector";
import Viewproducer from "./pages/producer/Viewproducer";
import Addproducer from "./pages/producer/Addproducer";
import Editproducer from "./pages/producer/Editproducer";
import View from "./pages/filmmaker/View";
import Add from "./pages/filmmaker/Add";
import Edit from "./pages/filmmaker/Edit";
import { Profile } from "./pages/profile-setting/Profile";
import { Changepass } from "./pages/profile-setting/Changepass";
import Addmovie from "./pages/movie/Addmovie";
import Viewuser from "./pages/user/Viewuser";
import Edituser from "./pages/user/Edituser";
import Viewmovies from "./pages/movie/Viewmovies";
import { Editmovies } from "./pages/movie/Editmovies";
import ViewSlider from "./pages/slider/Viewslider";
import Addfestival from "./pages/festival/Addfestival";
import { Editfestival } from "./pages/festival/Editfestival";
import Viewfestival from "./pages/festival/Viewfestival";
import AddGenre from "./pages/genres/Addgenre";
import Viewgenre from "./pages/genres/Viewgenre";
import Editgenre from "./pages/genres/Editgenre";
import Addsetting from "./pages/app-setting/Addsetting";
import AddCategory from "./pages/category/Addcategory";
import Viewcategory from "./pages/category/Viewcategory";
import Editcategory from "./pages/category/Editcategory";
import Editslider from "./pages/slider/Editslider";
import ViewfestivalVote from "./pages/movie/ViewfestivalVote";


function App() {
  return (
    <Router>
      
      {/* <SideBar>  */}
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route
                element={
                    <>
                    <SideBar />
                    {/* <Outlet /> */}
                    </>
                }
                >
          <Route path="/" element={<Protected Componet={Dashboard} />} />
          {/* <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} /> */}
          {/* actor url */}
          <Route path="/view-all-actors" element={<Viewactor />} />
          <Route path="/add-actor" element={<Addactor />} />
          <Route path="/edit-actor/:id" element={<Editactor/>} />
          {/* director url */}
          <Route path="/view-all-directors" element={<Viewdirector />} />
          <Route path="/add-director" element={<Adddirector />} />
          <Route path="/edit-director/:id" element={<EditDirector/>} />

          {/* producer url */}
          <Route path="/view-all-producers" element={<Viewproducer />} />
          <Route path="/add-producer" element={<Addproducer />} />
          <Route path="/edit-producer/:id" element={<Editproducer/>} />

          {/* Filmmaker */}
          <Route path="/view-all-filmmakers" element={<View />} />
          <Route path="/add-filmmaker" element={<Add />} />
          <Route path="/edit-filmmaker/:id" element={<Edit/>} />
          
          {/* manage profile */}
          <Route path="/profile-setting" exact element={<Profile/>}></Route>
          <Route path="/change-password" exact element={<Changepass/>}></Route>

          <Route path="/add-movie" exact element={<Addmovie/>}></Route>
          <Route path="/view-all-movies" exact element={<Viewmovies/>}></Route>
          <Route path="/edit-movie/:id" exact element={<Editmovies/>}></Route>
          <Route path="/view-all-user" exact element={<Viewuser/>}/>
          <Route path="/edit-user/:id" exact element={<Edituser/>}/>

          <Route path="/add-festival" exact element={<Addfestival/>}></Route>
          <Route path="/view-all-festival" exact element={<Viewfestival/>}></Route>
          <Route path="/edit-festival/:id" exact element={<Editfestival/>}></Route>

          <Route path="/add-genre" exact element={<AddGenre/>}></Route>
          <Route path="/view-all-genres" exact element={<Viewgenre/>}></Route>
          <Route path="/edit-genre/:id" exact element={<Editgenre/>}></Route>

          <Route path="/add-category" exact element={<AddCategory/>}></Route>
          <Route path="/view-all-category" exact element={<Viewcategory/>}></Route>
          <Route path="/edit-category/:id" exact element={<Editcategory/>}></Route>

          <Route path="/app-setting" exact element={<Addsetting/>}></Route>

          <Route path="/view-slider" exact element={<ViewSlider/>}></Route>
          <Route path="/edit-slider/:id" exact element={<Editslider/>}></Route>
          <Route path="/view-all-votes" exact element={<ViewfestivalVote/>}></Route>

          <Route path="*" element={<> not found</>} />
          </Route>
        </Routes>
        {/* </SideBar> */}
      
    </Router>
  
  );
}

export default App;
