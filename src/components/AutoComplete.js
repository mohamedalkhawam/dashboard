/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "#666",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9995",
      borderWidth: 2,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9995",
      borderWidth: 2,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#212121",
      borderWidth: 2,
    },
    "&$focusedLabel": {
      color: "#9995",
    },
  },
}));
export default function ComboBox({ data, value }) {
  const [choice, setChoice] = useState("_id");
  const classes = useStyles();
  return (
    <div className="w-full">
      <div className="flex items-center flex-wrap user-select-none">
        <div
          onClick={() => setChoice("_id")}
          className={`text-center w-24 py-2 text-md ${
            choice === "_id"
              ? `bg-black bg-opacity-80 text-gray-50 hover:bg-opacity-100`
              : `text-gray-500 bg-white border hover:border-gray-200`
          }  rounded-md border user-select-none shadow-md hover:shadow-lg cursor-pointer my-4 mr-4 font-semibold `}
        >
          ID
        </div>
        <div
          onClick={() => setChoice("type")}
          className={`text-center w-24 py-2 text-md ${
            choice === "type"
              ? `bg-black bg-opacity-80 text-gray-50 hover:bg-opacity-100`
              : `text-gray-500 bg-white border hover:border-gray-200 `
          }  rounded-md border user-select-none shadow-md hover:shadow-lg cursor-pointer my-4 mr-4 font-semibold `}
        >
          Type
        </div>
        <div
          onClick={() => setChoice("status")}
          className={`text-center w-24 py-2 text-md ${
            choice === "status"
              ? `bg-black bg-opacity-80 text-gray-50 hover:bg-opacity-100`
              : `text-gray-500 bg-white border hover:border-gray-200`
          }  rounded-md border user-select-none  shadow-md hover:shadow-lg cursor-pointer my-4 mr-4 font-semibold `}
        >
          Status
        </div>
        {/* <div
          onClick={() => setChoice("price")}
          className={`text-center w-24 py-2 text-md ${
            choice === "price"
              ? `bg-black bg-opacity-80 text-gray-50 hover:bg-opacity-100`
              : `text-gray-500 bg-white border hover:border-gray-200`
          }  rounded-md border shadow-md hover:shadow-lg cursor-pointer my-4 mr-4 font-semibold `}
        >
          Total Paid
        </div> */}
        {/* <div
          onClick={() => setChoice("createdAt")}
          className={`text-center w-24 py-2 text-md ${
            choice === "createdAt"
              ? `bg-black bg-opacity-80 text-gray-50 hover:bg-opacity-100`
              : `text-gray-500 bg-white border hover:border-gray-200`
          }  rounded-md border shadow-md hover:shadow-lg cursor-pointer my-4 mr-4 font-semibold `}
        >
          Date
        </div> */}
      </div>
      <Autocomplete
        id="combo-box-demo"
        options={data || []}
        selectOnFocus
        clearOnBlur
        autoHighlight
        handleHomeEndKeys
        loading
        autoComplete
        loadingText={"Not found... "}
        getOptionLabel={(option) => {
          if (choice === "date") {
            return toString(new Date(option[`${choice}`]).toLocaleDateString());
          }
          return option[`${choice}`];
        }}
        renderOption={(option, state) => {
          return (
            <div className="py-2">
              <div className="flex items-between  items-center flex-wrap w-full   ">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-500 text-sm">ID:</div>
                  <div className="font-thin text-gray-400 text-sm px-2">
                    {option._id}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-500 text-sm">
                    Type:
                  </div>
                  <div className="font-thin text-gray-400 text-sm px-2">
                    {option.type}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-500 text-sm px-2">
                    Status:
                  </div>
                  <div className="font-thin text-gray-400 text-sm px-2">
                    {option.status}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-500 text-sm px-2">
                    Total Paid:
                  </div>
                  <div className="font-thin text-gray-400 text-sm px-2">
                    {option.price}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-500 text-sm px-2">
                    Date:
                  </div>
                  <div className="font-thin text-gray-400 text-sm">
                    {new Date(option.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
        onChange={(e, state) => {
          if (value) {
            value([state === null ? {} : state]);
          }
        }}
        style={{ width: "100%" }}
        classes={classes}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            variant="outlined"
            style={{ width: "100%" }}
            InputLabelProps={{
              style: { color: "#777" },
            }}
            className="shadow hover:shadow-md hover:outline-none active:outline-none hover:border-none border-none bg-white"
          />
        )}
      />
    </div>
  );
}
