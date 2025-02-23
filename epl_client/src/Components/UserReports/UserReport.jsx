import React from 'react';
import UserReportTable from './UserReportTable';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUser } from '../../context/UserContext';

const UserReport = () => {
  const {users} = useUser()

  // const generatePDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("User Details", 14, 20);

  //   const tableColumn = [
  //     "User ID",
  //     "Name",
  //     "Education",
  //     "InstitutionId",
  //     "Email",
  //     "Phone",
  //     "Address",
  //     "DOB",
  //     "Role",
  //   ];
    
  //   const tableRows = users.map((user) => [
  //     user.userId,
  //     user.name,
  //     user.educationLevel || "N/A",
  //     user.institution,
  //     user.email,
  //     user.phoneNo,
  //     user.address || "N/A",
  //     new Date(user.dob).toLocaleDateString(),
  //     user.role,
  //   ]);

  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 30, // Start position
  //     styles: { fontSize: 10, cellPadding: 3 },
  //     theme: "grid",
  //     margin: { top: 20 },
  //   });

  //   doc.save("users.pdf");
  // };


  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Details", 10, 15); // Adjusted top position

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
      startY: 22, // Move table slightly up
      styles: { fontSize: 9, cellPadding: 2 }, // Slightly reduced font size & padding
      theme: "grid",
      margin: { left: 5, right: 5, top: 10 }, // Reduced left & right margin
      tableWidth: "auto", // Ensures table takes less space
    });

    doc.save("users.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">User Reports</h1>
        <button className="button" onClick={generatePDF}>Download</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <UserReportTable />
      </div>
    </div>
  );
};

export default UserReport;
