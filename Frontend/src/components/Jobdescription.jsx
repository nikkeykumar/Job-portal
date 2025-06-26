import { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import {
  APPLICANT_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setsingljob } from "../../redux/jobSlice";
import { toast } from "sonner";
import { useState } from "react";
const Jobdescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singljob } = useSelector((store) => store.job);
  const isIntiallyApplide =
    singljob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplide, setIsApplide] = useState(isIntiallyApplide);
  console.log(isApplide);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const applyJobhandler = async () => {
    try {
      const res = await axios.get(`${APPLICANT_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplide(true);
        const updatSingljob = {
          ...singljob,
          application: [...singljob.application, { applicant: user?._id }],
        };
        dispatch(setsingljob(updatSingljob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setsingljob(res.data.jobdata));
          setIsApplide(
            res.data.jobdata.application.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglejob();
  }, [jobId, dispatch, user?._id]);
  console.log(isApplide);
  console.log("djksdkaldfl", singljob);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singljob?.title}</h1>
          <div>
            <Badge className="font-bold text-blue-700 mx-2" variant="ghost">
              {singljob?.position}Position
            </Badge>
            <Badge className="font-bold text-blue-700" variant="ghost">
              {singljob?.jobtype}
            </Badge>
            <Badge className="font-bold text-blue-700 mx-2" variant="ghost">
              {singljob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplide ? null : applyJobhandler}
          disabled={isApplide}
          className={`rounded-lg ${
            isApplide
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-800"
          } `}
        >
          {isApplide ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="font-medium border-b-2 border-b-gray-300 py-4">
        Description
      </h1>
      <div className="flex flex-col gap-1 py-2">
        <h1 className="font-bold ">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.title}
          </span>
        </h1>
        <h1 className="font-bold ">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.location}
          </span>
        </h1>
        <h1 className="font-bold ">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.description}
          </span>
        </h1>
        <h1 className="font-bold ">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.experienceLeval} years
          </span>
        </h1>
        <h1 className="font-bold ">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold ">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.application?.length}
          </span>
        </h1>
        <h1 className="font-bold ">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singljob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Jobdescription;
