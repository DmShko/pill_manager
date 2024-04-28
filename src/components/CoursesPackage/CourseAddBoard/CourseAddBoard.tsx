import { FC, useEffect } from "react";
import { FormikValues, useFormik } from "formik"; 
import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";
import AddPills  from "./addPills/addPills";

import { changeCourses } from '../../../pmStore/pmSlice';

// styles
import cb from "./CourseAddBoard.module.scss";
import { Course } from "../../../types/types";

// my components
import { changeEditCourse } from '../../../pmStore/pmSlice';

const CourseAddBoard: FC  = () => {

  const dispatch = useAppDispatch();
  const tempPillsSelector = useAppSelector(state => state.tempPills);
  const editCourseSelector = useAppSelector(state => state.editCourse);
  const pressEditSelector = useAppSelector(state => state.pressEdit);
  const coursesSelector = useAppSelector(state => state.courses);

  useEffect(() => {

    if(pressEditSelector) {

      // get current value of 'editCourseSelector' from 'courses'
      const editCourseValue = coursesSelector.find(element => element.id === editCourseSelector.id);
            
      // refresh editCourse
      if(editCourseValue !== undefined) dispatch(changeEditCourse({mode: 'addEditCourse', data: editCourseValue,}));

    }

  },[coursesSelector]);

  // initial for add course or edit course
  const initial = (): FormikValues => {

    let result = {};
    
    if(editCourseSelector.id !== '' && pressEditSelector) {
      result = {
        courseName: editCourseSelector.courseName,
        doctorName: editCourseSelector.doctorName,
        docContacts: editCourseSelector.docContacts,
        clinicName: editCourseSelector.clinicName,
        clinicContacts: editCourseSelector.clinicContacts,
        visitDate: editCourseSelector.visitDate,
      }
    } else {
      result = {
        courseName: '',
        doctorName: '',
        docContacts: '',
        clinicName: '',
        clinicContacts: '',
        visitDate: '',
      }
    };

    return result;
  };

  const formik = useFormik({
    initialValues: initial(),
    onSubmit: values => {
      if(pressEditSelector) {
        // get 'values' keys
        const valuesKeys = Object.keys(values);
        // sort value in 'valuesKeys' and compare with search course future values in state
        // rewrite futures if not equal 
        for(const e of valuesKeys) {
          if(values[e] !== editCourseSelector[e as keyof Course]) {
    
            // rewrite not equal future
            dispatch(changeCourses({mode: 'changeCourse', data: {id: editCourseSelector.id, prop: values[e],}, key: e,})); 

          }
        };
      } else {
        dispatch(changeCourses({ mode: 'addCourse', data: {id: nanoid(), selected: false,
        courseName: values.courseName,
        doctorName: values.doctorName,
        docContacts: values.docContacts,
        clinicName: values.clinicName,
        clinicContacts: values.clinicContacts,
        pills: tempPillsSelector, visitDate: values.visitDate}, key: '', }));
      };
    },
  });

  return (
    
        <div className={cb.courseAddboard}>

            <form className={cb.course} onSubmit={formik.handleSubmit}>
              
              <label htmlFor="courseName">Course name</label>
              <input
                id="courseName"
                name="courseName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.courseName}
              />

              <div className={cb.infoContainer}>

                <div className={cb.docContainer}>
                  <label htmlFor="doctorName">Doctor</label>
                  <input
                    id="doctorName"
                    name="doctorName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.doctorName}
                  />

                  <label htmlFor="docContacts">Doctor contacts</label>
                  <input
                    id="docContacts"
                    name="docContacts"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.docContacts}
                  />
                </div>

                <div className={cb.cliContainer}>
                  <label htmlFor="clinicName">Clinic</label>
                  <input
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clinicName}
                  />

                  <label htmlFor="clinicContacts">Clinic contacts</label>
                  <input
                    id="clinicContacts"
                    name="clinicContacts"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clinicContacts}
                  />
                </div>
                
                <div className={cb.visitContainer}>
                  <label htmlFor="visitDate">Date of visit</label>
                  <input
                    id="visitDate"
                    name="visitDate"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.visitDate}
                  />
                </div>

                <button type="submit" className={cb.courseButton}>{pressEditSelector ? 'Save change' : 'Create'}</button>

              </div>

            </form>
            
            <AddPills/>
         
        </div>

  )
}

export default CourseAddBoard