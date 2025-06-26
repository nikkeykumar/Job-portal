import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant";
import { setUser } from "../../../redux/authSlice";

const Navebar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" Navebar bg-white">
      <div className=" flex  items-center  justify-between h-16 mx- px-58">
        <div>
          <h1 className="text-2xl font-bold ">
            Job<span className="text-red-600">Portal</span>
          </h1>
        </div>
        <div className=" flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "Recruiter" ? (
              <>
                {" "}
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Job</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Job</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePic ||
                      "https://www.gravatar.com/avatar/?d=mp"
                    }
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePic ||
                        "https://www.gravatar.com/avatar/?d=mp"
                      }
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.FullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col  mt-2 text-gray-600">
                  {user && user.role === "Student" && (
                    <div className="flex items-center  cursor-pointer">
                      <User />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center  cursor-pointer">
                    <LogOut />
                    <Button onClick={logOutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navebar;
