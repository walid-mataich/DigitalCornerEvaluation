import React, { useState } from "react";
import "./Test.css";
import Chart1 from "../components/Chart1";
import DashboardNavbar from "../components/DashboardNavbar";
import CenterChart from "../components/CenterChart";

const Test = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="grid grid-cols-6 grid-rows-7 gap-4">
        <div className="col-span-4 row-span-4 ">
          <Chart1 />
        </div>
        <div className="col-span-2 row-span-4 col-start-5  p-0 m-0 ">2</div>
        <div className="col-span-2 row-span-3 row-start-5  p-0 m-0"><CenterChart/></div>
        <div className="col-span-2 row-span-3 col-start-3 row-start-5   ">
          <CenterChart/>
        </div>
        <div className="col-span-2 row-span-3 col-start-5 row-start-5 ">
          <CenterChart/>
        </div>
      </div>
    </>
  );
};

export default Test;
