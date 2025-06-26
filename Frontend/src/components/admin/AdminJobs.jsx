import React, { useEffect, useState } from "react";
import Navebar from "../shared/Navebar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../../redux/jobSlice";
const AdminJobs = () => {
    useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navegate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <>
      <div>
        <Navebar />
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Filter by name"
              className="w-fit"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navegate("/admin/jobs/create")}>
              New Job
            </Button>
          </div>
          <AdminJobTable />
        </div>
      </div>
    </>
  );
};

export default AdminJobs;
