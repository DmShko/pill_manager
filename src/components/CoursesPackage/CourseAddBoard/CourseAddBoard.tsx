import { FC, useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik"; 

import * as Yup from 'yup';

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

// async
import { addCourseAPI } from '../../../API/addCourseAPI';
import { patchCourseAPI } from '../../../API/patchCourseAPI';

// images
import Attention from "../../SvgComponents/Courses/Attention";

// my types
import { Pill } from '../../../types/types';

const CourseAddBoard: FC = () => {

  const dispatch = useAppDispatch();
  const tempPillsSelector = useAppSelector(state => state.pm.tempPills);
  const editCourseSelector = useAppSelector(state => state.pm.editCourse);
  const pressEditSelector = useAppSelector(state => state.pm.pressEdit);
  const coursesSelector = useAppSelector(state => state.pm.courses);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

  const [ newCourseId, setNewCourseId ] = useState('');

  useEffect(() => {

    if(pressEditSelector) {

      // get current value of 'editCourseSelector' from 'courses'
      const editCourseValue = coursesSelector.find(element => element._id === editCourseSelector._id);
            
      // refresh editCourse
      if(editCourseValue !== undefined) dispatch(changeEditCourse({mode: 'addEditCourse', data: editCourseValue,}));

    }

    if(newCourseId !== '') {

      const newCourse = coursesSelector.find(element => element._id === newCourseId);

      if(newCourse !== undefined)
      // save course change or new course to DB
      dispatch(addCourseAPI({data: newCourse, token: tokenSelector,}));
    };
    
  },[coursesSelector]);

  // compare 'pills' array in search course in 'coursesSelector'  and 'tempPills' array
  const comparePills = <O, N>(existPills: O, newPills: N): boolean => {

      let pillKey: string[] = [];
      if(existPills !== undefined && (existPills as []).length !== 0) pillKey = Object.keys((existPills as Pill[])[0]);
  
      let result = false;
      
      if((existPills as []).length === (newPills as []).length) {

        for(let o=0; o < (existPills as []).length; o += 1) {

          // compare keys and return true if not equal 
          for(const c of pillKey) {
              
              if((existPills as [])[o][c] !== (newPills as [])[o][c])  result = true;
              
          }
        };
      } else {
        result = true;
      };

    return result;

  };

  // initial for add course or edit course
  const initial = (): FormikValues => {

    let result = {};
    
    if(editCourseSelector._id !== '' && pressEditSelector) {
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
      
      };
    };

    return result;
  };

  const formik = useFormik({

        initialValues: initial(),

        validationSchema: Yup.object({

          courseName: Yup.string().notRequired().max(20, 'Max 20 simbols!').matches(
              /\w{0}[aA-zZаА-яЯ]/,
              { message: 'CourseName should be string' }),
              
          doctorName: Yup.string().notRequired().max(20, 'Max 20 simbols!').matches(
              /\w{0}[aA-zZаА-яЯ]/,
              { message: 'DoctorName should be string' }),

          docContacts: Yup.string().notRequired().max(13, 'Max 13 simbols!').matches(
              /\w{2}[0-9]+\-\w{1}[0-9]+\-\w{1}[0-9]/,
              { message: 'DocContacts format is 000-000-00-00' }),

          clinicName: Yup.string().notRequired().max(20, 'Max 20 simbols!').matches(
              /\w{0}[aA-zZаА-яЯ]/,
              { message: 'ClinicName should be string' }), 
              
          clinicContacts: Yup.string().notRequired().max(13, 'Max 13 simbols!').matches(
            /\w{2}[0-9]+-\w{1}[0-9]+\-\w{1}[0-9]/,
              { message: 'ClinicContacts format is 000-000-00-00' }),  

          visitDate: Yup.string().notRequired().max(10, 'Max 10 simbols!').matches(
            /\w{1}[0-9]+\.\w{1}[0-9]+\.\w{3}[0-9]/,
              { message: 'VisitDate format is 00.00.0000' }),  

      }
    ),
    onSubmit: values => {

      // reset newCourseId
      setNewCourseId('');
      
      if(pressEditSelector) {
   
        // get 'values' keys
        const valuesKeys = Object.keys(values);
        // sort value in 'valuesKeys' and compare with search course future values in state
        // rewrite futures if not equal 
        for(const e of valuesKeys) {
          
          if(values[e] !== editCourseSelector[e as keyof Course]) {
    
            // rewrite not equal future
            dispatch(changeCourses({mode: 'changeCourse', data: {_id: editCourseSelector._id, prop: values[e],}, key: e,})); 

            // rewrite in DB
            dispatch(patchCourseAPI({token: tokenSelector, id: editCourseSelector._id, prop: values[e], key: e,}));
          }
          
        };

        // get old pills from 'coursesSelector'
        const oldPills = coursesSelector.find(element => element._id === editCourseSelector._id)?.pills
 
        // compare pills array
        if(oldPills !== undefined) {
         
          const compare = comparePills<Pill[], Pill[]>(oldPills , tempPillsSelector);

          if(compare) {
          
            // rewrite not equal 'Pills'
            dispatch(changeCourses({mode: 'changeCourse', data: {_id: editCourseSelector._id, prop: tempPillsSelector,}, key: 'pills',})); 

            // rewrite in DB
            dispatch(patchCourseAPI({token: tokenSelector, id: editCourseSelector._id, prop: tempPillsSelector, key: 'pills',}));

          } 
          
        }
        
      } else {

        const courseId = nanoid();

        // save newCourseId
        setNewCourseId(courseId);

        dispatch(changeCourses({ mode: 'addCourse', data: {_id: courseId, selected: false,
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
              
              <label className={cb.courseName}
              style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}} htmlFor="courseName">{languageSelector === 'En' ? 'Course name' : 'Назва курсу'}</label>

              <div className={cb.courseInputsContainer}>

                <input
                  className={cb.coursInputs}
                  id="courseName"
                  name="courseName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.courseName}
                  style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                />

                <div className={cb.messageContainer} style={formik.errors.courseName || formik.errors.doctorName || formik.errors.docContacts || formik.errors.clinicName || formik.errors.clinicContacts || formik.errors.visitDate ? {opacity: '1', } : {opacity: '0'}}>

                  <div className={cb.curtain}>

                    <p style={lightModeSelector === 'dark' ? {backgroundColor: '#242424'} : {backgroundColor: 'white'}}>{languageSelector === 'En' ? 'Invalid form data' : 'Помилка форми'}</p>

                  </div>

                </div>

                <div className={cb.errorInfo}>
                  
                  {languageSelector === 'En'  ? 
                    <>
                   <Attention width={'20px'} height={'20px'}/>
                   <p className={cb.errorInfoItem}
                   style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray'}}>{'CourseName, ClinicName should be string'}</p>
                   <p className={cb.errorInfoItem}
                   style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray'}}>{'DocContacts, ClinicContacts format is 000-000-00-00'}</p>
                   <p className={cb.errorInfoItem}
                   style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray'}}>{'VisitDate format is 00.00.0000'}</p>
                    </>
                    :
                    <>
                    <Attention width={'20px'} height={'20px'}/>
                    <p className={cb.errorInfoItem}
                    style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray'}}>{'Назва курсу, Наз. клін. мають бути строки'}</p>
                    <p className={cb.errorInfoItem}
                    style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray9'}}>{'Конт. лік., Конт. клін. формат 000-000-00-00'}</p>
                    <p className={cb.errorInfoItem}
                    style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'gray'}}>{'Дата візиту формат 00.00.0000'}</p>
                    </>}
                  
                </div>

              </div>

              <div className={cb.infoContainer}>

                <div className={cb.docContainer}>
                  <label htmlFor="doctorName"
                  style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}}>{languageSelector === 'En' ? 'Doctor' : 'Лікар'}</label>
                  <input
                    className={cb.coursInputs}
                    id="doctorName"
                    name="doctorName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.doctorName}
                    style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                  />

                  <label htmlFor="docContacts"
                  style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}}>{languageSelector === 'En' ? 'Doctor contacts' : 'Конт. лікаря'}</label>
                  <input
                    className={cb.coursInputs}
                    id="docContacts"
                    name="docContacts"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.docContacts}
                    style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                  />
                </div>

                <div className={cb.cliContainer}>
                  <label htmlFor="clinicName"
                  style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}}>{languageSelector === 'En' ? 'Clinic' : 'Клініка'}</label>
                  <input
                    className={cb.coursInputs}
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clinicName}
                    style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                  />

                  <label htmlFor="clinicContacts"
                  style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}}>{languageSelector === 'En' ? 'Clinic contacts' : 'Конт. кліники'}</label>
                  <input
                    className={cb.coursInputs}
                    id="clinicContacts"
                    name="clinicContacts"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.clinicContacts}
                    style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                  />
                </div>
                
                <div className={cb.visitContainer}>
                  <label htmlFor="visitDate"
                  style={lightModeSelector === 'dark' ? {color:'#9da1fc'} : {color:'black'}}>{languageSelector === 'En' ? 'Date of visit' : 'Дата візиту'}</label>
                  <input
                    className={cb.coursInputs}
                    id="visitDate"
                    name="visitDate"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.visitDate}
                    style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}
                  />
                </div>

                <button type="submit" className={cb.courseButton} title="Add change"
                style={lightModeSelector === 'dark' ? {backgroundColor:'#9da1fc'} : {backgroundColor:'#f9f9f9'}}>{pressEditSelector ? languageSelector === 'En' ? 'Save change' : 'Зберегти зміни' : languageSelector === 'En' ? 'Create' : 'Створити'}</button>

              </div>

            </form>
            
            <AddPills/>
         
        </div>

  )
}

export default CourseAddBoard