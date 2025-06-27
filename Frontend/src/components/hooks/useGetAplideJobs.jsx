import axios from "axios";
import React, { useEffect } from "react";
import { APPLICANT_API_END_POINT } from "../../../utils/constant";
import { useDispatch } from "react-redux";
import { setAllaplidejobs } from "../../../redux/jobSlice";

const useGetAplideJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAplidejobs = async () => {
      try {
        const res = await axios.get(`${APPLICANT_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
           
          dispatch(setAllaplidejobs(res.data.applicant));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAplidejobs()
  }, []);
};

export default useGetAplideJobs;
