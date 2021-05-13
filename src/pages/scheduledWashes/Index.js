import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";

import Layout from "../../components/Layout";
import {
  readScheduledWashes,
  deleteScheduledWash,
  clearScheduledWash,
} from "../../redux/actions/scheduledWashes";
import { readCities } from "../../redux/actions/city";
import { readBuildings } from "../../redux/actions/building";
import { readServices } from "../../redux/actions/services";
// import { readServices } from "../../redux/actions/services";
export default function Services({ history }) {
  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    (state) => state.scheduledWashesReducer
  );
  const servicesReducer = useSelector((state) => state.servicesReducer);
  const citiesReducer = useSelector((state) => state.citiesReducer);
  const buildingsReducer = useSelector((state) => state.buildingsReducer);
  console.log({ scheduledWashesReducer });
  useEffect(() => {
    dispatch(readScheduledWashes());
    dispatch(readServices());
    dispatch(readCities());
    dispatch(readBuildings());
  }, []);
  if (
    scheduledWashesReducer.loading ||
    servicesReducer.loading ||
    citiesReducer.loading ||
    buildingsReducer.loading
  ) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen ">
          <div className="relative w-24 h-24 ease-linear bg-black border-8 border-t-0 border-black rounded-full loader animate-spin">
            <div className="relative w-16 h-16 ease-linear transform bg-white border-8 border-t-0 border-white rounded-full loader Infinity animate-pulse">
              {/* <div className="relative w-10 h-10 ease-linear bg-black border-8 border-t-0 border-black rounded-full loader Infinity animate-spin">
                <div className="relative w-6 h-6 ease-linear -rotate-90 bg-black border-8 border-t-0 border-black rounded-full loader Infinity"></div>
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
          className="flex flex-col items-center w-full h-screen p-10 pb-20 overflow-y-auto transition-all "
        >
          <div className="flex flex-wrap items-center justify-between w-full transition-all select-none">
            <div className="flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all ">
              Scheduled Washes
              <div className="flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all">
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className="font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110">
                  Scheduled Washes
                </div>
              </div>
            </div>
            {/* <div
              onClick={() => history.push("/scheduledWashes/new")}
              style={{ backgroundColor: "#212121" }}
              className="px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="text-sm text-center text-white transition-all">
                Add new scheduledWash
              </div>
            </div> */}
          </div>

          <table className="w-full border-collapse shadow-lg table-auto hover:shadow-lg ">
            <thead>
              <tr>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Status
                </th>
                {/* <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Car
                </th> */}
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Color
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Parking Number
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  plate
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  City
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Building
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Date & Time
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Services
                </th>
                {/* <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {scheduledWashesReducer.scheduledWashes.map((scheduledWash) => (
                <tr className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0">
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Status
                    </span>
                    <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white uppercase bg-gray-600 lg:hidden flex items-center text-center justify-center rounded shadow-md hover:shadow-lg cursor-pointer transform transition hover:scale-105">
                      <FaEdit size="1.4rem" />
                    </span>
                    <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white uppercase bg-gray-600  lg:block flex items-center text-center justify-center rounded shadow-md hover:shadow-lg cursor-pointer transform transition hover:scale-105">
                      <FaEdit size="1.4rem" />
                    </span>
                    <span
                      className={`rounded ${
                        scheduledWash.type == "pending"
                          ? `text-red-400`
                          : `text-purple-400`
                      } py-1 px-3 text-xs font-bold`}
                    >
                      {scheduledWash.status}
                    </span>
                  </td>
                  {/*
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Car
                    </span>
                    <div className="flex justify-between items-center "> 
                    <div>{scheduledWash.car._id}</div>
                    <div className="flex items-center border px-2 py-1 rounded bg-black bg-opacity-70 hover:bg-opacity-80 shadow-md hover:shadow-lg cursor-pointer">
                        <CgDetailsMore size="1.4rem" className="text-gray-50" />
                        <div className="px-2 text-gray-50 text-sm">Details</div>
                      </div>
                   </div>
                  </td> */}
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Color
                    </span>

                    {/* <div className="flex justify-between items-center ">  */}
                    <div>{scheduledWash.car.color}</div>
                    {/* <div className="flex items-center border px-2 py-1 rounded bg-black bg-opacity-70 hover:bg-opacity-80 shadow-md hover:shadow-lg cursor-pointer">
                        <CgDetailsMore size="1.4rem" className="text-gray-50" />
                        <div className="px-2 text-gray-50 text-sm">Details</div>
                      </div> */}
                    {/* </div> */}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Parking Number
                    </span>
                    {/* <div className="flex justify-between items-center "> */}
                    <div>{scheduledWash.car.parkingNumber}</div>
                    {/* <div className="flex items-center border px-2 py-1 rounded bg-black bg-opacity-70 hover:bg-opacity-80 shadow-md hover:shadow-lg cursor-pointer">
                        <CgDetailsMore size="1.4rem" className="text-gray-50" />
                        <div className="px-2 text-gray-50 text-sm">Details</div>
                      </div> */}
                    {/* </div> */}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      plate
                    </span>
                    {/* <div className="flex justify-between items-center "> */}
                    <div>{scheduledWash.car.plate}</div>
                    {/* <div className="flex items-center border px-2 py-1 rounded bg-black bg-opacity-70 hover:bg-opacity-80 shadow-md hover:shadow-lg cursor-pointer">
                        <CgDetailsMore size="1.4rem" className="text-gray-50" />
                        <div className="px-2 text-gray-50 text-sm">Details</div>
                      </div> */}
                    {/* </div> */}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      City
                    </span>
                    {citiesReducer.cities.find(
                      (city) => city._id === scheduledWash.car.city
                    ) &&
                    citiesReducer.cities.find(
                      (city) => city._id === scheduledWash.car.city
                    ).label
                      ? citiesReducer.cities.find(
                          (city) => city._id === scheduledWash.car.city
                        ).label
                      : ""}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Building
                    </span>
                    {buildingsReducer.buildings.find(
                      (building) => building._id === scheduledWash.car.building
                    ) &&
                    buildingsReducer.buildings.find(
                      (building) => building._id === scheduledWash.car.building
                    ).label
                      ? buildingsReducer.buildings.find(
                          (building) =>
                            building._id === scheduledWash.car.building
                        ).label
                      : ""}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Date & Time
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                    >
                      {new Date(scheduledWash.date).toLocaleDateString()} -{" "}
                      {new Date(scheduledWash.date).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Services
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}
                    >
                      {scheduledWash.services
                        .filter((service) => service.count > 0)
                        .map(
                          (scheduledWash) =>
                            servicesReducer.services.find(
                              (service) => service._id === scheduledWash.service
                            ) &&
                            servicesReducer.services.find(
                              (service) => service._id === scheduledWash.service
                            ).label && (
                              <div className="flex items-center justify-center flex-wrap ">
                                <div className="flex items-center justify-between mt-1 font-bold text-gray-600 text-md">
                                  <span className="pr-2 font-bold text-gray-600">
                                    Service name:
                                  </span>
                                  <span className="pr-2 font-semibold text-gray-400">
                                    {
                                      servicesReducer.services.find(
                                        (service) =>
                                          service._id === scheduledWash.service
                                      ).label
                                    }
                                  </span>
                                </div>
                              </div>
                            )
                        )}
                    </span>
                  </td>

                  {/* <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Actions
                    </span>
                    <div className="flex items-center justify-evenly">
                      <div
                        onClick={() => {
                          dispatch(clearScheduledWash());
                          history.push(`/scheduledWashes/${scheduledWash._id}/edit`);
                        }}
                        className="text-blue-400 underline cursor-pointer hover:text-blue-600"
                      >
                        <FaEdit size="1.8rem" />
                      </div>
                      <div
                        onClick={() => {
                          dispatch(clearScheduledWash());
                          dispatch(deleteScheduledWash(scheduledWash._id));
                        }}
                        className="text-red-500 underline cursor-pointer hover:text-red-500"
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
