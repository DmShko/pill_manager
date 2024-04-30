import { FC, useState } from 'react'

// styles
import cp from "./CoursesPackage.module.scss";

// my components
import CourseDashboard from './CourseDashboard/CourseDashboard';


const CoursesPackage: FC = () => {

  return (
    
    <div className={cp.courseContainer}>
      <CourseDashboard />
    </div>
    
  )
}

export default CoursesPackage