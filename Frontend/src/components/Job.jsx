import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const dayAgofun = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currenttime = new Date();
    const timeDiffernce = createdAt - currenttime;
    return Math.floor(timeDiffernce / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="p-5 bg-white rounded-md shadow-md hover:shadow-lg  border-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
      <div className=" flex justify-between items-center py-2">
        <p className=" text-sm text-gray-500">
          {dayAgofun(job?.createdAt) === 0
            ? "Today"
            : `${dayAgofun(job?.createdAt)}`}
          days ago
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className=" flex items-center gap-4 py-2">
        <Button className="p-6 " variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg py-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.positions}Positions
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {job?.jobtype}
        </Badge>
        <Badge variant="ghost" className="text-purple-600 font-bold">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button
          className="bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
          variant="outline"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
