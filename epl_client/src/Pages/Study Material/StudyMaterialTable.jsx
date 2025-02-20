import React from 'react';
import StudyMaterialTableRow from './studyMaterialTableRow';

const StudyMaterialTable = ({ studyMaterials }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Material Name</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Material Content</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution Actions</th>
          </tr>
        </thead>
        <tbody>
          {studyMaterials.length !== 0 ? (
            studyMaterials.map((material, index) => (
              <StudyMaterialTableRow key={index} material={material} />
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 px-6 text-center text-gray-500">No Study Material Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudyMaterialTable;
