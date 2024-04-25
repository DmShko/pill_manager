import { FC, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";

import CourseItem from '../CourseItem/CourseItem';

// styles
import cd from "./CourseDashboard.module.scss";

// my components
import CourseAddBoard from '../CourseAddBoard/CourseAddBoard';

import { changeCourses } from '../../../pmStore/pmSlice';

import DeleteImg from '../../SvgComponents/Courses/Delete'; 

import ChangeImg from '../../SvgComponents/Courses/Edit'; 

const CourseDashboard: FC = () => {

  const dispatch = useAppDispatch();

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

  const courseActions = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if(evt.currentTarget.id === 'delete')
    for(const c of coursesSelector){
        if(c.selected === true) dispatch(changeCourses({ mode: 'deleteCourse', data: c.id, key: '',}));
    }
    
  };

  const selectCourse = (evt: React.MouseEvent<HTMLLIElement>) => {

    const itemId = evt.currentTarget.id;
    
    if(!coursesSelector.find(element => element.id === itemId)?.selected) {
    
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: true,}, key: 'selected',})); 

     
    }else {

  
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: false,}, key: 'selected',})); 

    };

  };

  return (
    <>
      <div className={cd.courseDashboard}>
        <label className={cd.search}>
          <input 
            value={searchCourse}
            className={cd.in}
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

      <div className={cd.courses}>

        {isAddBoard && <CourseAddBoard/>}

        <div className={cd.coursesDrive}>
          <button className={cd.coursesButton} id='changes' onClick={courseActions} type='button'><ChangeImg width={'25px'} height={'25px'}/></button>
          <button className={cd.coursesButton} id='delete' onClick={courseActions} type='button'><DeleteImg width={'25px'} height={'25px'}/></button>
        </div>

        <ul className={cd.coursesList}>
          {coursesSelector.length !== 0 ? coursesSelector.map(element => 
            {
              return <li className={cd.courseItem} key={nanoid()} id={element.id} 
              style={element.selected ? {backgroundColor:'orange'} : {backgroundColor:''}} onClick={selectCourse}><CourseItem courses={element}/></li> 
            }
          ) : 'There are no courses'}
        </ul> 
      </div>
    </>  
  )
};

export default CourseDashboard;