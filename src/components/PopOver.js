import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScheduledWashStatus } from "../redux/actions/scheduledWashes";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import _objI from "../utils/_objI";
export default function MyPopover({ id, setData, data }) {
  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    (state) => state.scheduledWashesReducer
  );
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [choosedStatus, setChoosedStatus] = useState("");
  const handleClose = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  const handleConfirmed = async (status) => {
    if (confirmed) {
      return dispatch(
        updateScheduledWashStatus({
          _id: id,
          status: status,
        })
      );
    }
  };
  useEffect(() => {
    if (confirmed) {
      dispatch(
        updateScheduledWashStatus({
          _id: id,
          status: choosedStatus,
        })
      )
        .then((result) => {
          if (setData && data) {
            setData(
              data.map((d) =>
                d._id === result.data.data._id ? result.data.data : { ...d }
              )
            );
          }
        })
        .catch((err) => {});
    }
  }, [confirmed]);
  return (
    <>
      <div
        style={{ zIndex: 1001 }}
        className={`fixed ${
          openModal ? `flex` : `hidden`
        }  h-screen w-screen top-0 bottom-0 left-0 right-0   items-center justify-center bg-black bg-opacity-60`}
      >
        <div className=" z-50 w-96  bg-gray-50  rounded shadow">
          <div className="flex justify-between items-center border-b  p-4">
            <div className="text-2xl font-semibold text-gray-500">
              Confirmation
            </div>
            <div onClick={() => setOpenModal(false)}>
              <AiOutlineCloseCircle className=" text-2xl text-red-600 cursor-pointer  hover:text-red-700" />
            </div>
          </div>
          <div className="border-b ">
            <div className="text-lg font-medium text-gray-500 text-left  h-24 px-4 py-4">
              Are you sure you want to change status!?
            </div>
          </div>
          <div className=" flex justify-between items-center h-14 ">
            <div
              onClick={() => setOpenModal(false)}
              className="text-md border items-center h-full font-semibold 
              text-gray-500  cursor-pointer shadow-md hover:shadow-lg
             bg-gray-100 hover:bg-gray-200 bg-opacity-80 px-5 py-4   w-1/2 "
            >
              Close
            </div>
            <div
              onClick={() => {
                setConfirmed(true);
                setOpenModal(false);
              }}
              className="text-md  items-center font-semibold h-full text-gray-50 w-1/2 
            cursor-pointer shadow-md hover:shadow-lg bg-black
              hover:bg-opacity-95 bg-opacity-80
              px-5 py-4 "
            >
              Confirm
            </div>
          </div>
        </div>
      </div>
      <div className="relative cursor-pointer transition-all duration-500 -right-3">
        <div
          onClick={() => {
            handleClose();
          }}
          className="bg-black bg-opacity-80 z-40  hover:bg-opacity-95 shadow-md hover:shadow-7xl px-2 py-1 text-lg border rounded-lg flex justify-center items-center"
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
                setOpenModal(true);
                setChoosedStatus("rejected");
                handleClose();
              }}
              className="py-3 border-b hover:bg-red-200 rounded-b-lg text-md flex justify-center items-center"
            >
              <div className="">Reject</div>
            </div>
            <div
              onClick={() => {
                handleClose();
                setChoosedStatus("accepted");
                setOpenModal(true);
              }}
              className="py-3 border-b hover:bg-blue-200 rounded-lg text-md flex justify-center items-center "
            >
              <div className="">Accepted</div>
            </div>
            <div
              onClick={() => {
                handleClose();
                setChoosedStatus("progress");
                setOpenModal(true);
              }}
              className="py-3 border-b hover:bg-green-200 rounded-lg text-md flex justify-center items-center "
            >
              <div className="">In-Progress</div>
            </div>
            <div
              onClick={() => {
                handleClose();
                setChoosedStatus("completed");
                setOpenModal(true);
              }}
              className="py-3 border-b hover:bg-indigo-200 rounded-lg text-md flex justify-center items-center "
            >
              <div className="">Completed</div>
            </div>
            <div
              onClick={() => {
                handleClose();
                setChoosedStatus("notFound");
                setOpenModal(true);
              }}
              className="py-3 border-b hover:bg-pink-200 rounded-lg  text-  text-md flex justify-center items-center "
            >
              <div className="">Car not found</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
