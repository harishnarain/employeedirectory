import React from "react";

import TableCell from "@material-ui/core/TableCell";

import Aux from "../../../hoc/Aux/Aux";

const employee = (props) => {
  return (
    <Aux>
      <TableCell component="th" id={props.labelId} scope="row" padding="default">
        <img src={props.thumbnail} alt="employee-thumbnail"></img>
      </TableCell>
      <TableCell align="left" padding="none">
        {props.displayName}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.phoneNumber}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.email}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.birthDate}
      </TableCell>
    </Aux>
  );
};

export default employee;
