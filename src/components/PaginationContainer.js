import React from 'react';
import Pagination from 'react-js-pagination';

export default function PaginationContainer(props) {
  const {
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    onChange,
    limit,
    leftLimit,
  } = props;

  return (
    <div className="pagination-container">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount ? totalItemsCount : 0}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
      <div>
        Showing {leftLimit} - {limit} of {totalItemsCount ? totalItemsCount : 0}
      </div>
    </div>
  );
}
