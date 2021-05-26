import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";

import { readStatistics } from "../redux/actions/statistics";
import Spinner from "../components/Spinner";
export default function Index() {
  const dispatch = useDispatch();
  const statisticsReducer = useSelector((state) => state.statisticsReducer);

  const [count, setCount] = useState({
    users: 0,
    scheduled: {
      pending: 0,
      accepted: 0,
      completed: 0,
      progress: 0,
    },
    orders: {
      plan: 0,
      oneTime: 0,
    },
  });

  useEffect(() => {
    dispatch(readStatistics());
  }, []);
  if (statisticsReducer.loading) {
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
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className=" flex flex-col items-center w-full h-screen p-10 pb-20 transition-all bg-gray-50"
        >
          <div className="flex flex-wrap items-center justify-between w-full transition-all select-none">
            <div className="flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ">
              Dashboard
              <span className=" font-medium transition-all text-sm duration-100 transform cursor-pointer ml-4 hover:text-gray-600 hover:scale-110">
                (Report Center)
              </span>
            </div>
          </div>
          <div className="w-full border shadow-md hover:shadow-lg rounded-lg mb-20">
            <div className="bg-black bg-opacity-90 p-4 text-center text-sm md:text-lg text-gray-50 font-semibold rounded-t-lg">
              Scheduled Washes
            </div>
            <div className="flex justify-start items-center bg-white rounded-b-lg flex-wrap">
              <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/4 text-center">
                <div className=" p-4 border-b">Pending</div>
                <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                  {count.scheduled.pending || 0}
                </div>
              </div>
              <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/4 text-center">
                <div className=" p-4 border-b">Accepted</div>
                <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                  {count.scheduled.accepted || 0}
                </div>
              </div>
              <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/4 text-center">
                <div className=" p-4 border-b">Progress</div>
                <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                  {count.scheduled.progress || 0}
                </div>
              </div>
              <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/4 text-center">
                <div className=" p-4 border-b">Completed</div>
                <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                  {count.scheduled.completed || 0}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full flex-wrap">
            <div className="w-full md:w-5/12 border shadow-md hover:shadow-lg rounded-lg mb-20">
              <div className="bg-black bg-opacity-90 p-4 text-center text-sm md:text-lg text-gray-50 font-semibold rounded-t-lg">
                Orders
              </div>
              <div className="flex justify-start items-center bg-white rounded-b-lg flex-wrap">
                <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/2 text-center">
                  <div className=" p-4 border-b">Plan</div>
                  <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                    {count.orders.plan || 0}
                  </div>
                </div>
                <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-1/2 text-center">
                  <div className=" p-4 border-b">One Time</div>
                  <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                    {count.orders.oneTime || 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12 border shadow-md hover:shadow-lg rounded-lg mb-20">
              <div className="bg-black bg-opacity-90 p-4 text-center text-sm md:text-lg text-gray-50 font-semibold rounded-t-lg">
                Users
              </div>
              <div className="flex justify-start items-center bg-white rounded-b-lg flex-wrap">
                <div className="h-full text-gray-500 font-semibold text-sm md:text-lg border-r w-full text-center">
                  <div className=" p-4 border-b">Subscribers</div>
                  <div className=" px-4 py-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-7xl font-thin">
                    {count.users || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
