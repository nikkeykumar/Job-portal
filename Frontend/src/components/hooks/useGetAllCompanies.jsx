import { useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../../../utils/constant";
import { setCompanies } from "../../../redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/getallcompanies`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
         
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
