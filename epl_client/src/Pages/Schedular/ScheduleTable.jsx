import React, { useState } from 'react'
import ScheduleTableRow from './ScheduleTableRow'

const ScheduleTable = ({schedules}) => {
  const [fetch, setFetch] = useState(false)
  // console.log(schedules)
  return (
    <div className="overflow-x-auto shadow-md rounded-lg max-w-full overflow-scroll">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Test Name
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Start DateTime
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              End DateTime
            </th>
            <th className="py-3 px-4 text-left text-[var(--primary-color)] hidden lg:table-cell">
              Status
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Schedule Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.length !== 0 ? (
            schedules.map((schedule, index) => (
              <ScheduleTableRow
                key={index}
                schedule={schedule}
                fetch={fetch}
                setFetch={setFetch}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No Schedule Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable