import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const fetchEmployeesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchEmployeesSuccess = (state, action) => {
  return updateObject(state, {
    users: action.employees,
    loading: false,
  });
};

const fetchEmployeesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const clearEmployeeState = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEES_START:
      return fetchEmployeesStart(state, action);
    case actionTypes.FETCH_EMPLOYEES_SUCCESS:
      return fetchEmployeesSuccess(state, action);
    case actionTypes.FETCH_EMPLOYEES_FAIL:
      return fetchEmployeesFail(state, action);
    case actionTypes.CLEAR_EMPLOYEE_STATE:
      return clearEmployeeState(state, action);
    default:
      return state;
  }
};

export default reducer;
