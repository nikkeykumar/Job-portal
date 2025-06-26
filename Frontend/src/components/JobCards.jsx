import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 bg-white rounded-md shadow-md hover:shadow-lg  border-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-md text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-md text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {job?.jobtype}
        </Badge>
        <Badge variant="ghost" className="text-purple-600 font-bold">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
