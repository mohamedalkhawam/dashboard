import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainColor, background } from "../../styles/mainColors";
import { schema, validator } from "../../validation/loginSchema";
import _objO from "../../utils/_objO";
import { loginUser, loadUser } from "../../redux/actions/auth";
import { useHistory } from "react-router-dom";
export default function Login({ toggleEvent, toggle }) {
  const [errorValidation, setErrorValidation] = useState({});
  const [toggleLogin, setToggleLoggin] = useState(toggle ? toggle : false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  useEffect(() => {
    validator(
      schema,
      {
        email: formData.email,
        password: formData.password,
      },
      setErrorValidation
    );
  }, [formData]);
  useEffect(() => {
    setToggleLoggin(toggle);
  }, [toggle]);
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    if (_objO(errorValidation)) {
      console.log(formData);
      dispatch(loginUser(formData))
        .then((res) => {
          if (res.status === 200) {
            dispatch(loadUser()).then((res) => {
              if (res.status === 200) {
                history.push("/");
              } else {
                return;
              }
            });
          }
        })
        .catch((err) => console.log({ err }));
    }
  };
  return (
    <div
      className={`signUp absolute  bg-white shadow-md hover:shadow-lg w-11/12 sm:w-96 px-5 rounded   border max-w-screen  hoverflow-hidden  ${
        toggleLogin ? `` : `inactive-sx`
      } active-sx`}
    >
      <div
        style={{ backgroundColor: mainColor }}
        className={`
             shadow-lg  mt-4 border rounded p-3 text-white font-semibold text-center text-lg`}
      >
        Login
      </div>
      <div className="my-2">
        <div className="py-1 font-medium text-gray-700">Email:</div>
        <input
          type="email"
          placeholder="Email"
          autocomplete={false}
          reqired
          name="email"
          value={formData.email}
          onChange={(e) => {
            onChange(e);
          }}
          onClick={() => setTouched({ ...touched, email: true })}
          className="w-full py-3 border rounded bg-white px-2 outline-none focus:outline-none focus:border-black shadow-md "
        />
        {touched.email && errorValidation.email ? (
          <p className="text-red-500 text-xs  ">{errorValidation.email}</p>
        ) : (
          ""
        )}
      </div>
      <div className="my-2">
        <div className="py-1 font-medium text-gray-700">Password:</div>
        <input
          onClick={() => setTouched({ ...touched, password: true })}
          type="password"
          name="password"
          placeholder="Password"
          reqired
          value={formData.password}
          onChange={(e) => onChange(e)}
          className="w-full py-3 border rounded bg-white  px-2 outline-none focus:outline-none focus:border-black shadow-md"
        />
        {touched.password && errorValidation.password ? (
          <p className="text-red-500 text-xs  ">{errorValidation.password}</p>
        ) : (
          ""
        )}
      </div>
      <div
        style={{ color: mainColor }}
        className="text-sm text-green-800 cursor-pointer underline"
        onClick={() => (toggleEvent ? toggleEvent(false) : null)}
      >
        Forgat your password?
      </div>
      <div className="w-full flex justify-center items-center  px-4 py-6">
        <button
          onClick={submit}
          style={{ backgroundColor: mainColor, borderColor: mainColor }}
          className=""
          disabled={touched.password && errorValidation.password}
          className={`  border
                 px-8 py-2 border-green-700 rounded shadow-md hover:shadow-lg outline-none focus:outline-none  bg-green-600 text-white hover:bg-green-700 `}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
