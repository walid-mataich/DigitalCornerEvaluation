export default function MonthlyStats({ data }) {
  const months = data.yearlyMonthly['2025'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance (2025)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(months).map(([month, stats]) => (
          <div key={month} className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-md font-semibold capitalize text-gray-700">{month}</h4>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Evaluations:</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Very Satisfied:</span>
                <span className="font-semibold text-green-600">{stats.tresSatisfaitNb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfied:</span>
                <span className="font-semibold text-green-500">{stats.satisfaitNb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dissatisfied:</span>
                <span className="font-semibold text-yellow-500">{stats.peuSatisfaitNb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Not Satisfied:</span>
                <span className="font-semibold text-red-500">{stats.pasDuToutSatisfaitNb}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}