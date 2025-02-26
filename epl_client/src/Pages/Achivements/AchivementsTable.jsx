import React, { useState } from "react";
import AchivementsTableRow from "./AchivementsTableRow";

const AchivementsTable = ({ achivements }) => {
  const [fetch, setFetch] = useState(false)
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Name
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Level
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Minimum %
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Maximum %
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {achivements.length !== 0 ? (
            achivements.map((achivement, index) => (
              <AchivementsTableRow key={index} achivement={achivement} fetch={fetch}  setFetch={setFetch}/>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No Groups Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AchivementsTable;
