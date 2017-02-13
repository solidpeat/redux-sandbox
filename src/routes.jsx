import React from 'react';
import { Route } from 'react-router';
import Root from './containers/Root';
import RepoPage from './containers/RepoPage';
import UserPage from './containers/UserPage';

export default
  <Route path="/" component={Root}>
    <Route path="/:login/:name" component={RepoPage} />
    <Route path="/:login" component={UserPage} />
  </Route>;
