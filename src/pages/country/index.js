import React from "react";
import DataTable from "./DataTable";
import { useQuery } from "@tanstack/react-query";

const getCountry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
const Country = () => {
  const queryCountry = useQuery({
    queryKey: ["country"],
    queryFn: getCountry,
  });

  return (
    <>
      <div className="title">
        <h4>Country Catalog</h4>
      </div>
      <DataTable {...queryCountry} />
    </>
  );
};

export default Country;
