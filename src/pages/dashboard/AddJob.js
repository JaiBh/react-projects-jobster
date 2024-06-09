import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormSelect from "../../components/FormSelect";
import {
  addJob,
  clearValues,
  editJob,
  handleChange,
} from "../../features/job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (!isEditing) {
      dispatch(addJob({ position, company, jobLocation, jobType, status }));
    } else {
      dispatch(
        editJob({ editJobId, company, status, position, jobLocation, jobType })
      );
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          ></FormRow>
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          ></FormRow>
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="job location"
            handleChange={handleJobInput}
          ></FormRow>
          {/* status */}
          <FormSelect
            name="status"
            options={statusOptions}
            onChange={handleJobInput}
            value={status}
          ></FormSelect>
          {/* job type */}
          <FormSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            options={jobTypeOptions}
            onChange={handleJobInput}
          ></FormSelect>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
