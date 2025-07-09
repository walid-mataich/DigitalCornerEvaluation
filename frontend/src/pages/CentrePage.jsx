import React from 'react'
import AdministrateurLayer from '../Layers/AdministrateurLayer'

function CentrePage() {
  return (
    <div>
        <AdministrateurLayer/>
        <div className="pl-64 pt-24 px-4">
  <div className="overflow-x-auto rounded-xl shadow-md ring-1 ring-green-200 ">
    <table className="min-w-full border border-green-200  bg-white  rounded-xl overflow-hidden">
      <thead className="bg-green-50 dark:bg-green-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
            Centre
          </th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
            Ville
          </th>
          <th className="px-6 py-3 text-right text-xs font-bold text-green-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-green-200">
        <tr className="hover:bg-green-50  transition">
          <td className="px-6 py-4 text-green-700  font-medium whitespace-nowrap">
            Centre de Casablanca
          </td>
          <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
            Casablanca
          </td>
          <td className="px-6 py-4 text-right space-x-2">
            <button className="px-4 py-1 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-full">
              Modifier
            </button>
            <button className="px-4 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full">
              Supprimer
            </button>
          </td>
        </tr>
        <tr className="hover:bg-green-50 transition">
          <td className="px-6 py-4 text-green-700  font-medium whitespace-nowrap">
            Centre de Marrakech
          </td>
          <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
            Marrakech
          </td>
          <td className="px-6 py-4 text-right space-x-2">
            <button className="px-4 py-1 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-full">
              Modifier
            </button>
            <button className="px-4 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  )
}

export default CentrePage