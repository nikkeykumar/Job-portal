import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant";
import { setAlladminjobs } from "../../../redux/jobSlice";
import { useDispatch } from "react-redux";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAlladminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAlladminjobs(res.data.jobs));
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlladminjobs();
  }, []);
};

export default useGetAllAdminJobs;
