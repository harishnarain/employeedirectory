import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';

const Employees = React.lazy(() => {
  return import('./containers/Employees/Employees');
});

function App() {
  const routes = (
    <Switch>
      <Route path="/employees" component={Employees} />
      <Route path="/" exact component={Main} />
      <Redirect to="/"></Redirect>
    </Switch>
  );
  
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);
