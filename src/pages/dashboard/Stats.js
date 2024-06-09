import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { ChartsContainer, StatsContainer } from "../../components";
const Stats = () => {
  const dispatch = useDispatch();
  const { monthlyApplications } = useSelector((store) => store.allJobs);
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <StatsContainer></StatsContainer>
      {monthlyApplications.length > 0 && <ChartsContainer></ChartsContainer>}
    </>
  );
};
export default Stats;
