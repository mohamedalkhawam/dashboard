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
  updateScheduledWash,
} from "../../redux/actions/scheduledWashes";
import { readCities } from "../../redux/actions/city";
import { readBuildings } from "../../redux/actions/building";
import { readServices } from "../../redux/actions/services";
import { FiCheckCircle, FiCircle, FiDisc, FiSlash } from "react-icons/fi";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(readScheduledWashes())
      .then((result) => {
        setData(result.data.data);
      })
      .catch((err) => {});
    dispatch(readServices());
    dispatch(readCities());
    dispatch(readBuildings());
  }, []);
  const [query, setQuery] = useState({
    service: "all",
    city: "all",
    building: "all",
  });
  console.log({ data });
  if (
    scheduledWashesReducer.loading ||
    servicesReducer.loading ||
    citiesReducer.loading ||
    data.length === 0 ||
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
          </div>
          <div className="flex items-center justify-between w-full my-3">
            <select
              className="p-2 py-1 border rounded shadow"
              value={query.service}
              onChange={(e) => {
                setQuery({
                  service: e.target.value,
                  city: "all",
                  building: "all",
                });
                setData(
                  e.target.value === "all"
                    ? scheduledWashesReducer.scheduledWashes
                    : scheduledWashesReducer.scheduledWashes.filter((d) =>
                        d.services.find(
                          (service) => service.service === e.target.value
                        )
                      )
                );
              }}
            >
              <option value="all">Service</option>
              {servicesReducer.services.map((service) => (
                <option value={service._id}>{service.name}</option>
              ))}
            </select>
            <select
              className="p-2 py-1 border rounded shadow"
              value={query.city}
              onChange={(e) => {
                setQuery({
                  service: "all",
                  city: e.target.value,
                  building: "all",
                });

                setData(
                  e.target.value === "all"
                    ? scheduledWashesReducer.scheduledWashes
                    : scheduledWashesReducer.scheduledWashes.filter(
                        (d) => d.car && d.car.city === e.target.value
                      )
                );
              }}
            >
              <option value="all">City</option>

              {citiesReducer.cities.map((city) => (
                <option value={city._id}>{city.name}</option>
              ))}
            </select>

            <select
              className="p-2 py-1 border rounded shadow"
              value={query.building}
              onChange={(e) => {
                setQuery({
                  service: "all",
                  city: "all",
                  building: e.target.value,
                });

                setData(
                  e.target.value === "all"
                    ? scheduledWashesReducer.scheduledWashes
                    : scheduledWashesReducer.scheduledWashes.filter(
                        (d) => d.car && d.car.building === e.target.value
                      )
                );
              }}
            >
              <option value="all">Building</option>

              {query.city !== "all"
                ? buildingsReducer.buildings.map((building) => (
                    <option value={building._id}>{building.name}</option>
                  ))
                : buildingsReducer.buildings.map((building) => (
                    <option value={building._id}>{building.name}</option>
                  ))}
            </select>
            {/* <select className='p-2 py-1 border rounded shadow'>
              <option value='sort'>Sort</option>
              <option value='filter'>Filter</option>
            </select> */}
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
                  Color
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Type
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
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.reverse().map((scheduledWash, index) => (
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
                    <span
                      className={`rounded ${
                        scheduledWash.status === "completed"
                          ? `text-blue-600`
                          : scheduledWash.status === "progress"
                          ? `text-green-600`
                          : scheduledWash.status === "reject"
                          ? `text-red-600`
                          : "text-gray-600"
                      } py-1 px-3 text-xs font-bold`}
                    >
                      {scheduledWash.status}
                    </span>
                  </td>

                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Color
                    </span>

                    <div>
                      {scheduledWash.car !== null
                        ? scheduledWash.car.color
                        : ""}
                    </div>
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Type
                    </span>

                    <div>{scheduledWash.type}</div>
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Parking Number
                    </span>
                    <div>
                      {scheduledWash.car !== null
                        ? scheduledWash.car.parkingNumber
                        : ""}
                    </div>
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      plate
                    </span>
                    <div>
                      {scheduledWash.car !== null
                        ? scheduledWash.car.plate
                        : ""}
                    </div>
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      City
                    </span>
                    {scheduledWash.car !== null
                      ? citiesReducer.cities.find(
                          (city) => city._id === scheduledWash.car.city
                        ) &&
                        citiesReducer.cities.find(
                          (city) => city._id === scheduledWash.car.city
                        ).label
                        ? citiesReducer.cities.find(
                            (city) => city._id === scheduledWash.car.city
                          ).label
                        : ""
                      : ""}
                  </td>
                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Building
                    </span>
                    {scheduledWash.car !== null
                      ? buildingsReducer.buildings.find(
                          (building) =>
                            building._id === scheduledWash.car.building
                        ) &&
                        buildingsReducer.buildings.find(
                          (building) =>
                            building._id === scheduledWash.car.building
                        ).label
                        ? buildingsReducer.buildings.find(
                            (building) =>
                              building._id === scheduledWash.car.building
                          ) &&
                          buildingsReducer.buildings.find(
                            (building) =>
                              building._id === scheduledWash.car.building
                          ).label
                        : ""
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
                            ).name && (
                              <div className="flex flex-wrap items-center justify-center ">
                                <div className="flex items-center justify-between mt-1 font-bold text-gray-600 text-md">
                                  <span className="pr-2 font-semibold text-gray-400">
                                    {
                                      servicesReducer.services.find(
                                        (service) =>
                                          service._id === scheduledWash.service
                                      ).name
                                    }
                                  </span>
                                </div>
                              </div>
                            )
                        )}
                    </span>
                  </td>

                  <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static">
                    <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                      Action
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500 flex justify-between items-center`}
                    >
                      <div
                        onClick={() =>
                          dispatch(
                            updateScheduledWash({
                              _id: scheduledWash._id,
                              status: "reject",
                            })
                          )
                            .then((result) => {
                              setData(
                                data.map((d) =>
                                  d._id === result.data.data._id
                                    ? result.data.data
                                    : { ...d }
                                )
                              );
                            })
                            .catch((err) => {})
                        }
                      >
                        <FiSlash className="mx-1 text-xl text-red-500 cursor-pointer" />
                      </div>
                      <div
                        onClick={() =>
                          dispatch(
                            updateScheduledWash({
                              _id: scheduledWash._id,
                              status: "progress",
                            })
                          )
                            .then((result) => {
                              setData(
                                data.map((d) =>
                                  d._id === result.data.data._id
                                    ? result.data.data
                                    : { ...d }
                                )
                              );
                            })
                            .catch((err) => {})
                        }
                      >
                        <FiDisc className="mx-1 text-xl text-green-500 cursor-pointer" />
                      </div>
                      <div
                        onClick={() =>
                          dispatch(
                            updateScheduledWash({
                              _id: scheduledWash._id,
                              status: "completed",
                            })
                          )
                            .then((result) => {
                              setData(
                                data.map((d) =>
                                  d._id === result.data.data._id
                                    ? result.data.data
                                    : { ...d }
                                )
                              );
                            })
                            .catch((err) => {})
                        }
                      >
                        <FiCheckCircle className="mx-1 text-xl text-blue-500 cursor-pointer" />
                      </div>
                    </span>
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
