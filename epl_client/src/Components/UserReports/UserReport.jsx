import React, { useState } from "react";
import UserReportTable from "./UserReportTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUser } from "../../context/UserContext";

const UserReport = () => {
  const { users } = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Details", 10, 15);

    const tableColumn = [
      "User ID",
      "Name",
      "Education",
      "InstitutionId",
      "Email",
      "Phone",
      "Address",
      "DOB",
      "Role",
    ];

    const tableRows = users.map((user) => [
      user.userId,
      user.name,
      user.educationLevel || "N/A",
      user.institution,
      user.email,
      user.phoneNo,
      user.address || "N/A",
      new Date(user.dob).toLocaleDateString(),
      user.role,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 9, cellPadding: 2 },
      theme: "grid",
      margin: { left: 5, right: 5, top: 10 },
      tableWidth: "auto",
    });

    doc.save("users.pdf");
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">User Reports</h1>
        <button className="button" onClick={generatePDF}>
          Download
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <UserReportTable users={paginatedUsers} />
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded-md"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
           &gt;
        </button>
      </div>
    </div>
  );
};

export default UserReport;

