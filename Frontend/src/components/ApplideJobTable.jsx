import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const ApplideJobTable = () => {
  const { allaplidejobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allaplidejobs.lenght <= 0 ? (
            <span>You haven't applied any job yet</span>
          ) : (
            allaplidejobs.map((applidejob) => (
              <TableRow key={applidejob._id}>
                <TableCell>{applidejob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{applidejob?.job?.title}</TableCell>
                <TableCell>{applidejob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      applidejob?.status === "rejected"
                        ? "bg-red-400"
                        : applidejob.status === "panding"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {applidejob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplideJobTable;
