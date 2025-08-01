
const LowestSatisfactionCard = ({ centerName, badPercentage }) => {
  return (
    <div className=" rounded-2xl shadow-lg p-5 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-gray-800  mb-2">
           Centre avec le moins de satisfaction
        </h2>
       
        <p className="text-2xl font-bold text-red-600 ">
          {centerName}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600 ">
           Pourcentage d'avis négatifs:
        </p>
        <p className="text-xl font-bold text-red-700 ">
          {badPercentage}%
        </p>
      </div>
    </div>
  );
};

export default LowestSatisfactionCard;
