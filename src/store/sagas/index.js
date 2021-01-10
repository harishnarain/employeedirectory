import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { fetchEmployeesSaga } from "./employee";

export function* watchEmployee() {
  yield takeEvery(actionTypes.FETCH_EMPLOYEES, fetchEmployeesSaga);
}
