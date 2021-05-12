import {
  READ_PERMISIONS,
  READ_ONE_PERMISION,
  CREATE_PERMISION,
  UPDATE_PERMISION,
  DELETE_PERMISION,
  PERMISION_ERROR,
  CLEAR_PERMISION,
  START_PERMISIONS_RELOAD,
  FINISHED_PERMISIONS_RELOAD,
} from '../types/permissions';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startPermissionsReload = () => dispatch => {
  dispatch({ type: START_PERMISIONS_RELOAD });
};

export const finishedPermissionsReload = () => dispatch => {
  dispatch({ type: FINISHED_PERMISIONS_RELOAD });
};

export const readPermissions = () =>
  readItemsAsync({
    url: 'https://car-wash-uae.herokuapp.com/api/permissions/all',
    successType: READ_PERMISIONS,
    errorType: PERMISION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOnePermission = id =>
  readOneItemAsync({
    url: 'https://car-wash-uae.herokuapp.com/api/permissions/',
    successType: READ_ONE_PERMISION,
    errorType: PERMISION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createPermission = formData =>
  createItemAsync({
    url: 'https://car-wash-uae.herokuapp.com/api/permissions/',
    successType: CREATE_PERMISION,
    errorType: PERMISION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    formData,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updatePermission = formData =>
  updateItemAsync({
    url: 'https://car-wash-uae.herokuapp.com/api/permissions/',
    successType: UPDATE_PERMISION,
    errorType: PERMISION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    formData,
    id: formData.id,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deletePermission = id =>
  deleteItemAsync({
    url: 'https://car-wash-uae.herokuapp.com/api/permissions/',
    successType: DELETE_PERMISION,
    errorType: PERMISION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    id,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearPermission = () => dispatch => {
  dispatch({ type: CLEAR_PERMISION });
};
