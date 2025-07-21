import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import api from "../api/axios";
const monthOrder = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function getSatisfactionChartData(apiData, selectedYear, selectedType) {
  if (!apiData) return { categories: [], data: [] };

  let monthlyData = {};
  if (selectedType === "Genéral") {
    monthlyData = apiData.generalTotalMonthlyAvis?.[selectedYear] || {};
  } else {
    monthlyData =
      apiData.totalMonthlyAvisByType?.[selectedType]?.[selectedYear] || {};
  }

  const sortedMonths = monthOrder.filter((month) => monthlyData[month]);

  const categories = [];
  const data = [];

  sortedMonths.forEach((month) => {
    const info = monthlyData[month];
    const total = info.total || 0;
    const satisfied = (info.satisfaitNb || 0) + (info.tresSatisfaitNb || 0);
    const percentage = total === 0 ? 0 : Math.round((satisfied / total) * 100);
    categories.push(month.charAt(0).toUpperCase() + month.slice(1));
    data.push(percentage);
  });

  return { categories, data };
}

export default function CenterChart() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedType, setSelectedType] = useState("Genéral");
  const [apiData, setApiData] = useState(null);
  const [token] = useState(localStorage.getItem("TOKEN"));
  const idCentre = localStorage.getItem("ID_CENTRE");

  useEffect(() => {
    const fetchCentresData = async () => {
      try {
        const res = await api.get(`/adminsuperadmin/centres/centreData/${idCentre}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiData(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err.message);
        setApiData(null);
      }
    };
    fetchCentresData();
  }, [token]);

  const chartData = getSatisfactionChartData(
    apiData,
    selectedYear,
    selectedType
  );

  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Taux de satisfaction (%)",
        data: chartData.data,
      },
    ],
    options: {
      chart: { toolbar: { show: false } },
      dataLabels: { enabled: false },
      colors: ["#228324"],
      plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
      xaxis: {
        categories: chartData.categories,
        labels: {
          style: {
            colors: "#228324",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val}%`,
          style: {
            colors: "#228324",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: {
        theme: "dark",
        y: { formatter: (val) => `${val}%` },
      },
    },
  };

  return (
    <Card className="m-2 rounded-2xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-max rounded-lg bg-green-800 p-5 text-white">
            <ChartBarIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Taux de satisfaction global
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Évolution du taux de satisfaction des employés en fonction du
              temps
            </Typography>
          </div>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-green-600 text-green-800 rounded-md mr-5 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="Genéral">Général</option>
          {apiData &&
            Object.keys(apiData.totalMonthlyAvisByType).map((type) => (
              <option key={type} value={type}>
                {type === "tempsDeReponse"
                  ? "Temps de réponse"
                  : type === "comportement"
                  ? "Comportement"
                  : type === "qualiteDeLaSolution"
                  ? "Qualité de la solution"
                  : type}
              </option>
            ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-green-600 text-green-800 rounded-md mr-5 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {apiData &&
            Object.keys(apiData.generalTotalMonthlyAvis).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </CardHeader>

      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
