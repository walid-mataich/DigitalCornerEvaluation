import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "pie",
  width: 240,
  height: 240,
  series: [44, 55, 13, 43],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#33ff80", "#61ff33", "#f49d0e", "#f40e0e"],
    legend: {
      show: false,
    },
    labels: [
      "Satisfait",
      "Tres Satisfait",
      "Pas Satisfait",
      "pas du tout Satisfait",
    ],
  },
};

export default function CenterChart() {
  return (
    <Card className="h-0 mb-0 mt-0">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-2 rounded-none md:flex-row md:items-center px-1"
      >
        <div className="w-max  rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Pie Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className=" grid place-items-center px-2 pb-0 pt-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
