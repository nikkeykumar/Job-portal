import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const navigate = useNavigate();

  const { alladminjobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );
  
  const [filterjob, setFilterjob] = useState(alladminjobs);
  useEffect(() => {
    if (alladminjobs.length > 0) {
      const filteredJobs = alladminjobs.filter((job) => {
        if (!searchJobByText) return true; // If no search text, show all jobs
        return job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
      setFilterjob(filteredJobs);
    }
  }, [alladminjobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alladminjobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>You haven't added any jobs yet</TableCell>
            </TableRow>
          ) : (
            filterjob.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${job?.company?._id}`)
                        }
                        className="flex items-center cursor-pointer gap-2 w-fit"
                      >
                        <Edit2 className=" w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className=" flex items-center w-fit gap-2 mt-2 cursor-pointer"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
