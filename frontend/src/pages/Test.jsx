import React from "react";
import "./Test.css";
import Chart1 from "../components/Chart1";
import DashboardNavbar from "../components/DashboardNavbar";
import CenterChart from "../components/CenterChart";
import LowestSatisfactionCard from "../components/LowestSatisfactionCard";
import SatisfactionChart from "../components/SatisfactionChart";

const Test = () => {
  const data1 = [
    { name: "Très satisfait", value: 40 },
    { name: "Satisfait", value: 60 },
    { name: "Pas satisfait", value: 20 },
    { name: "Pas satisfait du tout", value: 10 },
  ];
  const data2 = [
    { name: "Très satisfait", value: 10 },
    { name: "Satisfait", value: 10 },
    { name: "Pas satisfait", value: 40 },
    { name: "Pas satisfait du tout", value: 20 },
  ];
  const data3 = [
    { name: "Très satisfait", value: 20 },
    { name: "Satisfait", value: 30 },
    { name: "Pas satisfait", value: 20 },
    { name: "Pas satisfait du tout", value: 10 },
  ];

  return (
    <>
      <DashboardNavbar />
      <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-min">
        {/* Chart1 (Main Chart) */}
        <div className="lg:col-span-4 lg:row-span-4">
          <Chart1 />
        </div>

        {/* Lowest Satisfaction Card */}
        <div className="lg:col-span-2 lg:row-span-4">
          <LowestSatisfactionCard
            badPercentage={70}
            centerName="Benguerir SI"
          />
        </div>

        {/* Center Charts */}
        <div className="lg:col-span-2 lg:row-span-3">
          <SatisfactionChart data={data1} centerName="Casablanca Siege" />
        </div>
        <div className="lg:col-span-2 lg:row-span-3">
          <SatisfactionChart data={data2} centerName="Benguerir SI" />
        </div>
        <div className="lg:col-span-2 lg:row-span-3">
          <SatisfactionChart data={data3} centerName="Youssoufia SI" />
        </div>
      </div>
    </>
  );
};

export default Test;
