import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import Layout from "../../components/Layout";
import { readUsers, deleteUser, clearUser } from "../../redux/actions/user";
import { readServices } from "../../redux/actions/services";
import { readRoles } from "../../redux/actions/roles";
import { readCars } from "../../redux/actions/cars";
import _objI from "../../utils/_objI";
import Spinner from "../../components/Spinner";
export default function Users({ history }) {
  const dispatch = useDispatch();
  const [model, setModel] = useState({});
  const carsReducer = useSelector((state) => state.carsReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const rolesReducer = useSelector((state) => state.rolesReducer);

  useEffect(() => {
    dispatch(readUsers());
    dispatch(readRoles());
    dispatch(readCars());
  }, []);
  if (userReducer.loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        {_objI(model) && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-300 bg-opacity-30">
            <div className="relative z-50 w-6/12 p-6 bg-white border rounded shadow">
              <span onClick={() => setModel({})}>
                <AiOutlineCloseCircle className="absolute text-2xl text-red-600 cursor-pointer top-3 right-3 hover:text-red-700" />
              </span>
              <span className="flex flex-wrap w-full">
                {Object.entries(model).map(([key, value]) => {
                  if (
                    key !== "trash" &&
                    key !== "createdAt" &&
                    key !== "updatedAt" &&
                    key !== "_id" &&
                    key !== "createdBy" &&
                    key !== "__v"
                  ) {
                    return (
                      <div className="flex w-full py-1">
                        <span className="mr-3 text-sm font-semibold">
                          {key}:
                        </span>
                        <span>
                          {typeof value === "object" && value !== null
                            ? value.name
                            : value}
                        </span>
                      </div>
                    );
                  }
                })}
              </span>
            </div>
          </div>
        )}
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="flex flex-col items-center w-full h-screen p-10 pb-20 transition-all"
        >
          <div className="flex flex-wrap items-center justify-between w-full transition-all select-none">
            <div className="flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ">
              Users
              <div className="flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all">
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Users
                </div>
              </div>
            </div>
            <div
              onClick={() => history.push("/users/new")}
              style={{ backgroundColor: "#212121" }}
              className="px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="text-sm text-center text-white transition-all">
                Add new user
              </div>
            </div>
          </div>

          <table className="w-full border-collapse shadow-lg table-auto hover:shadow-lg ">
            <thead>
              <tr>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  #
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Email
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Phone
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Role
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Cars
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Status
                </th>{" "}
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userReducer.users.map((user, index) => (
                <tr className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0">
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      #
                    </span>
                    {index + 1}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Email
                    </span>
                    {user.email || (
                      <span className="text-xs text-gray-600">Empty</span>
                    )}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Phone
                    </span>
                    {user.phone || (
                      <span className="text-xs text-gray-600">Empty</span>
                    )}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Role
                    </span>
                    <p className="px-3 py-1 text-xs font-bold text-gray-500 rounded">
                      {rolesReducer.roles.map((role) =>
                        user.roles.find((userRole) => userRole === role._id) ? (
                          <span>{role.name}</span>
                        ) : (
                          ""
                        )
                      )}
                    </p>
                  </td>{" "}
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Cars
                    </span>
                    {carsReducer.cars.map((car) =>
                      car.createdBy === user._id ? (
                        <p
                          className="px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer"
                          onClick={() => setModel(car)}
                        >
                          {car.model}
                        </p>
                      ) : (
                        ""
                      )
                    )}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
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
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Actions
                    </span>
                    <div className="flex items-center justify-evenly">
                      <div
                        onClick={() => {
                          dispatch(clearUser());
                          history.push(`/users/${user.id}/edit`);
                        }}
                        className="text-blue-400 underline cursor-pointer hover:text-blue-600"
                      >
                        <FaEdit size="1.8rem" />
                      </div>
                      <div
                        onClick={() => {
                          dispatch(clearUser());
                          dispatch(deleteUser(user.id));
                          dispatch(readUsers());
                        }}
                        className="text-red-500 underline cursor-pointer hover:text-red-500"
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
