import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedquery } from "../../redux/jobSlice";

const filterData = [
  {
    filtertype: "Location",
    array: ["Delhi NCR", "Noida", "Gurgaon", "Pune", "Banglore", "meerut"],
  },
  {
    filtertype: "Industry",
    array: [
      "Frontend Devloper",
      "Backend Devloper",
      "FullStack Devloper",
      "Data Science",
      "Machine Learning",
      "Digitale markite",
    ],
  },
  {
    filtertype: "Salary",
    array: ["0-40k", "40k-80k", "80k-1.2L", "1.2L-1.5L", "1.5L-2L"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispacth = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispacth(setSearchedquery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white rounded-md p-3">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="font-black text-lg">{data.filtertype}</h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={index} className="flex items-center gap-2 my-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlfor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
