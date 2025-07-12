import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import api from '../api/axios';
import { Link } from 'react-router-dom';

function AdministrateursListe() {
    const [administrateurs, setAdministrateurs] = useState([]);
    const token = localStorage.getItem("TOKEN");
    
    useEffect(() => {
        const fetchAdministrateur = async () =>{
            try {
                const res = await api.get("/superadmin/get-all-users",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                const { adminList = [] } = res.data;
                console.log(res.data);
                setAdministrateurs(adminList)
                
            } catch (error) {
                console.error("Affichage des administrateurs", error.message);
            }
        }   
        
         if (token) {
            fetchAdministrateur();
         }
    },[token])
  return (
    <div>
        <DashboardNavbar />
        <div className="pt-28 flex justify-center px-4">
        <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-md ">
          <div className="flex justify-end mb-4">
           <Link to={"/general/newadmin"}>
            <button className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-lg shadow-md">
              Ajouter un administrateur
            </button></Link>
          </div>

          <table className="min-w-full border border-green-200 bg-white rounded-xl overflow-hidden">
            <thead className="bg-green-50 dark:bg-green-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  prenom
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  centre
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-200">
              {administrateurs.length > 0 ? (
                administrateurs.map((a) => (
                  <tr key={a.idAdministrateur} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4 text-green-700 font-medium whitespace-nowrap">
                      {a.nom}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {a.prenom}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {a.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                         
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="px-4 py-1 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-full">
                        Modifier
                      </button>
                      <button className="px-4 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Aucun administrateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdministrateursListe