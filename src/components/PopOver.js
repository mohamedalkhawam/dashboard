import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScheduledWashStatus } from "../redux/actions/scheduledWashes";
import { createNotifications } from "../redux/actions/notifications";
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
  const [notification, setNotification] = useState({
    title: "",
    subTitle: "",
    body: "",
  });
  const handleClose = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };
  const setDefaultNotification = () => {
    switch (choosedStatus) {
      case "rejected":
        setNotification({
          title: "dsfdfsdf",
          subTitle: "sadasd",
          body: "sdsad",
        });
        break;
      case "accepted":
        setNotification({
          title: "dsfdfsdf",
          subTitle: "sadasd",
          body: "sdsad",
        });
        break;
      case "progress":
        setNotification({
          title: "dsfdfsdf",
          subTitle: "sadasd",
          body: "sdsad",
        });
        break;
      case "completed":
        setNotification({
          title: "dsfdfsdf",
          subTitle: "sadasd",
          body: "sdsad",
        });
        break;
      case "notFound":
        setNotification({
          title: "dsfdfsdf",
          subTitle: "sadasd",
          body: "sdsad",
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setDefaultNotification();
  }, [choosedStatus]);
  useEffect(() => {
    if (confirmed) {
      dispatch(
        updateScheduledWashStatus({
          _id: id,
          status: choosedStatus,
          notification,
        })
      )
        .then((result) => {
          dispatch(
            createNotifications({
              title: notification.title,
              subTitle: notification.subTitle,
              body: notification.body,
              createdBy: result.data.data.createdBy,
            })
          );
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
        <div className=" z-50 w-92  bg-gray-50  rounded shadow">
          <div className="flex justify-between items-center border-b  p-4">
            <div className="text-2xl font-semibold text-gray-500">
              Confirmation
            </div>
            <div onClick={() => setOpenModal(false)}>
              <AiOutlineCloseCircle className=" text-2xl text-red-600 cursor-pointer  hover:text-red-700" />
            </div>
          </div>
          <div className="border-b ">
            <div className="text-md font-medium text-gray-500 text-left  h-auto px-4 py-4">
              Are you sure you want to change the schedule to
              <span className="font-bold capitalize">"{choosedStatus}"</span> ?
              <div>
                <div className="my-5">
                  Notification Title:
                  <input
                    placeholder={"Notification Title"}
                    value={notification.title}
                    type="text"
                    name="title"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    className="w-full p-3 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none my-1"
                  />
                  <small className="text-red-600"></small>
                </div>
                <div className="my-5">
                  Notification SubTitle
                  <input
                    placeholder={"Notification Subtitle"}
                    value={notification.subTitle}
                    type="text"
                    name="subTitle"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    className="w-full p-3 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none my-1"
                  />
                  <small className="text-red-600"></small>
                </div>
                <div className="my-5">
                  Notification Body
                  <input
                    placeholder={"Notification Body"}
                    value={notification.body}
                    type="text"
                    name="body"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    className="w-full p-3 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none my-1"
                  />
                  <small className="text-red-600"></small>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-between items-center h-12 ">
            <div
              onClick={() => setOpenModal(false)}
              className="text-md border flex items-center justify-center h-full font-bold 
              text-gray-500  cursor-pointer shadow-md hover:shadow-lg
             bg-gray-100 hover:bg-gray-200 bg-opacity-80  rounded   w-1/2 "
            >
              Close
            </div>
            <div
              onClick={() => {
                setConfirmed(true);
                setOpenModal(false);
              }}
              className="text-md   flex items-center justify-center font-bold h-full text-gray-50 w-1/2 
            cursor-pointer shadow-md hover:shadow-lg bg-black
              hover:bg-opacity-90 bg-opacity-80 rounded
              "
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
