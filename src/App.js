import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';

function App() {
  const routes = (
    <Switch>
      <Route path="/" />
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
