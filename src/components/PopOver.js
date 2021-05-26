import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScheduledWashStatus } from "../redux/actions/scheduledWashes";
import {
  FiCheckCircle,
  FiCircle,
  FiDisc,
  FiSlash,
  FiMoreHorizontal,
} from "react-icons/fi";
import _objI from "../utils/_objI";
export default function MyPopover({ id, setData, data }) {
  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    (state) => state.scheduledWashesReducer
  );
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  return (
    <div className="relative cursor-pointer transition-all duration-500 -right-3">
      <div
        onClick={() => {
          handleClose();
        }}
        className="bg-black bg-opacity-80   hover:bg-opacity-95 shadow-md hover:shadow-7xl px-2 py-1 text-lg border rounded-lg flex justify-center items-center"
      >
        <FiMoreHorizontal size="1.5rem" className="text-gray-50" />
      </div>
      <div
        style={{ zIndex: 1000 }}
        className={`${
          open === true ? `block` : ` hidden`
        } absolute bg-gray-50 rounded-lg   select-none  w-32  -top-2 -left-36   transition-all duration-500 shadow-md hover:shadow-lg`}
      >
        <div className="rounded-lg ">
          <div className="py-3 border-b bg-black bg-opacity-80  rounded-t-lg cursor-default  text-md flex justify-center items-center">
            <div className="cursor-default text-gray-50">Change Status</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: "rejected",
                })
              )
                .then((result) => {
                  if (setData && data) {
                    setData(
                      data.map((d) =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch((err) => {});
            }}
            className="py-3 border-b hover:bg-red-200 rounded-b-lg text-md flex justify-center items-center"
          >
            <div className="">Reject</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: "accepted",
                })
              )
                .then((result) => {
                  if (setData && data) {
                    setData(
                      data.map((d) =>
                        d._id === result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch((err) => {});
            }}
            className="py-3 border-b hover:bg-blue-200 rounded-lg text-md flex justify-center items-center "
          >
            <div className="">Accepted</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: "progress",
                })
              )
                .then((result) => {
                  if (setData && data) {
                    setData(
                      data.map((d) =>
                        d._id === result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch((err) => {});
            }}
            className="py-3 border-b hover:bg-green-200 rounded-lg text-md flex justify-center items-center "
          >
            <div className="">In-Progress</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: "completed",
                })
              )
                .then((result) => {
                  if (setData && data) {
                    setData(
                      data.map((d) =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch((err) => {});
            }}
            className="py-3 border-b hover:bg-indigo-200 rounded-lg text-md flex justify-center items-center "
          >
            <div className="">Completed</div>
          </div>
          <div
            onClick={() => {
              handleClose();

              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: "notFound",
                })
              )
                .then((result) => {
                  if (setData && data) {
                    setData(
                      data.map((d) =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch((err) => {});
            }}
            className="py-3 border-b hover:bg-pink-200 rounded-lg  text-  text-md flex justify-center items-center "
          >
            <div className="">Car not found</div>
          </div>
        </div>
      </div>
    </div>
  );
}
