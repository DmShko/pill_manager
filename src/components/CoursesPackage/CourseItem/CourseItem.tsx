import { FC } from 'react';
import { nanoid } from 'nanoid';

// my types
import { CourseItemProps } from '../../../types/types';

// styles
import { CourseItemStyled } from "./CourseItem.styled";

const CourseItem: FC<CourseItemProps> = ({ courses }) => {

  return (
    <CourseItemStyled>
      <div className='course-item'>

          {courses.courseName !== '' ? <p className='name-item'><span className='name-item-title'>Course: </span>{courses.courseName}</p> :
           <p className='name-item'><span className='name-item-title'>Course: </span>{'unnamed'}</p>}

          <div className='course-subcontainer'>
            <div className='registry-info'>
              <p className='info-item'><span className='title'>Clinic</span><span className='title-value'>{courses.clinicName}</span></p>
              <p className='info-item'><span className='title'>Clinic Cont.</span><span className='title-value'>{courses.clinicContacts}</span></p>
              <p className='info-item'><span className='title'>Doctor</span><span className='title-value'>{courses.doctorName}</span></p>
              <p className='info-item'><span className='title'>Doctor Cont.</span><span className='title-value'>{courses.docContacts}</span></p>
            </div>

            <div className='status-container'>
              <div className='status-indicator'></div>
              <p className='status-item'><span className='status-title'>Status</span>{courses.status}</p>
            </div>

            <ul className='courses-pills'>
              {courses.pills.length !== 0 ? courses.pills.map(element => 
                {
                  return <li key={nanoid()} className='pill-item' id={element.id}>
                    <p className='pill-name'>{element.pillName}</p>
                    <div className='pill-text-container'>
                      <p className='pill-text'><span className='pill-title'>per/day</span> <span className='pill-title-value'>{element.perDay}</span></p>
                      <p className='pill-text'><span className='pill-title'>quant.</span> <span className='pill-title-value'>{element.quantity}</span></p>
                      <p className='pill-text'><span className='pill-title'>durat.</span> <span className='pill-title-value'>{element.duration}</span></p>
                    </div>
                  </li>  
                }
              ) : 'There are no courses'}
            </ul>

          </div>
      </div>
    </CourseItemStyled>
  )
}

export default CourseItem