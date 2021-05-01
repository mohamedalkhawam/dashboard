import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import {
  updateRole,
  readRoles,
  deleteRole,
  clearRole,
  readOneRole,
  createRole,
} from "../../redux/actions/roles";

import _objO from "../../utils/_objO";
import _objI from "../../utils/_objI";
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const rolesReducer = useSelector((state) => state.rolesReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    label: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneRole(match.params.id))
        .then((res) => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data });
        })
        .catch((err) => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readRoles());
  }, []);
  //   useEffect(() => {
  //     setErrorValidation({});
  //   }, []);
  //   useEffect(() => {
  //     if (!match.params.id || formData.password.length > 0) {
  //       validator(
  //         creteSchema,
  //         {
  //           userName: formData.userName,
  //           email: formData.email,
  //           password: formData.password,
  //           passwordConfirmation: formData.passwordConfirmation,
  //         },
  //         setErrorValidation
  //       );
  //     } else if (match.params.id) {
  //       validator(
  //         editSchema,
  //         {
  //           // userName: formData.userName,
  //           email: formData.email,
  //         },
  //         setErrorValidation
  //       );
  //     }
  //   }, [formData, match.params.id]);

  const onUserSubmit = async (e) => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createRole({
          name: formData.name,
          label: formData.label,
        })
      ).then((res) => history.push(`/roles`));
    } else if (match.params.id) {
      dispatch(
        updateRole({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
        })
      ).then((res) => history.push(`/roles`));
    } else {
      console.log("error");
    }
  };
  if (rolesReducer.loading) {
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
      <Layout parentClassName={" "}>
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="p-10 h-full w-full transition-all overflow-y-auto"
        >
          <div className="flex justify-between items-center  select-none  w-full flex-wrap transition-all">
            <div className=" text-4xl  text-gray-500 text-left font-normal my-10 flex-grow transition-all">
              Services
              <div className="flex items-center w-full text-left text-sm mt-4 text-gray-500 transition-all">
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100  ">
                  Dashboard
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100">
                  Services
                </div>
                <div className="px-3 font-medium">{`->`}</div>
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100">
                  New service
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="bg-white shadow-md hover:shadow-lg rounded border px-14 py-16 ">
            <div className="my-5">
              <input
                placeholder={"Name"}
                value={formData.name}
                type="text"
                name="name"
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full  font-normal border shadow p-4 outline-none rounded-md  focus:outline-none text-gray-600"
              />
              <small className="text-red-600"></small>
            </div>
            <div className="my-5">
              <input
                name="label"
                value={formData.label}
                type="email"
                placeholder={"Label"}
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full font-normal border shadow p-4 outline-none rounded-md focus:outline-none text-gray-600"
              />
              <small className="text-red-600"></small>
            </div>

            <div className="w-full flex items-center justify-center">
              <div
                // disabled={_objI(errorValidation)}
                onClick={(e) => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? "#666" : "#212121",
                  borderColor: "#212121",
                }}
                className={` ${rolesReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}
              >
                {rolesReducer.loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 absolute border-white rounded-full border-r-2 left-3"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  ""
                )}
                Save
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
