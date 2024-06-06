import { FC, useEffect} from 'react';
import { nanoid } from 'nanoid';

// own dispatch hook
import { useAppSelector, useAppDispatch} from "../../../app.hooks";

// my types
import { CourseItemProps } from '../../../types/types';

import patchCourseAPI from '../../../API/patchCourseAPI';

// styles
import ci from "./CourseItem.module.scss";

// images
import PillImage from '../../SvgComponents/Courses/pillItem/PillImage'; 

import Part from '../../SvgComponents/Courses/Part';

import QuantityPill from '../../SvgComponents/Courses/QuantityPill'; 

import Time from '../../SvgComponents/Courses/Time'; 

import Done from '../../SvgComponents/Courses/Modal/Success'; 

const CourseItem: FC<CourseItemProps> = ({ courses }) => {

  const dispatch = useAppDispatch();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const isLogInSelector = useAppSelector(state => state.signIn.isLogIn);
  const coursesSelector = useAppSelector(state => state.pm.courses);
  const statisticsSelector = useAppSelector(state => state.getStatistic.statistics);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);

  useEffect(() => {

    const currentCourse = coursesSelector.find(element => element._id === courses._id);
    let count = 0;

    if(currentCourse !== undefined) {
      
      if(currentCourse.pills.length !== 0) {

        for(const p of currentCourse.pills) {

          if(p.startDay !== '') count += 1;

        };
      };
     
      if(count === 0) {
        // not active
        // rewrite in DB

        dispatch(patchCourseAPI({token: tokenSelector, id: courses._id, prop: 'not active', key: 'status',}));
      };

      // done
      if(getAllDone() === getAllDuration()) {
        
        // rewrite in DB
        dispatch(patchCourseAPI({token: tokenSelector, id: courses._id, prop: 'done', key: 'status',}));

      } 

      if(count !== 0 && getAllDone() !== getAllDuration() && isLogInSelector) {
 
        // rewrite in DB
        dispatch(patchCourseAPI({token: tokenSelector, id: courses._id, prop: 'not done', key: 'status',}));
      };

    };

  },[])

  function getAllDuration() {

    const currentCourse = coursesSelector.find(element => element._id === courses._id);

    let durationCount = 0;

    if(currentCourse !== undefined) {

      // sort all pills and get duration values from each
      for(const c of currentCourse.pills) {

        durationCount += Number(c.frozyDuration);

      };

    };

    return durationCount;

  };

  function getAllDone(){

    let doneCount = 0;

    for(const s of statisticsSelector) {

      if(!s.reschedule) {

        if(s.done) doneCount += 1;

      }

    };
   
    return doneCount;

  };

  const calcPartDone = () => {

    let result = 0;

    if(getAllDuration() !== 0) result = Math.round((getAllDone() *100) / getAllDuration());
    
    return result;

  };

  const statusStyle = () => {

    const allDuration = getAllDuration();
    const allDone = getAllDone();
  
    if(allDuration !== 0)
    return {background: `conic-gradient(blue 0deg ${Math.round((allDone * 360)/allDuration)}deg, lightgray ${Math.round((allDone * 360)/allDuration)}deg 360deg`}

  };

  const getFrozyDuration = ( data: string ) => {

    const currentCourse = coursesSelector.find(element => element._id === courses._id);

    if(currentCourse !== undefined) {

      const currentPill = currentCourse.pills.find(element => element.id === data);
      return currentPill?.frozyDuration;
    }
       
  };

  return (
   
      <div className={ci.courseItem}>

          {courses.courseName !== '' ? <p className={ci.nameItem}><span className={ci.nameItemTitle} style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'blue'}}>Course: </span><span className={ci.nameText} style={courses.selected ? {backgroundColor:'white'} : {backgroundColor:'pink',}}>{courses.courseName?.toLocaleUpperCase()} </span><span className={ci.visit} style={lightModeSelector === 'dark' ? {color:'white'} : {color:'#4b51b9'}}>Date of visit: {courses.visitDate}</span></p>:
           <p className={ci.nameItem}><span className={ci.nameItemTitle}>Course: </span><span className={ci.nameText}
              style={courses.selected ? {backgroundColor:'white'} : {backgroundColor:'rgb(255, 179, 0, 0.8)'}}>{'unnamed'}</span><span className={ci.visit}>Date of visit: {''}</span></p>}

          <div className={ci.courseSubcontainer} style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'white'}}>
            <div className={ci.registryInfo}  style={lightModeSelector === 'dark' ? {border: 'none'} : {border: '2px solid white'}}>
              <p className={ci.infoItem} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}><span className={ci.title}>Clinic</span><span className={ci.titleCalue}>{courses.clinicName}</span></p>
              <p className={ci.infoItem} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}><span className={ci.title}>Clinic Cont.</span><span className={ci.titleCalue}>{courses.clinicContacts}</span></p>
              <p className={ci.infoItem} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}><span className={ci.title}>Doctor</span><span className={ci.titleCalue}>{courses.doctorName}</span></p>
              <p className={ci.infoItem} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}><span className={ci.title}>Doctor Cont.</span><span className={ci.titleCalue}>{courses.docContacts}</span></p>
            </div>

            <div className={ci.status}>
              <div className={ci.statusContainer} style={statusStyle()}>
                
                <div className={ci.statusIndicator}>
                  <p className={ci.statusItem}><span className={ci.statusTitle}>{calcPartDone() < 100 ? `${calcPartDone()}%` : <Done width={'25px'} height={'25px'}/>}</span></p>
                </div>

              </div>

              <p className={ci.statusText}>{courses.status}</p>

            </div>

            <ul className={ci.coursesPills} style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'white'}}>
              {courses.pills.length !== 0 ? courses.pills.map(element => 
                {
                  return <li key={nanoid()} className={ci.pillItem} id={element.id} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'white'}}>
                    <div ><PillImage width={'24px'} height={'24px'}/></div>
                    <p className={ci.pillName} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9', color:'lightgray'} : {backgroundColor: 'white'}}>{element.pillName}</p>
                    <div className={ci.pillTextContainer}>
                      <div className={ci.pillText}><div className={ci.itemIcon}><p className={ci.pillTitle}>per/day</p><Part width={'12px'} height={'12px'}/></div><p className={ci.pillTitleValue}>{element.perDay}</p></div>
                      <div className={ci.pillText}><div className={ci.itemIcon}><p className={ci.pillTitle}>quant.X</p><QuantityPill width={'15px'} height={'15px'}/></div><p className={ci.pillTitleValue}>{element.quantity}</p></div>
                      <div className={ci.pillTextDuration}><div className={ci.itemIcon}><p className={ci.pillTitle}>durat.</p><Time width={'15px'} height={'15px'}/></div><div className={ci.durationText}><p className={ci.pillDurationTitleFrozy}>{getFrozyDuration(element.id)}{'/'}</p><p className={ci.pillDurationTitle}>{element.duration}</p></div></div>
                    </div>
                  </li>  
                }
              ) : 'There are no pills'}
            </ul>

          </div>
      </div>
  
  )
}

export default CourseItem