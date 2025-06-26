import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedquery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchEventHandlar = () => {
    dispatch(setSearchedquery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className=" flex flex-col  my-10 gap-5">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 text-medium  font-semibold">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-semibold ">
          Search, Apply & <br /> Get You{" "}
          <samp className="text-purple-600">Dream Job</samp>
        </h1>
        <p className="text-lg ">
          Join us today and take the first step towards your future!
        </p>
        <div className=" w-[40%] mx-auto flex border border-gray-200 rounded-full pl-3 items-center gap-4 shadow-md">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find Your Dream Job"
            className=" w-full outline-none border-none "
          />
          <Button
            onClick={searchEventHandlar}
            className="bg-purple-600 rounded-r-full hover:bg-purple-700 text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
