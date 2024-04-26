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

import { changeEditCourse } from '../../../pmStore/pmSlice';

// images

import DeleteImg from '../../SvgComponents/Courses/Delete'; 

import ChangeImg from '../../SvgComponents/Courses/Edit'; 

const CourseDashboard: FC = () => {

  const dispatch = useAppDispatch();

  const coursesSelector = useAppSelector(state => state.courses);
  const editCoursesSelector = useAppSelector(state => state.editCourse);

  // search cours value
  const [searchCourse, setSearchCourse] = useState('');
  // search cours value
  const [isEdit, setIsEdit] = useState(false);
  // show/hidden 'add course' board
  const [isAddBoard, setIsAddBoard] = useState(false);

  // how many courses has 'selected' field as 'true'
  const detectSelected = () => {

    let countSelected = 0;

    coursesSelector.forEach(element => {
      if(element.selected) countSelected += 1;
    });

    return countSelected;

  };

  // get course has 'selected' field as 'true'
  const getSelectedCourse = () => {

    if(detectSelected() === 1) {

      const editCourse = coursesSelector.find(element => element.selected === true);

      if(editCourse !== undefined) return editCourse;
    };

  };

  useEffect(() => {

    // when only with edit mode
    if(detectSelected() != 1 && isEdit) {
      setIsEdit(false);
      setIsAddBoard(false);

      // clear edit course
      dispatch(changeEditCourse({mode: 'clearEditCourse', data: editCoursesSelector,}));
    } 

  },[coursesSelector]);

  useEffect(() => {

    // get edit course
    const search = getSelectedCourse();
    // save edit course
    if(search !== undefined)  dispatch(changeEditCourse({mode: 'addEditCourse', data: search,}));
    
  },[isEdit]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCourse(evt.currentTarget.value);
  };

  const openAddBoard = () => {

    setIsAddBoard(state => !state);
    
  };

  const courseActions = (evt: React.MouseEvent<HTMLButtonElement>) => {

    switch(evt.currentTarget.id) {

      case 'delete':
        for(const c of coursesSelector){
          if(c.selected === true) dispatch(changeCourses({ mode: 'deleteCourse', data: c.id, key: '',}));
        }
        break;
      case 'edit':
        setIsEdit(true);
        setIsAddBoard(true);
        break;
      default:
        break;
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
          <button className={cd.coursesButton} id='edit' onClick={courseActions} type='button' disabled={detectSelected() > 0 && detectSelected() <= 1 ? false : true}><ChangeImg width={'25px'} height={'25px'}/></button>
          <button className={cd.coursesButton} id='delete' onClick={courseActions} type='button' disabled={detectSelected() !== 0 ? false : true}><DeleteImg width={'25px'} height={'25px'}/></button>
        </div>

        <ul className={cd.coursesList}>
          {coursesSelector.length !== 0 ? coursesSelector.map(element => 
            {
              return <li className={cd.courseItem} key={nanoid()} id={element.id} 
              style={element.selected ? {backgroundColor:'rgb(255, 179, 0, 0.8)'} : {backgroundColor:''}} onClick={selectCourse}><CourseItem courses={element}/></li> 
            }
          ) : 'There are no courses'}
        </ul> 
      </div>
    </>  
  )
};

export default CourseDashboard;