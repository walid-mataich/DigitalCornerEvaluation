import React, { useState } from 'react'

function Evaluation() {
    const [evaluation, setEvaluation] = useState();
    
    const handleSubmit = (e)=>{
      e.preventDefault();
      
    }

  return (
    <div>
        <section className="min-h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
            
  <div className="space-y-4">
    <h1 className=" mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
      Evaluez votre niveau de satisfaction concernant notre service.
    </h1>
    <form  onSubmit={handleSubmit}>
      <div className="flex flex-col items-center space-y-4">
  <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg 
                  bg-white dark:bg-green-800 w-72 h-16">
    <input 
      value="Très satisfait"
      checked={evaluation === "Très satisfait"}
      onChange={e => setEvaluation(e.target.value)}
      id="radio-tres-satisfait" 
      type="radio" 
      name="bordered-radio" 
      className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 
                 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
    />
    <label 
      htmlFor="radio-tres-satisfait" 
      className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
    >
      Très satisfait
    </label>
  </div>

  <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg 
                  bg-white dark:bg-green-800 w-72 h-16">
    <input 
      value="Satisfait"
      checked={evaluation === "Satisfait"}
      onChange={e => setEvaluation(e.target.value)}
      id="radio-satisfait" 
      type="radio" 
      name="bordered-radio" 
      className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 
                 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
    />
    <label 
      htmlFor="radio-satisfait" 
      className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
    >
      Satisfait
    </label>
  </div>

  <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg 
                  bg-white dark:bg-green-800 w-72 h-16">
    <input 
      value="Peu satisfait"
      checked={evaluation === "Peu satisfait"}
      onChange={e => setEvaluation(e.target.value)}
      id="radio-peu-satisfait" 
      type="radio" 
      name="bordered-radio" 
      className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 
                 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
    />
    <label 
      htmlFor="radio-peu-satisfait" 
      className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
    >
      Peu satisfait
    </label>
  </div>

  <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg 
                  bg-white dark:bg-green-800 w-72 h-16">
    <input 
      value="Pas du tout satisfait"
      checked={evaluation === "Pas du tout satisfait"}
      onChange={e => setEvaluation(e.target.value)}
      id="radio-pas-satisfait" 
      type="radio" 
      name="bordered-radio" 
      className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 
                 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
    />
    <label 
      htmlFor="radio-pas-satisfait" 
      className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
    >
      Pas du tout satisfait
    </label>
  </div>
</div>

    <button
      type="submit"
      className="flex justify-center items-center mt-6 text-white text-base font-semibold
             border border-green-300 dark:border-green-500 rounded-lg
             bg-green-700 hover:bg-green-800 w-72 h-16 mx-auto
             transition duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
      Confirmer
    </button>
    </form>
  </div>
</section>


    </div>
  )
}

export default Evaluation