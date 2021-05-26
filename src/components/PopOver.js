import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateScheduledWashStatus } from '../redux/actions/scheduledWashes';
import {
  FiCheckCircle,
  FiCircle,
  FiDisc,
  FiSlash,
  FiMoreHorizontal,
} from 'react-icons/fi';
import _objI from '../utils/_objI';
export default function MyPopover({ id, setData, data }) {
  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    state => state.scheduledWashesReducer
  );
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  return (
    <div className='relative transition-all duration-500 cursor-pointer -right-3'>
      <div
        onClick={() => {
          handleClose();
        }}
        className='flex items-center justify-center px-2 py-1 text-lg bg-black border rounded-lg shadow-md bg-opacity-80 hover:bg-opacity-95 hover:shadow-7xl'>
        <FiMoreHorizontal size='1.5rem' className='text-gray-50' />
      </div>
      <div
        style={{ zIndex: 1000 }}
        className={`${
          open === true ? `block` : ` hidden`
        } absolute bg-gray-50 rounded-lg   select-none  w-32  -top-2 -left-36   transition-all duration-500 shadow-md hover:shadow-lg`}>
        <div className='rounded-lg '>
          <div className='flex items-center justify-center py-3 bg-black border-b rounded-t-lg cursor-default bg-opacity-80 text-md'>
            <div className='cursor-default text-gray-50'>Change Status</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: 'rejected',
                })
              )
                .then(result => {
                  if (setData && data) {
                    setData(
                      data.map(d =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch(err => {});
            }}
            className='flex items-center justify-center py-3 border-b rounded-b-lg hover:bg-red-200 text-md'>
            <div className=''>Reject</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: 'accepted',
                })
              )
                .then(result => {
                  if (setData && data) {
                    setData(
                      data.map(d =>
                        d._id === result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch(err => {});
            }}
            className='flex items-center justify-center py-3 border-b rounded-lg hover:bg-blue-200 text-md '>
            <div className=''>Accepted</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: 'progress',
                })
              )
                .then(result => {
                  if (setData && data) {
                    setData(
                      data.map(d =>
                        d._id === result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch(err => {});
            }}
            className='flex items-center justify-center py-3 border-b rounded-lg hover:bg-green-200 text-md '>
            <div className=''>In-Progress</div>
          </div>
          <div
            onClick={() => {
              handleClose();
              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: 'completed',
                })
              )
                .then(result => {
                  if (setData && data) {
                    setData(
                      data.map(d =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch(err => {});
            }}
            className='flex items-center justify-center py-3 border-b rounded-lg hover:bg-indigo-200 text-md '>
            <div className=''>Completed</div>
          </div>
          <div
            onClick={() => {
              handleClose();

              dispatch(
                updateScheduledWashStatus({
                  _id: id,
                  status: 'notFound',
                })
              )
                .then(result => {
                  if (setData && data) {
                    setData(
                      data.map(d =>
                        d._id !== result.data.data._id
                          ? result.data.data
                          : { ...d }
                      )
                    );
                  }
                })
                .catch(err => {});
            }}
            className='flex items-center justify-center py-3 border-b rounded-lg hover:bg-pink-200 text- text-md '>
            <div className=''>Car not found</div>
          </div>
        </div>
      </div>
    </div>
  );
}
