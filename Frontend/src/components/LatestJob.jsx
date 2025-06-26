import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const { alljobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="text-4xl font-bold">
        <samp className="text-purple-600">Latest & Top</samp> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {alljobs.length <= 0 ? (
          <span>NO Jobs Available</span>
        ) : (
          alljobs
            ?.slice(0, 6)
            .map((job) => <JobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJob;
