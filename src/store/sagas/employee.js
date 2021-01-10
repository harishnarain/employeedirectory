import { put } from "redux-saga/effects";

import axios from "../../axios-employees";
import * as actions from "../actions/index";

export function* fetchEmployeesSaga(action) {
  yield put(actions.fetchEmployeesStart());
  let queryParams = "?results=200";
  try {
    const response = yield axios.get(queryParams);
    const fetchedEmployees = [];
    for (let key in response.results) {
      fetchedEmployees.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchEmployeesSuccess(fetchedEmployees));
  } catch (error) {
    yield put(actions.fetchEmployeesFail(error));
  }
}

