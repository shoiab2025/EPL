import React from 'react'

const AchivementsTableRow = ({achivement}) => {
    // console.log(achivement)
  return (
    <tr className="hover:bg-gray-50 transition-all duration-300">
      <td className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline">
        {achivement.name}
      </td>
      <td className="table-row-data">{achivement.level}</td>
      <td className="table-row-data">{achivement.minPercentage}</td>
      <td className="table-row-data">{achivement.maxPercentage}</td>
    </tr>
  );
}

export default AchivementsTableRow