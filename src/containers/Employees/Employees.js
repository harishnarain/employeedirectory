import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Employee from "../../components/Employees/Employee/Employee";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import useDebounce from "../../shared/useDebounce";
import EnhancedTableHead from "../../components/Employees/EnhancedTableHead";
import { getComparator } from "../../components/Employees/comparators";
import { stableSort } from "../../components/Employees/sort";
import EnhancedTableToolbar from "../../components/Employees/EnhancedTableToolbar";
import useDebounceFunction from "../../shared/useDebounceFunction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    margin: `5px 0 5px ${theme.spacing(0)}px`,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 800,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const Employees = (props) => {
  const { onFetchEmployees } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("displayName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);
  
  const results = props.employees.filter(employee => employee.displayName.toLowerCase().startsWith(query.toLowerCase()));

  useEffect(() => {
    if (!query) {
      onFetchEmployees("search", debouncedQuery);
    }
    
    // eslint-disable-next-line
  }, [onFetchEmployees]);

  const handleRefreshEmployees = () => {
    onFetchEmployees("search");
    setQuery("");
  };
  const debouncedRefreshEmployees = useDebounceFunction(handleRefreshEmployees, 500);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, results.length - page * rowsPerPage);

  let employees = null;
  let loading = null;

  if (props.loading) {
    loading = <Spinner />;
  }

  if (!props.loading) {
    employees = (
      <TableBody>
        {stableSort(results, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((employee, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                tabIndex={-1}
                key={employee.id}
              >
                <Employee
                  id={employee.id}
                  labelId={labelId}
                  thumbnail={employee.thumbnail}
                  displayName={employee.displayName}
                  phoneNumber={employee.phoneNumber}
                  email={employee.email}
                  birthDate={employee.birthDate}
                />
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          changed={(event) => setQuery(event.target.value)}
          value={query}
          refreshClick={() => debouncedRefreshEmployees()}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={results.length}
            />
            {employees}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={results.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {loading}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employee.employees,
    loading: state.employee.loading,
    error: state.employee.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEmployees: (queryType, query) =>
      dispatch(actions.fetchEmployees(queryType, query)),
    onClearEmployeeState: () => dispatch(actions.clearEmployeeState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
