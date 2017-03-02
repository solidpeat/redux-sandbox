import React, { Component, PropTypes } from 'react';

class List extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button
        style={{ fontSize: '150%' }}
        onClick={onLoadMoreClick}
        disabled={isFetching}
      >
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel,
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  // 場合によっていろんな形でくるのでanyにした
  // PropTypes.arrayはダメやけどarrayOf(PropTypes.any)はOKのようだ
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string,
};

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...',
};

export default List;
