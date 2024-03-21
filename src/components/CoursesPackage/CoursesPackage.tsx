import { FC } from 'react'

// styles
import { CoursesPackageStyled } from "./CoursesPackage.styled";

const CoursesPackage: FC = () => {
  return (
    <CoursesPackageStyled>
      <div className='course-container'>
        No Courses
      </div>
    </CoursesPackageStyled>
  )
}

export default CoursesPackage