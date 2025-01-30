import React from 'react'
import StudyMaterialTable from './studyMaterialTable'

const StudyMaterials = () => {
  return (
    <div>
        <div className="flex-heading-button">
            <h1 className="heading">Study Material</h1>
            <button className="button">Add Study Materials</button>
        </div>
        <StudyMaterialTable />
    </div>
  )
}

export default StudyMaterials