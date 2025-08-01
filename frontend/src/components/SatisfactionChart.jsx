
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdOutlinePlace } from "react-icons/md";
import { Link } from "react-router-dom";

const COLORS = ["#4ade80", "#22c55e", "#facc15", "#ef4444"];

const SatisfactionChart = ({ data, centerName }) => {
  return (
    <div className="bg-white  rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2  ">
        <MdOutlinePlace className="text-2xl text-gray-700" />
        <Link
          to={`/general/center/${data[4].id}`}
          className="text-xl  font-semibold   text-gray-700"
        >
          {centerName}
        </Link>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
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

export default SatisfactionChart;
