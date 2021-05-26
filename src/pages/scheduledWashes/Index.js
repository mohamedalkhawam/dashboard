import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Layout from "../../components/Layout";
import { readScheduledWashes } from "../../redux/actions/scheduledWashes";
import { readCities } from "../../redux/actions/city";
import { readCars } from "../../redux/actions/cars";
import { readAllUsers } from "../../redux/actions/user";
import { readBuildings } from "../../redux/actions/building";
import { readServices } from "../../redux/actions/services";
import Spinner from "../../components/Spinner";
import PopOver from "../../components/PopOver";
import _objI from "../../utils/_objI";
import ImageViewer from "../../components/viewImage";
export default function Services({ history }) {
  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    (state) => state.scheduledWashesReducer
  );
  const [model, setModel] = useState({});
  const servicesReducer = useSelector((state) => state.servicesReducer);
  const citiesReducer = useSelector((state) => state.citiesReducer);
  const buildingsReducer = useSelector((state) => state.buildingsReducer);
  const userReducer = useSelector((state) => state.userReducer);
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
    dispatch(readAllUsers());
  }, []);
  const [query, setQuery] = useState({
    service: "all",
    city: "all",
    building: "all",
    status: "all",
  });
  console.log({ data });
  if (
    scheduledWashesReducer.loading ||
    servicesReducer.loading ||
    citiesReducer.loading ||
    buildingsReducer.loading ||
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
          <div
            style={{ zIndex: 1001 }}
            className="fixed  h-screen w-screen top-0 bottom-0 left-0 right-0  flex items-center justify-center bg-black bg-opacity-60"
          >
            <div className="relative z-50 w-6/12 p-6 bg-gray-50 border rounded shadow">
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
                          {typeof value === "object" && value !== null ? (
                            value.name
                          ) : key === "image" ? (
                            <ImageViewer id={value} />
                          ) : (
                            value
                          )}
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
          className="flex flex-col items-center w-full h-screen p-10 pb-20 transition-all overflow-y-scroll"
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
          <div className="flex items-center justify-start w-full my-3 flex-wrap ">
            <select
              className="p-2 py-1 border rounded shadow m-2"
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
              className="p-2 py-1 border rounded shadow m-2"
              value={query.city}
              onChange={(e) => {
                setQuery({
                  service: "all",
                  city: e.target.value,
                  building: "all",
                  status: "all",
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
              className="p-2 py-1 border rounded shadow m-2"
              value={query.building}
              onChange={(e) => {
                setQuery({
                  service: "all",
                  city: "all",
                  building: e.target.value,
                  status: "all",
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
            <select
              className="p-2 py-1 border rounded shadow m-2"
              value={query.status}
              onChange={(e) => {
                setQuery({
                  service: "all",
                  city: "all",
                  status: e.target.value,
                  building: "all",
                });

                setData(
                  e.target.value === "all"
                    ? scheduledWashesReducer.scheduledWashes
                    : scheduledWashesReducer.scheduledWashes.filter(
                        (d) => d.status === e.target.value
                      )
                );
              }}
            >
              <option value="all">Status</option>
              <option value={"pending"}>Pending</option>
              <option value={"rejected"}>Rejected</option>
              <option value={"accepted"}>Accepted</option>
              <option value={"progress"}>In-progress</option>
              <option value={"completed"}>Completed</option>
              <option value={"notFound"}>Car not found</option>
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
                  Car
                </th>
                <th className="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell">
                  User
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
              {[...data]
                .reverse()
                .filter((item) =>
                  query.status === "all"
                    ? item.status !== "completed" &&
                      item.status !== "rejected" &&
                      item.status !== "notFound" &&
                      item.status !== "reject"
                    : query.status === item.status
                )
                .map((scheduledWash, index) => (
                  <tr className="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0">
                    <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                      <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                        #
                      </span>

                      <div>{index + 1}</div>
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
                            : scheduledWash.status === "rejected"
                            ? `text-red-600`
                            : "text-gray-600"
                        } py-1 px-3 text-xs font-bold`}
                      >
                        {scheduledWash.status}
                      </span>
                    </td>

                    <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                      <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                        Car
                      </span>

                      <div
                        onClick={() => setModel(scheduledWash.car || {})}
                        className="px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer"
                      >
                        {scheduledWash.car ? "Info" : "No car"}
                      </div>
                    </td>
                    <td className="relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static ">
                      <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden">
                        User
                      </span>

                      <div>
                        {userReducer.users.map((user) =>
                          scheduledWash.createdBy === user._id ? (
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
                      </div>
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
                                (service) =>
                                  service._id === scheduledWash.service
                              ) &&
                              servicesReducer.services.find(
                                (service) =>
                                  service._id === scheduledWash.service
                              ).name && (
                                <div className="flex flex-wrap items-center justify-center ">
                                  <div className="flex items-center justify-between mt-1 font-bold text-gray-600 text-md">
                                    <span className="pr-2 font-semibold text-gray-400">
                                      {
                                        servicesReducer.services.find(
                                          (service) =>
                                            service._id ===
                                            scheduledWash.service
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
                        className={`rounded py-1 px-3 text-xs font-semibold text-gray-500 flex justify-end items-center`}
                      >
                        <PopOver
                          id={scheduledWash._id}
                          setData={setData}
                          data={data}
                        />
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
