import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Layout from "../../components/Layout";
import { readUsers, deleteUser, clearUser } from "../../redux/actions/user";
import { readServices } from "../../redux/actions/services";
export default function Users({ history }) {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  console.log({ userReducer });
  useEffect(() => {
    dispatch(readUsers());
  }, []);
  if (userReducer.loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen  ">
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
          className=" w-full flex flex-col items-center p-10 transition-all h-screen overflow-y-auto pb-20 "
        >
          <div className="flex justify-between items-center  select-none  w-full flex-wrap transition-all">
            <div className=" text-4xl  text-gray-500 text-left font-normal my-10 flex-grow transition-all">
              Users
              <div className="flex items-center w-full text-left text-sm mt-4 text-gray-500 transition-all">
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
              onClick={() => history.push("/users/new")}
              style={{ backgroundColor: "#212121" }}
              className=" cursor-pointer transition-all   rounded-md shadow-md hover:shadow-lg my-10 py-3 px-4"
            >
              <div className="text-center text-white   text-sm   transition-all">
                Add new user
              </div>
            </div>
          </div>

          <table className="border-collapse w-full shadow-lg hover:shadow-lg table-auto ">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Email
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Phone
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Role
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Status
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userReducer.users.map((user) => (
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Email
                    </span>
                    {user.email || "Empty"}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Phone
                    </span>
                    {user.phone || "Empty"}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Role
                    </span>
                    <span className="rounded text-gray-500 py-1 px-3 text-xs font-bold">
                      {/* {user.roles} */}
                      Not Yet
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    <span
                      className={`rounded ${
                        user.status === "active"
                          ? `bg-green-600 hover:bg-green-700`
                          : `bg-red-600 hover:bg-red-700`
                      } py-1 px-3 text-xs font-semibold text-white`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <div className="flex items-center justify-evenly">
                      <div
                        onClick={() => {
                          dispatch(clearUser());
                          history.push(`/users/${user.id}/edit`);
                        }}
                        className="text-blue-400 hover:text-blue-600 underline cursor-pointer"
                      >
                        <FaEdit size="1.8rem" />
                      </div>
                      <div
                        onClick={() => {
                          dispatch(clearUser());
                          dispatch(deleteUser(user.id));
                          dispatch(readUsers());
                        }}
                        className="text-red-500 hover:text-red-500 underline  cursor-pointer"
                      >
                        <AiOutlineDelete size="1.8rem" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
