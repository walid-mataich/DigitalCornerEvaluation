import React, { useState } from 'react'

function Evaluation() {
    const [evaluation, setEvaluation] = useState();
    


  return (
    <div>
        <section className="min-h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
            
  <div className="space-y-4">
    <h1 className=" mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
      Evaluez votre niveau de satisfaction concernant notre service.
    </h1>
    <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg bg-white dark:bg-green-800 w-72 h-16 mx-auto">
      <input 
        id="bordered-radio-1" 
        type="radio" 
        name="bordered-radio" 
        className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
      />
      <label 
        htmlFor="bordered-radio-1" 
        className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
      >
        Très satisfait
      </label>
    </div>

    <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg bg-white dark:bg-green-800 w-72 h-16 mx-auto">
      <input 
        id="bordered-radio-2" 
        type="radio" 
        name="bordered-radio" 
        defaultChecked 
        className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
      />
      <label 
        htmlFor="bordered-radio-2" 
        className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
      >
        Satisfait
      </label>
    </div>
    <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg bg-white dark:bg-green-800 w-72 h-16 mx-auto">
      <input 
        id="bordered-radio-2" 
        type="radio" 
        name="bordered-radio" 
        defaultChecked 
        className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
      />
      <label 
        htmlFor="bordered-radio-2" 
        className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
      >
        Peu Satisfait
      </label>
    </div>
    <div className="flex items-center ps-4 border border-green-300 dark:border-green-500 rounded-lg bg-white dark:bg-green-800 w-72 h-16 mx-auto">
      <input 
        id="bordered-radio-2" 
        type="radio" 
        name="bordered-radio" 
        defaultChecked 
        className="w-5 h-5 text-green-700 bg-white border-green-400 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-green-700 dark:border-green-400"
      />
      <label 
        htmlFor="bordered-radio-2" 
        className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
      >
        Pas du tout satisfait
      </label>
    </div>
  </div>
</section>


    </div>
  )
}

export default Evaluation