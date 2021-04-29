import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineDashboard,
} from "react-icons/ai";
import { RiDashboardLine, RiLogoutBoxLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { GrServices } from "react-icons/gr";
import { SiOpenaccess } from "react-icons/si";

import { Fa500Px, FaCriticalRole } from "react-icons/fa";
import { mainColor, background } from "../styles/mainColors";
import { logout } from "../redux/actions/auth";

const Layout = ({ children, parentClassName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isMenuopen, setIsMenuOpen] = useState(true);
  return (
    <>
      <div
        style={{ backgroundColor: mainColor }}
        onClick={() => setIsMenuOpen(!isMenuopen)}
        className={`bg-green-700   p-1 rounded-lg  ${
          isMenuopen ? `hidden absolute` : `block fixed `
        } opacity-50 select-none hover:opacity-100 shadow-md hover:shadow-lg cursor-pointer left-8 top-8 w-9 h-9  text-white transition-all duration-200 transform hover:scale-105  z-50`}
      >
        <AiOutlineMenuUnfold size="1.7rem" className="text-white " />
      </div>
      <div className="flex h-screen transition duration-1000 overflow-x-hidden  relative ">
        <div
          style={{ backgroundColor: mainColor }}
          className={` bg-green-700 min-h-screen  shadow-md hover:shadow-lg sticky  ${
            isMenuopen ? ` w-64 px-4 py-7     ` : `w-0 p-0  `
          }  transform-gpu  transition-all duration-1000  flex-none select-none overflow-y-auto text-white `}
        >
          <div className="font-semibold text-white flex justify-between items-center  border-b pb-4 ">
            <div
              className="cursor-pointer transform hover:scale-105 flex items-center"
              onClick={() => history.push("/")}
            >
              <RiDashboardLine size="1.6rem" className="text-white " />
              <div className="pl-1  ">Dashboard</div>
            </div>

            <div
              className="cursor-pointer transform hover:scale-105 "
              onClick={() => setIsMenuOpen(!isMenuopen)}
            >
              <AiOutlineMenuFold size="1.7rem" className="text-white" />
            </div>
          </div>

          <div className="pb-8 pt-2  ">
            {/* content start */}

            <div
              onClick={() => {
                history.push("/users");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex  items-center py-2 bg-white text-green-700 rounded font-semibold cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition-transform"
            >
              <AiOutlineUser size="1.6rem" className={mainColor} />
              <div className="pl-2">Users</div>
            </div>
            <div
              onClick={() => {
                history.push("/services");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center py-2 bg-white text-green-700 rounded font-semibold cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition"
            >
              <GrServices size="1.6rem" color={mainColor} />
              <div className="pl-2">Services</div>
            </div>
            <div
              onClick={() => {
                history.push("/plans");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center py-2 bg-white text-green-700 rounded font-semibold cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition"
            >
              <Fa500Px size="1.6rem" color={mainColor} />
              <div className="pl-2">Plans</div>
            </div>
            <div
              onClick={() => {
                history.push("/roles");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center py-2 bg-white text-green-700 rounded font-semibold cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition"
            >
              <FaCriticalRole size="1.6rem" color={mainColor} />
              <div className="pl-2">Roles</div>
            </div>
            <div
              onClick={() => {
                history.push("/permissions");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center py-2 bg-white text-green-700 rounded font-semibold cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition"
            >
              <SiOpenaccess size="1.6rem" color={mainColor} />
              <div className="pl-2">Permissions</div>
            </div>
            <div
              onClick={() => {
                dispatch(logout());
                history.push("/auth");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className=" flex items-center py-2 bg-white text-green-700 rounded font-semibold  cursor-pointer px-2 my-2 shadow-md hover:shadow-lg transform-gpu hover:scale-105 transition"
            >
              <RiLogoutBoxLine size="1.6rem" color={mainColor} />
              <div className="pl-2">Logout</div>
            </div>

            {/* content end */}
          </div>
        </div>
        {/* <div className="flex flex-col w-full"> */}
        {/* <div
            style={{ color: background, backgroundColor: mainColor }}
            className="py-6  w-full  px-10"
          >
            Header
          </div> */}
        <div
          // style={{
          //   backgroundColor:
          //     parentClassName && parentClassName.length > 0 ? "" : background,
          // }}
          className={`${
            parentClassName && parentClassName.length > 0
              ? `flex-grow overflow-auto ${parentClassName}`
              : `flex-grow overflow-auto  `
          } `}
        >
          {children}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Layout;
