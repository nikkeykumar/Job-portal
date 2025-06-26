import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedquery } from "../../redux/jobSlice";

const CategoryCaroucal = () => {
  const category = [
    "Frontend developer",
    "Backend developer",
    "Fullstack developer",
    "Data science",
    "Graphic designer",
    "UI/UX designer",
    "Mobile developer",
    "DevOps engineer",
    "Digitale markite",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchEventHandlar = (query) => {
    dispatch(setSearchedquery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className=" w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="mb-basis-1/2 lg-basis-1/3 flex items-center justify-evenly"
            >
              <Button
                onClick={() => searchEventHandlar(item)}
                variant="outline"
                className="rounded-full bg-white hover:bg-purple-600"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCaroucal;
