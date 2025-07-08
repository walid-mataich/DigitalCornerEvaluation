import React, { useState } from "react";
import SatisfactionRadioGroup from "../components/SatisfactionRadioGroup";
import { useParams } from "react-router-dom";

function Evaluation() {
  const [evaluation, setEvaluation] = useState();
  const { codeCentre } = useParams();

  return (
    <div>
      <section className="min-h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
        <div className="space-y-4">
          <h1 className=" mb-10 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
            Evaluez votre niveau de satisfaction concernant notre service.
          </h1>
          <SatisfactionRadioGroup codeCentre={codeCentre} />
        </div>
      </section>
    </div>
  );
}

export default Evaluation;
