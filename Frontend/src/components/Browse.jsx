import { useEffect } from "react";
import Navebar from "../components/shared/Navebar.jsx";
import useGetAllJobs from "./hooks/useGetAllJobs.jsx";
import Job from "./Job.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedquery } from "../../redux/jobSlice.js";

const Browse = () => {
  useGetAllJobs();
  const { alljobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedquery(""));
    };
  }, []);
  return (
    <>
      <div>
        <Navebar />
        <div className="max-w-6xl mx-auto my-10 p-5">
          <h1 className="font-bold text-lg">Search Result({alljobs.length})</h1>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {alljobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
