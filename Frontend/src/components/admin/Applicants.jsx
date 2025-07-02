import React, { useEffect } from "react";
import Navebar from "../shared/Navebar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICANT_API_END_POINT } from "../../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../../../redux/applicationSlice";

const Applicants = () => {
  const param = useParams();
  const { applicants } = useSelector((store) => store.application);

  const despatch = useDispatch();
  useEffect(() => {
    const FetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICANT_API_END_POINT}/applicants/${param.id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          despatch(setApplicants(res.data.Job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchApplicants();
  }, []);
  return (
    <div>
      <Navebar />
      <div className="max-w-5xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants({applicants?.application?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
