import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { checkForUnauthorizedResponse, customFetch } from "../../utils";
import { getFromLocalStorage } from "../../utils";
import { getJobs, showLoading } from "../allJobs/allJobsSlice";
export const addJob = createAsyncThunk("job/addJob", async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
});

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());

    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`);
      thunkAPI.dispatch(getJobs());
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (job, thunkAPI) => {
    const { editJobId, company, position, jobLocation, jobType, status } = job;
    try {
      const resp = await customFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      const {
        _id: editJobId,
        position,
        company,
        jobLocation,
        jobType,
        status,
      } = payload;
      state.position = position;
      state.company = company;
      state.jobLocation = jobLocation;
      state.jobType = jobType;
      state.status = status;
      state.editJobId = editJobId;
      state.isEditing = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job edited!");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default jobSlice.reducer;

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
