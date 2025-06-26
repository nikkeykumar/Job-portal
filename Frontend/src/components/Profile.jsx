import React, { useState } from "react";
import Navebar from "./shared/Navebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@/components/ui/label";
import ApplideJobTable from "./applideJobTable.jsx";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAplideJobs from "./hooks/useGetAplideJobs.jsx";

const Profile = () => {
  useGetAplideJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((Store) => Store.auth);
  console.log(user);
  return (
    <div>
      <Navebar />
      <div className=" max-w-5xl mx-auto my-10 p-8 border border-gray-400 rounded-2xl bg-white">
        <div>
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={
                  user?.profile?.profilepic ||
                  "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
                }
              />
            </Avatar>
            <div>
              <h1 className="text-lg font-medium">{user?.FullName}</h1>
              <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
            </div>
            <Button
              variant="outline"
              className=" text-right"
              onClick={() => setOpen(true)}
            >
              <Pen />
            </Button>
          </div>
          <div className="flex flex-col gap-2  my-5">
            <div className="flex items-center gap-4">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-4 ">
              <Contact />
              <samp>{user?.phoneNumber}</samp>
            </div>
          </div>
          <div>
            <h1>Skills</h1>
            <div className="flex gap-2 mt-2 items-center">
              {user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((skill, index) => (
                  <Badge key={index} className=" py-1 px-2" variant="outline">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className=" items-center gap-1.5 w-full max-w-sm  mt-5">
              <Label className="font-bold text-md">Resume</Label>
              {isResume ? (
                <a
                  target="blank"
                  className="cursor-pointer text-blue-500 hover:underline w-full"
                  href={user?.profile?.resume}
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl bg-white ">
        <h1 className="font-bold text-lg my-5">Applid Jobs</h1>
        <ApplideJobTable />
      </div>
      <div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
