import React from 'react'
import AchivementsTable from './AchivementsTable';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Plus } from 'lucide-react';

const Achivements = () => {
    const navigate = useNavigate()
    const {achivements} = useUser()
    const handleAddAchivements = () => {
        navigate("/achievements/add");
    }
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-screen">
      <div className="flex gap-3 flex-col sm:flex-row items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold text-gray-800">Achivements</h2>
        <button className="button" onClick={handleAddAchivements}>
          <Plus />
        </button>
      </div>
      <div className="mb-4 max-w-full overflow-scroll">
        <AchivementsTable achivements={achivements} />
      </div>
    </div>
  );
}

export default Achivements