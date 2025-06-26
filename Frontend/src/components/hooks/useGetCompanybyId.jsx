import { useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../../../utils/constant";
import { setSingleCompany } from "../../../redux/companySlice";
const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyid}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.company);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyById();
  }, [companyid, dispatch]);
};

export default useGetCompanyById;
