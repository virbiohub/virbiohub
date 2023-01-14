import React from "react";
import Pagination from "react-bootstrap/Pagination";

const TablePagination = ({
  pageCount,
  goToPage,
  previousPage,
  nextPage,
  canNextPage,
  page,
  canPreviousPage,
}) => {
  const pages = pageCount > 0 && pageCount - 1;
  const arr = Array(pages + 1);
  arr.fill(null, 0);

  return (
    <>
      {pageCount > 0 && (
        <Pagination>
          <Pagination.First
            disabled={!canPreviousPage ? true : false}
            onClick={goToPage.bind(null, 0)}
          />
          <Pagination.Prev
            disabled={!canPreviousPage ? true : false}
            onClick={goToPage.bind(null, page - 1)}
          />

          {arr.map((el, indx) => {
            return (
              <Pagination.Item
                active={page === indx ? true : false}
                onClick={goToPage.bind(null, indx)}
                key={Math.random().toString()}
 
              >
                {indx + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={!canNextPage ? true : false}
            onClick={goToPage.bind(null, page + 1)}
          />
          <Pagination.Last
            onClick={goToPage.bind(null, pageCount - 1)}
            disabled={!canNextPage ? true : false}
          />
        </Pagination>
      )}
    </>
  );
};

export default TablePagination;
