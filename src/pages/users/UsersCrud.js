import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import {
  readUsers,
  readOneUser,
  updateUser,
  createUser,
} from "../../redux/actions/user";
import {
  creteSchema,
  editSchema,
  validator,
} from "../../validation/userSchema";
import _objO from "../../utils/_objO";
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    roles: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneUser(match.params.id))
        .then((res) => {
          setFormData({ ...formData, ...res.data });
          console.log({ res: res.data });
        })
        .catch((err) => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    setErrorValidation({});
  }, []);
  useEffect(() => {
    if (!match.params.id || formData.password.length > 0) {
      validator(
        creteSchema,
        {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
        },
        setErrorValidation
      );
    } else if (match.params.id) {
      validator(
        editSchema,
        {
          userName: formData.userName,
          email: formData.email,
        },
        setErrorValidation
      );
    }
  }, [formData, match.params.id]);
  console.log({ userReducer });
  const onUserSubmit = async (e) => {
    debugger;
    e.preventDefault();
    if (!match.params.id && _objO(errorValidation)) {
      dispatch(
        createUser({
          id: formData.id,
          userName: formData.userName,
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      ).then((res) => history.push(`/users`));
    } else if (match.params.id && _objO(errorValidation)) {
      formData.password.length > 0
        ? dispatch(
            updateUser({
              id: formData.id,
              userName: formData.userName,
              email: formData.email,
              password: formData.password,
            })
          ).then((res) => history.push(`/users`))
        : dispatch(
            updateUser({
              id: formData.id,
              userName: formData.userName,
              email: formData.email,
            })
          ).then((res) => history.push(`/users`));
    } else {
      console.log("error");
    }
  };
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
      <Layout parentClassName={" "}>
        <div
          style={{ backgroundColor: "#F8F8F8" }}
          className="p-10 h-full w-full transition-all"
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
                <div className="px-3 font-medium">{`->`}</div>
                <div className=" font-medium cursor-pointer hover:text-gray-600 transform transition-all hover:scale-110 duration-100">
                  New User
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="bg-white shadow-md hover:shadow-lg rounded border px-14 py-16">
            <div>
              <input
                placeholder={"User Name"}
                value={formData.userName}
                type="text"
                name="userName"
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full my-5 font-normal border shadow p-4 outline-none rounded-md  focus:outline-none text-gray-600"
              />
              {/* {errorValidation && errorValidation.userName} */}
            </div>
            <div>
              <input
                name="email"
                value={formData.email}
                type="email"
                placeholder={"Email"}
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full my-5 font-normal border shadow p-4 outline-none rounded-md focus:outline-none text-gray-600"
              />
              {errorValidation && errorValidation.email}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full my-5 font-normal border shadow p-4 outline-none rounded-md  focus:outline-none text-gray-600"
              />
            </div>
            <div>
              <input
                type="password"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                placeholder="Confirm Password"
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full my-5 font-normal border shadow p-4 outline-none rounded-md  focus:outline-none text-gray-600"
              />
            </div>
            <div>
              <select
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  onChange(e);
                }}
                className="w-full my-5 font-normal border shadow p-4 outline-none rounded-md  focus:outline-none text-gray-600"
              >
                <option>Select a role </option>
              </select>
            </div>
            <div className="w-full flex items-center justify-center">
              <div
                onClick={(e) => onUserSubmit(e)}
                style={{ backgroundColor: "#212121" }}
                className={` ${
                  userReducer.loading ? `animate-pulse` : ``
                }  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
