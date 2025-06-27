import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant";
import { setalljobs } from "../../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedquery } = useSelector((store) => store.job);
 
  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedquery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setalljobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlljobs();
  }, []);
};

export default useGetAllJobs;
