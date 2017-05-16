import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { api } from '../services';
import * as actions from '../actions';
import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';

const { user, repo, starred, stargazers } = actions;

const firstPageStarredUrl = login => `users/${login}/starred`;

const loadUserPage = action$ =>
  action$.ofType(actions.LOAD_USER_PAGE)
    .mergeMap(action => Observable.merge(
      api.fetchUser(action.login)
        .then(result => {
          if (result.response) {
            return user.success(action.login, result.response);
          } else if (result.error) {
            return user.failure(action.login, result.error);
          }
        }),
      api.fetchStarred(firstPageStarredUrl(action.login))
        .then(result => {
          if (result.response) {
            return starred.success(action.login, result.response);
          } else if (result.error) {
            return starred.failure(action.login, result.error);
          }
        }),
    ));

export default combineEpics(
  loadUserPage
);
