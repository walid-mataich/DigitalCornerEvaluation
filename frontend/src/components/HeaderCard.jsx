export default function HeaderCard({ data }) {
  const total = data.satisfaitNb + data.tresSatisfaitNb + data.peuSatisfaitNb + data.pasDuToutSatisfaitNb;
  const satisfactionRate = ((data.tresSatisfaitNb + data.satisfaitNb) / total * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold text-gray-800">{data.villeCentreNom}</h2>
        <p className="text-sm text-gray-500 mt-1">Customer Satisfaction Overview</p>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-primary-600">{satisfactionRate}%</p>
        <p className="text-sm text-gray-500">Satisfaction Rate</p>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-primary-600">{total}</p>
        <p className="text-sm text-gray-500">Total Evaluations</p>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-primary-600">{data.tresSatisfaitNb + data.satisfaitNb}</p>
        <p className="text-sm text-gray-500">Satisfied Users</p>
      </div>
    </div>
  );
}