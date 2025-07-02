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

  useGetAllJobs();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruiter") {
      console.log("Redirecting to /admin/companies");
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (!user || user.role !== "Recruiter") {
      navigate("/"); // Only redirect if not a recruiter
    }
  }, [user, navigate]);
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
