import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ScheduleTable from './ScheduleTable';

const Scheduler = () => {
  const {schedules} = useUser();
  const navigate = useNavigate()
  const [filterText, setFilterText] = useState("");
  const handleAddSchedule = () => {
    navigate("/schedule/add")
  }
  const filteredData = schedules.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );
  // console.log(schedules);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading">Scheduler</h1>
        <button className="button" onClick={handleAddSchedule}>
          Add Schedule
        </button>
      </div>
      <div>
        <label>
          Filter:
          <input type="text" 
          placeholder='Search from here..'
          value = {filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }} />
        </label>
      </div>
      <ScheduleTable schedules = {filteredData}/>
    </div>
  );
}

export default Scheduler