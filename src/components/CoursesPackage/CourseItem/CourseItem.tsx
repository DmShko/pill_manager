import { FC } from 'react';
import { nanoid } from 'nanoid';

// my types
import { CourseItemProps } from '../../../types/types';

// styles
import ci from "./CourseItem.module.scss";

// images
import PillImage from '../../SvgComponents/Courses/pillItem/PillImage'; 

import Part from '../../SvgComponents/Courses/Part';

import QuantityPill from '../../SvgComponents/Courses/QuantityPill'; 

import Time from '../../SvgComponents/Courses/Time'; 

const CourseItem: FC<CourseItemProps> = ({ courses }) => {

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
              <div className={ci.statusContainer}>
                
                <div className={ci.statusIndicator}>
                  <p className={ci.statusItem}><span className={ci.statusTitle}>%</span></p>
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