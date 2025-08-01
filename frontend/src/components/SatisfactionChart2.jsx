import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MdOutlinePlace, MdFeedback } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../api/axios";

const COLORS = ["#4ade80", "#22c55e", "#facc15", "#ef4444"];
const TYPES = [
  { key: "general", label: "Général" },
  { key: "tempsDeReponse", label: "Temps de réponse" },
  { key: "comportement", label: "Comportement" },
  { key: "qualiteDeLaSolution", label: "Qualité de la solution" },
];

const SatisfactionChart2 = ({ idCentre }) => {
  const [rawData, setRawData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("fr-FR", { month: "long" })
  );
  const [type, setType] = useState("general");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/adminsuperadmin/centres/centreData/${idCentre}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        // console.log("Satisfaction data fetched:", res.data);
        setRawData(res.data);
      } catch (err) {
        console.error("Failed to fetch satisfaction stats", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!rawData) return;

    let source;
    if (type === "general") {
      source = rawData.generalTotalMonthlyAvis?.[year]?.[month];
    } else {
      source = rawData.totalMonthlyAvisByType?.[type]?.[year]?.[month];
    }

    if (source) {
      const formatted = [
        { name: "Très satisfait", value: source.tresSatisfaitNb },
        { name: "Satisfait", value: source.satisfaitNb },
        { name: "Peu satisfait", value: source.peuSatisfaitNb },
        { name: "Pas du tout satisfait", value: source.pasDuToutSatisfaitNb },
      ];
      setChartData(formatted);
    } else {
      setChartData([]);
    }
  }, [rawData, year, month, type]);

  const availableYears = rawData
    ? Object.keys(rawData.generalTotalMonthlyAvis || {})
    : [];
  const availableMonths = rawData?.generalTotalMonthlyAvis?.[year]
    ? Object.keys(rawData.generalTotalMonthlyAvis[year])
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full  mx-auto">
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center gap-2">
          <MdFeedback className="text-2xl text-gray-700" />
          <Link to="/" className="text-xl font-semibold text-gray-700">
            Avis
          </Link>
        </div>
        <div className="flex gap-2">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {TYPES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-40 m-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SatisfactionChart2;
