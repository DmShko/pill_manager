import { FC, useState, useEffect, } from 'react';
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

import { changeIsEdit } from '../../../pmStore/pmSlice';

import { changeTempPills } from '../../../pmStore/pmSlice'; 

import { changePressEdit } from '../../../pmStore/pmSlice';

import PillsModal from '../../PillsModal/PillsModal';

// images
import DeleteImg from '../../SvgComponents/Courses/Delete'; 

import ChangeImg from '../../SvgComponents/Courses/Edit'; 

import Reload from '../../SvgComponents/Courses/Reload'; 

import Details from '../../SvgComponents/Courses/Details'; 

const CourseDashboard: FC = () => {

  const dispatch = useAppDispatch();

  const coursesSelector = useAppSelector(state => state.courses);
  const editCoursesSelector = useAppSelector(state => state.editCourse);
  const pressEditSelector = useAppSelector(state => state.pressEdit);

  // search cours value
  const [isEdit, setIsEdit] = useState(false);
  // show/hidden 'add course' board
  const [isAddBoard, setIsAddBoard] = useState(false);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  // search cours value
  const [searchCourse, setSearchCourse] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCourse(evt.currentTarget.value);
  };

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
      // clear iEdit in storage
      dispatch(changeIsEdit({data: false}));
      dispatch(changePressEdit({ data: false}));
      dispatch(changeTempPills({mode: 'clearPills', data: '', key: ''}));
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

  useEffect(() => {

    if(!isAddBoard) {
      dispatch(changePressEdit({ data: false}));
      dispatch(changeTempPills({mode: 'clearPills', data: '', key: ''}));
    };
    
  },[isAddBoard]);

  const openAddBoard = () => {

    setIsAddBoard(state => !state);

  };

  const openModal = () => {
   
    // toggle modal window
    setModalToggle(state => !state);
     
  };

  const courseActions = (evt: React.MouseEvent<HTMLButtonElement>) => {

    switch(evt.currentTarget.id) {

      case 'delete':
        for(const c of coursesSelector){
          if(c.selected === true) dispatch(changeCourses({ mode: 'deleteCourse', data: c.id, key: '',}));
        }
        break;
      case 'edit':
        setIsAddBoard(true);
        dispatch(changePressEdit({ data: true}));
        break;
      default:
        break;
    }

  };

  const selectCourse = (evt: React.MouseEvent<HTMLLIElement>) => {

    const itemId = evt.currentTarget.id;
    
    if(!coursesSelector.find(element => element.id === itemId)?.selected) {
    
      // activated 'edit' mode
      setIsEdit(true);
      // set iEdit in storage
      dispatch(changeIsEdit({data: true}))
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: true,}, key: 'selected',})); 

    }else {
  
      dispatch(changeCourses({mode: 'changeCourse', data: {id: itemId, prop: false,}, key: 'selected',})); 

    };

  };

  const messageCreator = () => {

    let message = '';

    if(pressEditSelector) message = 'EDIT mode ON';

    return message;

  };

  return (
    <>
      
      <button type='button' onClick={openAddBoard}>{pressEditSelector ? 'Close' : isAddBoard ? 'Close' : 'New course'}</button>
     

      <div className={cd.courses}>

        {isAddBoard && <CourseAddBoard/>}

        <div className={cd.searchContainer}>

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

          </div>
            
          <div className={cd.coursesDrive}>
            <button className={cd.coursesButton} id='edit' onClick={courseActions} type='button' disabled={!isAddBoard ? detectSelected() > 0 && detectSelected() <= 1 ? false : true : true}><ChangeImg width={'25px'} height={'25px'} stroke={!isAddBoard ? detectSelected() > 0 && detectSelected() <= 1 ? '#646cff' : 'lightgray' : '#646cff'}/></button>
            <button className={cd.coursesButton} id='delete' onClick={courseActions} type='button' disabled={detectSelected() !== 0 ? false : true}><DeleteImg width={'25px'} height={'25px'} stroke={detectSelected() !== 0 ? '#646cff' : 'lightgray'}/></button>
            <button className={cd.coursesButton} id='reload' onClick={courseActions} type='button' disabled={detectSelected() !== 0 ? false : true}><Reload width={'25px'} height={'25px'}/></button>
            <button className={cd.coursesButton} id='details' onClick={openModal} type='button' disabled={detectSelected() !== 0 ? false : true}><Details width={'25px'} height={'25px'} fill={detectSelected() !== 0 ? '#646cff' : 'lightgray'}/></button>
          </div>

          <div className={cd.coursesInfo}>
            <p className={cd.text}>{messageCreator()}</p>
          </div>

        </div>

        {modalToggle && <PillsModal openClose={openModal}>

          <div></div>
          
        </ PillsModal>}

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