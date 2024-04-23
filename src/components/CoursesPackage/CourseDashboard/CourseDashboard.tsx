import { FC, useState, } from 'react';
import { nanoid } from 'nanoid';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";

import CourseItem from '../CourseItem/CourseItem';

// styles
import { CourseDashboardStyled } from "./CourseDashboard.styled";

// my components
import CourseAddBoard from '../CourseAddBoard/CourseAddBoard'

import DeleteImg from '../../SvgComponents/Courses/Delete'; 

import ChangeImg from '../../SvgComponents/Courses/Edit'; 

const CourseDashboard: FC = () => {

  // const dispatch = useAppDispatch();

  const coursesSelector = useAppSelector(state => state.courses);

  // search cours value
  const [searchCourse, setSearchCourse] = useState('');

  // show/hidden 'add course' board
  const [isAddBoard, setIsAddBoard] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCourse(evt.currentTarget.value);
  };

  const openAddBoard = () => {

    setIsAddBoard(state => !state);
    
  };

  // const deleteCourse = () => {

  //   dispatch();
    
  // };

  return (
    <CourseDashboardStyled>
      <div className='course-dashboard'>
        <label className='us.lab'>
          <input 
            value={searchCourse}
            className='in'
            type="text"
            name='search'              
            onChange={handleChange}
            autoComplete='false'
            title="search"
            placeholder='Courses...'
          />
        </label>  
        <button type='button' onClick={openAddBoard}>{isAddBoard ? 'Close registry' : 'Open registry'}</button>
     
      </div>

      <div className='courses'>

        {isAddBoard && <CourseAddBoard/>}

        <div className='courses-drive'>
          <button className='courses-button' type='button'><ChangeImg width={'25px'} height={'25px'}/></button>
          <button className='courses-button' type='button'><DeleteImg width={'25px'} height={'25px'}/></button>
        </div>

        <ul className='courses-list'>
          {coursesSelector.length !== 0 ? coursesSelector.map(element => 
            {
              return <li className='courses-item' key={nanoid()} id={element.id}><CourseItem courses={element}/></li>  
            }
          ) : 'There are no courses'}
        </ul> 
      </div>
      
    </CourseDashboardStyled>
  )
};

export default CourseDashboard;