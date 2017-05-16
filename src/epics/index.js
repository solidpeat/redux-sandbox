import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { api } from '../services';
import * as actions from '../actions';
import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';

const { user, repo, starred, stargazers } = actions;

const firstPageStarredUrl = login => `users/${login}/starred`;

function fetchEntity(entity, apiFn, id, url) {
  return Observable.merge(
    Observable.from([entity.request(id)]),
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

const loadUserPage = action$ =>
  action$.ofType(actions.LOAD_USER_PAGE)
    .mergeMap(action => Observable.merge(
      fetchUser(action.login),
      fetchStarred(action.login, firstPageStarredUrl(action.login)),
    ));

export default combineEpics(
  loadUserPage
);
