import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import zip from 'lodash/zip';
import { loadUser, loadStarred } from '../actions';
import User from '../components/User';
import Repo from '../components/Repo';
import List from '../components/List';

const loadData = ({ login, loadUserAction }) => {
  loadUserAction(login, ['name']);
};

class UserPage extends Component {
  static renderRepo([repo, owner]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName}
      />
    );
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStarredAction(this.props.login, true);
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading {login}{"'s profile..."}</i></h1>;
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      <div>
        <User user={user} />
        <hr />
        <List
          renderItem={UserPage.renderRepo}
          items={zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={event => this.handleLoadMoreClick(event)}
          loadingLabel={`Loading ${login}'s starred...`}
          {...starredPagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase();

  const {
    pagination: { starredByUser },
    entities: { users, repos },
  } = state;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login],
  };
};

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  starredPagination: PropTypes.shape({
    isFetching: PropTypes.bool,
    nextPageUrl: PropTypes.string,
    pageCount: PropTypes.number,
    ids: PropTypes.arrayOf(PropTypes.string),
  }),
  starredRepos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  starredRepoOwners: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  // loadUserAction: PropTypes.func.isRequired,
  loadStarredAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  loadUserAction: loadUser,
  loadStarredAction: loadStarred,
})(UserPage);
