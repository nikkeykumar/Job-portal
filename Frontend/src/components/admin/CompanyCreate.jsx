import React from "react";
import Navebar from "../shared/Navebar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice.js";
import { COMPANY_API_END_POINT } from "../../../utils/constant";
const CompanyCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const registeredNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleCompany(res.data.company));
        const companyid = res?.data?.company?._id;
        navigate(`/admin/company/${companyid}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div>
      <Navebar />
      <div className="max-w-4xl mx-auto ">
        <div className="my-10">
          <h1 className=" text-2xl font-bold">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like your company name? you can change this later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          value={name}
          placeholder="Enter your company name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registeredNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
