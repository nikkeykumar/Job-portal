import React, { useEffect, useState } from "react";
import Navebar from "./shared/Navebar";
import FilterCard from "./FilterCard";
import Job from "./Job";

import { useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs";
const Jobs = () => {
  useGetAllJobs();
  const { alljobs, searchedquery } = useSelector((store) => store.job);
  const [filterjob, setFilterjob] = useState(alljobs);
  useEffect(() => {
    if (searchedquery) {
      const filteredjobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedquery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedquery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedquery.toLowerCase())
        );
      });
      setFilterjob(filteredjobs);
    } else {
      setFilterjob(alljobs);
    }
  }, [alljobs, searchedquery]);
  return (
    <>
      <Navebar />
      <div className=" max-w-7xl mx-auto my-10 ">
        <div className="flex  gap-5 ">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filterjob.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className=" flex-1 h-[88vh]  pb-5 overflow-y-auto ">
              <div className="grid grid-cols-3 gap-4">
                {filterjob.map((job) => (
                  <div>
                    <Job key={job.id} job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
