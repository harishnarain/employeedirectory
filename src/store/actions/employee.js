import * as actionTypes from "./actionTypes";

export const fetchEmployeesSuccess = (employees) => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_SUCCESS,
    employees: employees,
  };
};

export const fetchEmployeesFail = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_FAIL,
    error: error,
  };
};

export const fetchEmployeesStart = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_START,
  };
};

export const fetchEmployees = (queryType, query) => {
  return {
    type: actionTypes.FETCH_EMPLOYEES,
    queryType: queryType,
    query: query,
  };
};

export const clearEmployeeState = () => {
  return {
    type: actionTypes.CLEAR_EMPLOYEE_STATE,
  };
};
