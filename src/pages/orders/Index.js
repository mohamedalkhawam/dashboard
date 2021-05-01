import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Layout from "../../components/Layout";
import {
  readOrders,
  deleteOrder,
  clearOrder,
} from "../../redux/actions/orders";
import { readServices } from "../../redux/actions/services";
// import { readServices } from "../../redux/actions/services";
export default function Services({ history }) {
  const dispatch = useDispatch();
  const ordersReducer = useSelector((state) => state.ordersReducer);
  const servicesReducer = useSelector((state) => state.servicesReducer);
  console.log({ ordersReducer });
  useEffect(() => {
    dispatch(readOrders());
    dispatch(readServices());
  }, []);
  if (ordersReducer.loading || servicesReducer.loading) {
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
              Orders
              <div className="flex items-center w-full text-left text-sm mt-4 text-gray-500 transition-all">
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100  ">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100">
                  Orders
                </div>
              </div>
            </div>
            {/* <div
              onClick={() => history.push("/orders/new")}
              style={{ backgroundColor: "#212121" }}
              className=" cursor-pointer transition-all   rounded-md shadow-md hover:shadow-lg my-10 py-3 px-4"
            >
              <div className="text-center text-white   text-sm   transition-all">
                Add new order
              </div>
            </div> */}
          </div>

          <table className="border-collapse w-full shadow-lg hover:shadow-lg table-auto ">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Type
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Total paid
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Extra Services
                </th>

                {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {ordersReducer.orders.map((order) => (
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Name
                    </span>
                    {order.name}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
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
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Total price
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                    >
                      {order.price}
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
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
                              <div className="flex justify-between items-center ">
                                <div className="text-md mt-1 font-bold text-gray-600 flex justify-between items-center">
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

                  {/* <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>
                    <div className="flex items-center justify-evenly">
                      <div
                        onClick={() => {
                          dispatch(clearOrder());
                          history.push(`/orders/${order._id}/edit`);
                        }}
                        className="text-blue-400 hover:text-blue-600 underline cursor-pointer"
                      >
                        <FaEdit size="1.8rem" />
                      </div>
                      <div
                        onClick={() => {
                          dispatch(clearOrder());
                          dispatch(deleteOrder(order._id));
                        }}
                        className="text-red-500 hover:text-red-500 underline  cursor-pointer"
                      >
                        <AiOutlineDelete size="1.8rem" />
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}