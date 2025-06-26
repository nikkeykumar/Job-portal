import React from "react";
import Navebar from "../shared/Navebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../../redux/authSlice.js";
const Signup = () => {
  const [input, setinput] = useState({
    FullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", input.FullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <>
      <div>
        <Navebar />
        <div className=" flex justify-center items-center max-w-7xl mx-auto  mt-10 ">
          <form
            onSubmit={handleSubmit}
            className="w-1/2 border border-gray-400 rounded-md p-4 my-10 "
          >
            <h1 className="font-bold text-xl mb-5">Signup</h1>

            <div className="mb-4">
              <Label>FullName</Label>
              <Input
                placeholder="Enter your name"
                type="text"
                name="FullName"
                value={input.FullName}
                onChange={changeEventHandler}
              />
            </div>
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
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter your phone number"
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
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
                  <Label htmlFor="r2">Recuruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2 mt-4">
                <Label>Profile</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
              </Button>
            ) : (
              <Button className="w-full my-4">Signup</Button>
            )}
            <span className="text-sm">
              Already have an Account ?
              <a href="/login" className="text-blue-500 text-sm">
                Login
              </a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
