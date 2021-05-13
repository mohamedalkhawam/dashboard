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
import { BiBuildingHouse } from "react-icons/bi";
import { VscGitPullRequest } from "react-icons/vsc";
import { GiModernCity, GiRegeneration } from "react-icons/gi";
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
      <div className="relative flex h-screen overflow-x-hidden transition duration-1000 ">
        <div
          style={{ backgroundColor: mainColor }}
          className={` bg-green-700 min-h-screen  shadow-md hover:shadow-lg sticky  ${
            isMenuopen ? ` w-64 px-4 py-7     ` : `w-0 p-0  `
          }  transform-gpu  transition-all duration-1000  flex-none select-none overflow-y-auto text-white `}
        >
          <div className="flex items-center justify-between pb-4 font-semibold text-white border-b ">
            <div
              className="flex items-center transform cursor-pointer hover:scale-105"
              onClick={() => history.push("/")}
            >
              <RiDashboardLine size="1.6rem" className="text-white " />
              <div className="pl-1 ">Dashboard</div>
            </div>

            <div
              className="transform cursor-pointer hover:scale-105 "
              onClick={() => setIsMenuOpen(!isMenuopen)}
            >
              <AiOutlineMenuFold size="1.7rem" className="text-white" />
            </div>
          </div>

          <div className="pt-2 pb-8 ">
            {/* content start */}
            <div
              onClick={() => {
                history.push("/users");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition-transform bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <AiOutlineUser size="1.6rem" className={mainColor} />
              <div className="pl-2">Users</div>
            </div>
            <div
              onClick={() => {
                history.push("/services");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <GrServices size="1.6rem" color={mainColor} />
              <div className="pl-2">Services</div>
            </div>
            <div
              onClick={() => {
                history.push("/plans");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <Fa500Px size="1.6rem" color={mainColor} />
              <div className="pl-2">Plans</div>
            </div>
            <div
              onClick={() => {
                history.push("/orders");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <VscGitPullRequest size="1.6rem" color={mainColor} />
              <div className="pl-2">Orders</div>
            </div>
            <div
              onClick={() => {
                history.push("/scheduledWashes");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <VscGitPullRequest size="1.6rem" color={mainColor} />
              <div className="pl-2">Scheduled Washes</div>
            </div>
            <div
              onClick={() => {
                history.push("/roles");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <FaCriticalRole size="1.6rem" color={mainColor} />
              <div className="pl-2">Roles</div>
            </div>
            <div
              onClick={() => {
                history.push("/permissions");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <SiOpenaccess size="1.6rem" color={mainColor} />
              <div className="pl-2">Permissions</div>
            </div>
            <div
              onClick={() => {
                history.push("/city");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <GiModernCity size="1.6rem" color={mainColor} />
              <div className="pl-2">Cities</div>
            </div>
            <div
              onClick={() => {
                history.push("/buildings");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <BiBuildingHouse size="1.6rem" color={mainColor} />
              <div className="pl-2">Buildings</div>
            </div>
            <div
              onClick={() => {
                history.push("/intro");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
            >
              <GiRegeneration size="1.6rem" color={mainColor} />
              <div className="pl-2">Mobile Intro</div>
            </div>
            <div
              onClick={() => {
                dispatch(logout());
                history.push("/auth");
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className="flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105"
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
            className="w-full px-10 py-6"
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
