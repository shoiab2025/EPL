import React from 'react'
import AchivementsTable from './AchivementsTable';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Achivements = () => {
    const navigate = useNavigate()
    const {achivements} = useUser()
    const handleAddAchivements = () => {
        navigate("/achievements/add");
    }
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Achivements</h2>
        <button className="button" onClick={handleAddAchivements}>Add Achivements</button>
      </div>
      <div className="mb-4">
        <AchivementsTable achivements = {achivements}/>
      </div>
    </div>
  );
}

export default Achivements