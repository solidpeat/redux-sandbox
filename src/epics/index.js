import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { api } from '../services';
import * as actions from '../actions';
import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';

const { user, repo, starred, stargazers } = actions;

const firstPageStarredUrl = login => `users/${login}/starred`;

function fetchEntity(entity, apiFn, id, url) {
  return Observable.merge(
    Observable.of(entity.request(id)),
    apiFn(url || id)
      .then(result => {
        if (result.response) {
          return entity.success(id, result.response);
        } else if (result.error) {
          return entity.failure(id, result.error);
        }
      }),
  );
}

const fetchUser = fetchEntity.bind(null, user, api.fetchUser);
const fetchRepo = fetchEntity.bind(null, repo, api.fetchRepo);
const fetchStarred = fetchEntity.bind(null, starred, api.fetchStarred);
const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers);

const loadUser = (action, store) =>
  Observable.of(action)
    .filter(action => {
      const gotUser = getUser(store.getState(), action.login);
      return (
        !gotUser
        || action.requiredFields.some(key =>
          !Object.prototype.hasOwnProperty.call(gotUser, key))
      );
    })
    .mergeMap(action =>
      fetchUser(action.login));

const loadStarred = (action, store, loadMore) =>
  Observable.of(action)
    .filter(action => {
      const starredByUser = getStarredByUser(store.getState(), action.login);
      return !starredByUser || !starredByUser.pageCount || loadMore;
    })
    .mergeMap(action => {
      const starredByUser = getStarredByUser(store.getState(), action.login);
      return fetchStarred(
        action.login,
        starredByUser.nextPageUrl || firstPageStarredUrl(action.login),
      );
    });

const loadUserPage = (action$, store) =>
  action$.ofType(actions.LOAD_USER_PAGE)
    .mergeMap(action => Observable.merge(
      loadUser(action, store),
      loadStarred(action, store),
    ));

export default combineEpics(
  loadUserPage
);
