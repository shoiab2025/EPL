import React, { useState } from "react";
import GroupTable from "./GroupTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Plus} from "lucide-react";

const Groups = () => {
  const navigate = useNavigate();
  const { groups } = useUser();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleAddGroup = () => {
    navigate("/groups/add");
  };

  const filteredData = groups.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Groups</h2>
        <button className="button" onClick={handleAddGroup}>
          <Plus />
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
      <GroupTable groups={currentItems} />
      <div className="flex justify-center items-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={() =>
            setCurrentPage((prev) =>
              prev * itemsPerPage < filteredData.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * itemsPerPage >= filteredData.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Groups;
