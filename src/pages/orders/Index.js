import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";

import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { readCars } from "../../redux/actions/cars";
import { readUsers } from "../../redux/actions/user";

import _objI from "../../utils/_objI";
import Layout from "../../components/Layout";
import {
  readOrders,
  deleteOrder,
  clearOrder,
} from "../../redux/actions/orders";
import { readServices } from "../../redux/actions/services";
import Spinner from "../../components/Spinner";
import PopOver from "../../components/PopOver";
// import { readServices } from "../../redux/actions/services";
import AutoComplete from "../../components/AutoComplete";
export default function Services({ history }) {
  const [searchValue, setSearchValue] = useState([{}]);
  const [model, setModel] = useState({});

  const dispatch = useDispatch();
  const ordersReducer = useSelector((state) => state.ordersReducer);
  const servicesReducer = useSelector((state) => state.servicesReducer);
  const carsReducer = useSelector((state) => state.carsReducer);
  const userReducer = useSelector((state) => state.userReducer);
  console.log({ searchValue });
  useEffect(() => {
    dispatch(readOrders());
    dispatch(readServices());
    dispatch(readUsers());
    dispatch(readCars());
  }, []);
  if (
    ordersReducer.loading ||
    servicesReducer.loading ||
    carsReducer.loading ||
    userReducer.loading
  ) {
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
          className="flex flex-col items-center w-full h-screen p-10 pb-20 transition-all "
        >
          <div className="flex flex-wrap items-center justify-between w-full transition-all select-none">
            <div className="flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ">
              Orders
              <div className="flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all">
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Orders
                </div>
              </div>
            </div>
            {/* <div
              onClick={() => history.push("/orders/new")}
              style={{ backgroundColor: "#212121" }}
              className="px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="text-sm text-center text-white transition-all">
                Add new order
              </div>
            </div> */}
          </div>
          <div className="my-5 flex items-center justify-start w-full">
            <AutoComplete data={ordersReducer.orders} value={setSearchValue} />
          </div>
          <table className="w-full border-collapse shadow-lg table-auto hover:shadow-lg ">
            <thead>
              <tr>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  #
                </th>

                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Status
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Type
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Total paid
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Car
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  User
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Extra Services
                </th>

                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {_objI(searchValue[0])
                ? searchValue.map((order, index) => (
                    <tr className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0">
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          #
                        </span>
                        {index + 1}
                      </td>

                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          status
                        </span>
                        {order.status}
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Type
                        </span>
                        <span
                          className={`rounded ${
                            order.type === "plan"
                              ? `text-red-400`
                              : `text-purple-400`
                          } py-1 px-3 text-xs font-bold`}
                        >
                          {order.type}
                        </span>
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Total price
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                        >
                          {order.price}
                        </span>
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Cars
                        </span>
                        {carsReducer.cars.map((car) =>
                          order.car === car._id ? (
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
                          User
                        </span>
                        {userReducer.users.map((user) =>
                          order.createdBy === user._id ? (
                            <p
                              className="px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer"
                              onClick={() => setModel(user)}
                            >
                              {user.model}
                            </p>
                          ) : (
                            ""
                          )
                        )}
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Services
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                        >
                          {order.services
                            .filter((service) => service.count > 0)
                            .map(
                              (order) =>
                                servicesReducer.services.find(
                                  (service) => service._id === order.service
                                ) &&
                                servicesReducer.services.find(
                                  (service) => service._id === order.service
                                ).label && (
                                  <div className="flex items-center justify-between ">
                                    <div className="flex items-center justify-between mt-1 font-bold text-gray-600 text-md">
                                      <span className="pr-2 font-bold text-gray-600">
                                        Service name:
                                      </span>
                                      <span className="pr-2 font-semibold text-gray-400">
                                        {
                                          servicesReducer.services.find(
                                            (service) =>
                                              service._id === order.service
                                          ).label
                                        }
                                      </span>
                                    </div>

                                    <div>
                                      <span className="pr-2 font-semibold text-gray-400">
                                        count:
                                      </span>
                                      {order.count}
                                    </div>
                                  </div>
                                )
                            )}
                        </span>
                      </td>

                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Actions
                        </span>
                        <div className="flex items-center justify-evenly">
                          {/* <div
                        onClick={() => {
                          dispatch(clearOrder());
                          history.push(`/orders/${order._id}/edit`);
                        }}
                        className="text-blue-400 underline cursor-pointer hover:text-blue-600"
                      >
                        <FaEdit size="1.8rem" />
                      </div> */}
                          <div
                            onClick={() => {
                              dispatch(clearOrder());
                              dispatch(deleteOrder(order._id));
                            }}
                            className="text-red-500 underline cursor-pointer hover:text-red-500"
                          >
                            <AiOutlineDelete size="1.8rem" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : ordersReducer.orders.map((order, index) => (
                    <tr className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0">
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          #
                        </span>
                        {index + 1}
                      </td>

                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Status
                        </span>
                        {order.status}
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Type
                        </span>
                        <span
                          className={`rounded ${
                            order.type === "plan"
                              ? `text-red-400`
                              : `text-purple-400`
                          } py-1 px-3 text-xs font-bold`}
                        >
                          {order.type}
                        </span>
                      </td>

                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Total price
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                        >
                          {order.price}
                        </span>
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Cars
                        </span>
                        {carsReducer.cars.map((car) =>
                          order.car === car._id ? (
                            <p
                              className="px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer"
                              onClick={() => setModel(car)}
                            >
                              Info
                            </p>
                          ) : (
                            ""
                          )
                        )}
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          User
                        </span>
                        {userReducer.users.map((user) =>
                          order.createdBy === user._id ? (
                            <p
                              className="px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer"
                              onClick={() => setModel(user)}
                            >
                              Info
                            </p>
                          ) : (
                            ""
                          )
                        )}
                      </td>
                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Services
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                        >
                          {order.services
                            .filter((service) => service.count > 0)
                            .map(
                              (order) =>
                                servicesReducer.services.find(
                                  (service) => service._id === order.service
                                ) &&
                                servicesReducer.services.find(
                                  (service) => service._id === order.service
                                ).label && (
                                  <div className="flex items-center justify-between ">
                                    <div className="flex items-center justify-between mt-1 font-bold text-gray-600 text-md">
                                      <span className="pr-2 font-bold text-gray-600">
                                        Service name:
                                      </span>
                                      <span className="pr-2 font-semibold text-gray-400">
                                        {
                                          servicesReducer.services.find(
                                            (service) =>
                                              service._id === order.service
                                          ).label
                                        }
                                      </span>
                                    </div>

                                    <div>
                                      <span className="pr-2 font-semibold text-gray-400">
                                        count:
                                      </span>
                                      {order.count}
                                    </div>
                                  </div>
                                )
                            )}
                        </span>
                      </td>

                      <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                        <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                          Actions
                        </span>
                        <div className="flex items-center justify-evenly">
                          {/* <div
                        onClick={() => {
                          dispatch(clearOrder());
                          history.push(`/orders/${order._id}/edit`);
                        }}
                        className="text-blue-400 underline cursor-pointer hover:text-blue-600"
                      >
                        <FaEdit size="1.8rem" />
                      </div> */}
                          <div
                            onClick={() => {
                              dispatch(clearOrder());
                              dispatch(deleteOrder(order._id));
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
