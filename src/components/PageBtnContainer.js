import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const nextPage = () => {
    let newPage = page + 1;
    if (page === numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (page === 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {/* first page */}
        <button
          type="button"
          className={1 === page ? "pageBtn active" : "pageBtn"}
          onClick={() => dispatch(changePage(1))}
        >
          1
        </button>
        {/* dots */}
        {page === 1 ||
        page === numOfPages ||
        page === 2 ||
        page === numOfPages ? (
          ""
        ) : (
          <button
            type="button"
            className="pageBtn"
            onClick={() => console.log("change page")}
          >
            ...
          </button>
        )}

        {/* active page */}
        {page === 1 || page === numOfPages ? (
          ""
        ) : (
          <button
            type="button"
            className="pageBtn active"
            onClick={() => console.log("change page")}
          >
            {page}
          </button>
        )}

        {/* dots */}
        {page === numOfPages - 1 ? (
          ""
        ) : (
          <button
            type="button"
            className="pageBtn"
            onClick={() => console.log("change page")}
          >
            ...
          </button>
        )}

        {/* last page */}
        <button
          type="button"
          className={numOfPages === page ? "pageBtn active" : "pageBtn"}
          onClick={() => dispatch(changePage(numOfPages))}
        >
          {numOfPages}
        </button>
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
