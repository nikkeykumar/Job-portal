import React, { useEffect } from "react";
import Navebar from "./shared/Navebar";
import HeroSection from "./HeroSection";
import CategoryCaroucal from "./CategoryCaroucal";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "../components/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useSelector((store) => store.auth);
  console.log("home vale", user);
  useGetAllJobs();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <div>
        <Navebar />
        <HeroSection />
        <CategoryCaroucal />
        <LatestJob />
        <Footer />
      </div>
    </>
  );
};

export default Home;
