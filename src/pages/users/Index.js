import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Layout from "../../components/Layout";
import { readUsers } from "../../redux/actions/user";
export default function Users() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(readUsers()).then((res) => null);
  }, []);
  console.log(userReducer);
  if (userReducer.loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="loader animate-spin   border-black relative ease-linear border-t-0 rounded-full border-8  w-24 h-24 bg-black">
            <div className="loader Infinity animate-pulse transform border-white  relative ease-linear border-t-0 rounded-full border-8  w-16 h-16 bg-white">
              {/* <div className="loader Infinity border-black relative ease-linear animate-spin  border-t-0 rounded-full border-8  w-10 h-10 bg-black">
                <div className="loader Infinity border-black -rotate-90 relative ease-linear border-t-0 rounded-full border-8  w-6 h-6 bg-black"></div>
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="bg-green-700 w-full h-full flex flex-col items-center px-10 py-20 "
        >
          <div className="flex justify-between items-center  select-none  w-full">
            <div className=" text-4xl  text-gray-500 text-left font-normal my-10 flex-grow">
              Users
              <div className="flex items-center w-full text-left text-sm mt-4 text-gray-500 ">
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100  ">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100">
                  Users
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: "#212121" }}
              className=" cursor-pointer    rounded-md shadow-md hover:shadow-lg my-10 py-3 px-4"
            >
              <div className="text-center text-white   text-sm   ">
                Add new user
              </div>
            </div>
          </div>

          <table className="border-collapse w-full shadow-lg hover:shadow-lg table-auto ">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  #
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  User Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Email
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Role
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 shadow-md">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    #
                  </span>
                  1
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    User Name
                  </span>
                  Mohamed Al-Khawam
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  mohamed.kh1994@gmail.com
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static shadow">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Role
                  </span>
                  <span className="rounded bg-green-600 py-2 px-3 text-xs font-semibold text-gray-100">
                    Super
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Actions
                  </span>
                  <div className="  flex justify-evenly items-center">
                    <div
                      href="#"
                      className="text-blue-500 hover:text-blue-700  "
                    >
                      <FaEdit size="1.5rem" className="cursor-pointer" />
                    </div>
                    <div href="#" className="text-red-500 hover:text-red-700  ">
                      <AiOutlineDelete
                        size="1.5rem"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 shadow-md">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    #
                  </span>
                  2
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    User Name
                  </span>
                  Rami
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static ">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  rami@gmail.com
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Role
                  </span>
                  <span className="rounded bg-red-700 py-2 px-3 text-xs font-semibold text-gray-100">
                    Subscriber
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Actions
                  </span>
                  <div className="  flex justify-evenly items-center">
                    <div
                      href="#"
                      className="text-blue-500 hover:text-blue-700  "
                    >
                      <FaEdit size="1.5rem" className="cursor-pointer" />
                    </div>
                    <div href="#" className="text-red-500 hover:text-red-700  ">
                      <AiOutlineDelete
                        size="1.5rem"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 shadow-md">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    #
                  </span>
                  3
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    User Name
                  </span>
                  awis Al-Raaie
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  mhd@larsa.org
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Role
                  </span>
                  <span className="rounded bg-blue-600 py-2 px-3 text-xs font-semibold text-gray-100">
                    Adminstrator
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Actions
                  </span>
                  <div className="  flex justify-evenly items-center">
                    <div
                      href="#"
                      className="text-blue-500 hover:text-blue-700  "
                    >
                      <FaEdit size="1.5rem" className="cursor-pointer" />
                    </div>
                    <div href="#" className="text-red-500 hover:text-red-700  ">
                      <AiOutlineDelete
                        size="1.5rem"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
