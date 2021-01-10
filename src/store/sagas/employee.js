import { put } from "redux-saga/effects";
import dateFormat from 'dateformat';

import axios from "../../axios-employees";
import * as actions from "../actions/index";

export function* fetchEmployeesSaga(action) {
  yield put(actions.fetchEmployeesStart());
  let queryParams = "?results=200";
  try {
    const response = yield axios.get(queryParams);
    const fetchedEmployees = [];
    for (let key in response.data.results) {
      const fetchedEmployee = response.data.results[key];
      fetchedEmployees.push({
        //...response.data.results[key],
        id: key,
        thumbnail: fetchedEmployee.picture.thumbnail,
        displayName: `${fetchedEmployee.name.first} ${fetchedEmployee.name.last}`,
        phoneNumber: fetchedEmployee.phone,
        email: fetchedEmployee.email,
        birthDate: dateFormat(fetchedEmployee.dob.date, 'mm/dd/yyyy'),
      });
    }
    yield put(actions.fetchEmployeesSuccess(fetchedEmployees));
  } catch (error) {
    yield put(actions.fetchEmployeesFail(error));
  }
}

