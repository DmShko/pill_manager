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
  const coursesSelector = useAppSelector(state => state.pm.courses);
  const statisticsSelector = useAppSelector(state => state.getStatistic.statistics);

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

      if(count !== 0 && getAllDone() !== getAllDuration()) {
      
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
        
        durationCount += Number(c.duration);

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

  return (
   
      <div className={ci.courseItem}>

          {courses.courseName !== '' ? <p className={ci.nameItem}><span className={ci.nameItemTitle}>Course: </span><span className={ci.nameText}>{courses.courseName?.toLocaleUpperCase()} </span><span className={ci.visit}>Date of visit: {courses.visitDate}</span></p>:
           <p className={ci.nameItem}><span className={ci.nameItemTitle}>Course: </span><span className={ci.nameText}>{'unnamed'}</span><span className={ci.visit}>Date of visit: {''}</span></p>}

          <div className={ci.courseSubcontainer}>
            <div className={ci.registryInfo}>
              <p className={ci.infoItem}><span className={ci.title}>Clinic</span><span className={ci.titleCalue}>{courses.clinicName}</span></p>
              <p className={ci.infoItem}><span className={ci.title}>Clinic Cont.</span><span className={ci.titleCalue}>{courses.clinicContacts}</span></p>
              <p className={ci.infoItem}><span className={ci.title}>Doctor</span><span className={ci.titleCalue}>{courses.doctorName}</span></p>
              <p className={ci.infoItem}><span className={ci.title}>Doctor Cont.</span><span className={ci.titleCalue}>{courses.docContacts}</span></p>
            </div>

            <div className={ci.status}>
              <div className={ci.statusContainer} style={statusStyle()}>
                
                <div className={ci.statusIndicator}>
                  <p className={ci.statusItem}><span className={ci.statusTitle}>{calcPartDone() < 100 ? `${calcPartDone()}%` : <Done width={'25px'} height={'25px'}/>}</span></p>
                </div>

              </div>

              <p className={ci.statusText}>{courses.status}</p>

            </div>

            <ul className={ci.coursesPills}>
              {courses.pills.length !== 0 ? courses.pills.map(element => 
                {
                  return <li key={nanoid()} className={ci.pillItem} id={element.id}>
                    <div ><PillImage width={'24px'} height={'24px'}/></div>
                    <p className={ci.pillName}>{element.pillName}</p>
                    <div className={ci.pillTextContainer}>
                      <div className={ci.pillText}><div className={ci.itemIcon}><p className={ci.pillTitle}>per/day</p><Part width={'12px'} height={'12px'}/></div><p className={ci.pillTitleValue}>{element.perDay}</p></div>
                      <div className={ci.pillText}><div className={ci.itemIcon}><p className={ci.pillTitle}>quant.X</p><QuantityPill width={'15px'} height={'15px'}/></div><p className={ci.pillTitleValue}>{element.quantity}</p></div>
                      <div className={ci.pillText}><div className={ci.itemIcon}><p className={ci.pillTitle}>durat.</p><Time width={'15px'} height={'15px'}/></div><p className={ci.pillTitleValue}>{element.duration}</p></div>
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