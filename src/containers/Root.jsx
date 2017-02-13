import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Explore from '../components/Explore';
import { resetErrorMessage } from '../actions';

class Root extends Component {
  static handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`);
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<button onClick={this.handleDismissClick}>
          Dismiss
        </button>)
      </p>
    );
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div>
        <Explore
          value={inputValue}
          onChange={Root.handleChange}
        />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
}

Root.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1),
});

export default connect(mapStateToProps, {
  resetErrorMessage,
})(Root);
