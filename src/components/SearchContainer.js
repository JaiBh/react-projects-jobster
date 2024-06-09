import { useDispatch, useSelector } from "react-redux";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormSelect } from "../components";
import { useMemo, useState } from "react";
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const dispatch = useDispatch();

  const { searchStatus, searchType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const handleSearch = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    setLocalSearch("");
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          ></FormRow>
          {/* search by status */}
          <FormSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            onChange={handleSearch}
            options={["all", ...statusOptions]}
          ></FormSelect>
          {/* search by type */}
          <FormSelect
            labelText="type"
            name="searchType"
            value={searchType}
            onChange={handleSearch}
            options={["all", ...jobTypeOptions]}
          ></FormSelect>
          {/* sort */}
          <FormSelect
            name="sort"
            value={sort}
            onChange={handleSearch}
            options={["all", ...sortOptions]}
          ></FormSelect>
          <button onClick={handleSubmit} className="btn-block btn btn-danger">
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
