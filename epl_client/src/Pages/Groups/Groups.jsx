import React, { useState } from 'react'
import GroupTable from './GroupTable'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Groups = () => {
    const navigate = useNavigate()
    const { groups, handleFilterData } = useUser();
    const [filterText, setFilterText] = useState("")
    const handleAddGroup = () => {
        navigate("/groups/add")
    }

    const filteredData = groups.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
   );
  
  return (
    <div className="">
      <div className="flex-header-with-filter">
        <div className="flex-heading-button">
          <h2 className="heading">Groups</h2>
          <button className="button" onClick={handleAddGroup}>
            Add Groups
          </button>
        </div>
        <label className="flex-label-filter">
          Filter:{" "}
          <input
            type="text"
            className="input-box"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </label>
      </div>
      <GroupTable groups={filteredData} />
    </div>
  );
}

export default Groups