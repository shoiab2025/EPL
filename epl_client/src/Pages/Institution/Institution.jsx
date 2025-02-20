import React, { useState } from 'react';
import InstitutionTable from './InstitutionTable';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Institutions = () => {
  const navigate = useNavigate();
  const { institutions } = useUser();
  const [filterText, setFilterText] = useState('');

  const handleAddInstitution = () => {
    navigate('/institutions/add');
  };

  const filteredData = institutions.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Institutions</h2>
        <button className="button" onClick={handleAddInstitution}>
          Add Institution
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Filter:
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </label>
      </div>
      <InstitutionTable institutions={filteredData} />
    </div>
  );
};

export default Institutions;
