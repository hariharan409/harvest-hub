import React from "react";
import ReactPaginate from "react-paginate";

// Define prop types
interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"← Prev"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName="flex justify-center space-x-4 mt-4"
      pageClassName="px-3 py-2 border rounded-md bg-black-200 hover:bg-black hover:text-white"
      activeClassName="bg-white font-medium text-black bg-white"
      previousClassName="px-3 py-2 border rounded-md bg-black-200 hover:bg-black whitespace-nowrap"
      nextClassName="px-3 py-2 border rounded-md bg-black-200 hover:bg-black whitespace-nowrap"
    />
  );
};

export default Pagination;