import React from 'react'
import UserReportTable from './UserReportTable'

const UserReport = () => {
  return (
    <div className="">
        <div className="flex-heading-button">
            <h1 className="heading">User Reports</h1>
            <button className="button">Download</button>
        </div>
        <UserReportTable />
    </div>
  )
}

export default UserReport