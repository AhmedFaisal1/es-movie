import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPagesCalculated: number;
  handlePageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPagesCalculated,
  handlePageChange,
}) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={totalPagesCalculated}
        onPageChange={({ selected }) => {
          handlePageChange(selected + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        containerClassName={"navigationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"navigationDisabled"}
        activeClassName={"navigationActive"}
      />
    </>
  );
};

export default Pagination;
