import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaCog, FaVideo, FaLaptopCode, FaLaptopHouse, FaLaptop, FaHeart, FaMask, FaFilm, FaList, FaUserCog, FaUser, FaSlidersH, FaRegFolderOpen, FaPlus } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Topnav from './Topnav';
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    path: "/actors",
    name: "Manage Actor",
    icon: <FaUsers />,
    subRoutes: [
      {
        path: "/add-actor",
        name: "Add Actor",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-actors",
        name: "View All Actor",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  {
    path: "/category",
    name: "Manage Category",
    icon: <FaList />,
    subRoutes: [
      {
        path: "/add-category",
        name: "Add Category",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-category",
        name: "View All Category",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  {
    path: "/genres",
    name: "Manage Genre",
    icon: <FaHeart />,
    subRoutes: [
      {
        path: "/add-genre",
        name: "Add Genre",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-genres",
        name: "View All Genre",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  {
    path: "/director",
    name: "Manage Director",
    icon: <FaUsers />,
    subRoutes: [
      {
        path: "/add-director",
        name: "Add Director",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-directors",
        name: "View All Director",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  {
    path: "/producer",
    name: "Manage Producer",
    icon: <FaUsers />,
    subRoutes: [
      {
        path: "/add-producer",
        name: "Add Producer",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-producers",
        name: "View All Producer",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  {
    path: "/filmmaker",
    name: "Manage Filmmaker",
    icon: <FaVideo />,
    subRoutes: [
      {
        path: "/add-filmmaker",
        name: "Add Filmmaker",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-filmmakers",
        name: "View All Filmmakers",
        icon: <FaRegFolderOpen />,
      },
    ]
  }, ,
  {
    path: "/movies",
    name: "Manage Movies",
    icon: <FaFilm />,
    subRoutes: [
      {
        path: "/add-movie",
        name: "Add Movies",
        icon: <FaPlus />,
      },
      {
        path: "/view-all-movies",
        name: "View All Movies",
        icon: <FaRegFolderOpen />,
      },
      {
        path: "/view-all-votes",
        name: "View All Votes",
        icon: <FaRegFolderOpen />,
      },
    ]
  },
  // {
  //   path: "/festival",
  //   name: "Manage Festival",
  //   icon: <FaFilm />,
  //   subRoutes: [
  //     {
  //       path: "/add-festival",
  //       name: "Add Festival",
  //       icon: <FaPlus />,
  //     },
  //     {
  //       path: "/view-all-festival",
  //       name: "View All Festivals",
  //       icon: <FaRegFolderOpen />,
  //     },
  //   ]
  // },
  {
    path: "/manage-users",
    name: "Manage Users",
    icon: <FaUserCog />,
    subRoutes: [
      {
        path: "/view-all-user",
        name: "View All Users",
        icon: <FaUserCog />,
      },
    ]
  },
  {
    path: "/manage-slider",
    name: "Manage Slider",
    icon: <FaSlidersH />,
    subRoutes: [
      {
        path: "/view-slider",
        name: "View All Slider",
        icon: <FaSlidersH />,
      },
    ]
  },
  {
    path: "/manage-app-setting",
    name: "Manage App Setting",
    icon: <FaCog />,
    subRoutes: [
      {
        path: "/app-setting",
        name: "Website/App Setup",
        icon: <FaCog />,
      },
    ]
  },
  // {
  //   path: "/messages",
  //   name: "Manage Movies",
  //   icon: <FaFilm />,
  //   // subRoutes: [
  //   //   {
  //   //     path: "/add-movie",
  //   //     name: "Add Movies",
  //   //     icon: <FaPlus />,
  //   //   },
  //   //   {
  //   //     path: "/view-all-movies",
  //   //     name: "View All Movies",
  //   //     icon: <FaRegFolderOpen />,
  //   //   },
  //   // ]
  // },

  // {
  //   path: "/manage-slider",
  //   name: "Manage Slider",
  //   icon: <FaSlidersH />,
  //   // subRoutes: [
  //   //   {
  //   //     path: "",
  //   //     name: "View All Slider",
  //   //     icon: <FaSlidersH />,
  //   //   },
  //   // ]
  // },
  // {
  //   path: "/analytics",
  //   name: "Analytics",
  //   icon: <BiAnalyse />,
  // },
  // {
  //   path: "/file-manager",
  //   name: "File Manager",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/saved",
  //   name: "Saved",
  //   icon: <AiFillHeart />,
  // },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  //console.log(children);
  return (
    <>

      <div className="main-container">
        <Topnav />
        <motion.div
          animate={{
            width: isOpen ? "265px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (

                <img className="img-responsive sidebarLogo" src="/images/logo/logo.png" alt="#" />

                // <motion.h1
                //   variants={showAnimation}
                //   initial="hidden"
                //   animate="show"
                //   exit="hidden"
                //   className="logo"
                // >
                //   Film Fest
                // </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main className={isOpen ? `main-open` : `main-close`}><Outlet /></main>
      </div>
    </>
  );
};

export default SideBar;
