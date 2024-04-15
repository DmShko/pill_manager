import { FC } from 'react'

// styles
import { CoursesPackageStyled } from "./CoursesPackage.styled";

// my components
import CourseDashboard from './CourseDashboard/CourseDashboard';

const CoursesPackage: FC = () => {
  return (
    <CoursesPackageStyled>
      <div className='course-container'>
        <CourseDashboard />
      </div>
    </CoursesPackageStyled>
  )
}

export default CoursesPackage