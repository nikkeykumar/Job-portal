import React, { useEffect, useState } from "react";
import Navebar from "../shared/Navebar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "../../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useGetCompanyById from "../hooks/useGetCompanybyId";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((Store) => Store.company);

  const [loding, setLoding] = useState(false);
  const navegate = useNavigate();
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoding(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/updatecompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navegate("/admin/companies/");

        console.log(res.data?.company);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoding(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navebar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={handlerSubmit}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline "
              className="flex items-center gap-2 text-gray-500 font-semibold "
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {" "}
              <Label>Company Name </Label>
              <Input
                name="name"
                type="text"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {" "}
              <Label>Description </Label>
              <Input
                name="description"
                type="text"
                value={input.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {" "}
              <Label>Website </Label>
              <Input
                name="website"
                type="text"
                value={input.website}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {" "}
              <Label>Location </Label>
              <Input
                name="location"
                type="text"
                value={input.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {" "}
              <Label>Logo </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loding ? (
            <Button type="submit" className="w-full mt-8">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
