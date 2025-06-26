import React, { useEffect, useState } from "react";
import Navebar from "../shared/Navebar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../../redux/companySlice";
const Companies = () => {
  useGetAllCompanies();
  const [input , setInput] = useState("")
  const navegate = useNavigate();
  const despatch = useDispatch(); 
  useEffect(()=>{
    despatch(setSearchCompanyByText(input))
  },[input])
  return (
    <>
      <div>
        <Navebar />
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between">
            <Input placeholder="Filter by name" className="w-fit" onChange={(e)=>setInput(e.target.value)} />
            <Button onClick={() => navegate("/admin/company/create")}>
              New Companie
            </Button>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </>
  );
};

export default Companies;
