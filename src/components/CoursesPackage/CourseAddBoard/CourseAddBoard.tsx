import { useFormik } from "formik"; 
import { nanoid } from "nanoid"; 

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../../app.hooks";
import AddPills  from "./addPills/addPills";

import { changeCourses } from '../../../pmStore/pmSlice';

// styles
import { CourseAddBoardStyled } from "./CourseAddBoard.styled";

const CourseAddBoard = () => {

  const dispatch = useAppDispatch();
  const selectorTempPills = useAppSelector(state => state.tempPills);

  const formik = useFormik({
    initialValues: {
      courseName: '',
      doctorName: '',
      docContacts: '',
      clinicName: '',
      clinicContacts: '',
      visitDate: '',
    },
    onSubmit: values => {
      dispatch(changeCourses({ mode: 'addCourse', data: {id: nanoid(),
        courseName: values.courseName,
        doctorName: values.doctorName,
        docContacts: values.docContacts,
        clinicName: values.clinicName,
        clinicContacts: values.clinicContacts,
        pills: selectorTempPills,}, key: '',}));
    },
  });

  return (
    <CourseAddBoardStyled>
        <div className='course-addboard'>

            <form className="course" onSubmit={formik.handleSubmit}>
              
              <label htmlFor="courseName">Course name</label>
              <input
                id="courseName"
                name="courseName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.courseName}
              />

              <div className="info-container">

                <div className="doc-container">
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

                <div className="cli-container">
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
                
                <div className="visit-container">
                  <label htmlFor="visitDate">Date of visit</label>
                  <input
                    id="visitDate"
                    name="visitDate"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.visitDate}
                  />
                </div>

                <button type="submit" className="course-button">Create</button>

              </div>

            </form>
            
            <AddPills/>
         
        </div>
    </CourseAddBoardStyled>
  )
}

export default CourseAddBoard