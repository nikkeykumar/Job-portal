import React, { useEffect, useState } from "react";
import Navebar from "../shared/Navebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/authSlice.js";
import { Loader2 } from "lucide-react";
const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);

  const navegate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Dispatch the user object instead of success boolean
        dispatch(setUser(res.data.userData)); // Ensure the backend returns `user` in the response
        navegate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navegate("/");
    }
  });
  return (
    <div>
      <Navebar />
      <div className=" flex justify-center items-center max-w-7xl mx-auto  mt-10 ">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="camfortable"
              className="flex items-center gap-4 mt-4"
            >
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  className="cursor-pointer"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  className="cursor-pointer"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recuriter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button className="w-full my-4">Login</Button>
          )}
          <span className="text-sm">
            Dont`t have an Account ?
            <a href="/signup" className="text-blue-500 text-sm">
              Signup
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
