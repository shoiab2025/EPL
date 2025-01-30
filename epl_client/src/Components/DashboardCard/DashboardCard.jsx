import React from 'react'

const DashboardCard = ({stat}) => {
  return (
    <div className="px-5 py-3 bg-[var(--card-background-color)] rounded-lg">
        <h1 className="font-semibold text-lg mb-2">{stat.label}</h1>
        <div className="flex items-center gap-4">
            <stat.icon className="text-[var(--primary-color)] text-5xl" />
            <p className="font-semibold text-xl">{stat.value}</p>
        </div>
    </div>
  )
}

export default DashboardCard