import { useState, useEffect } from "react";  

import { useNavigate  } from 'react-router-dom';  

import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import si from './SignInPackage.module.scss'

import singInAPI from "../../API/signInAPI";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

import PillsModalAlert from '../PillsModalAlert/PillsModalAlert';

import { changeSingIn } from "../../pmStore/signInStore"; 
import { changeSingUp } from "../../pmStore/signUpStore"; 
import { changeLogout } from "../../pmStore/logoutStore";   

// images
import Mail from "../SvgComponents/Courses/Mail";
import Lock from "../SvgComponents/Courses/Lock";
import Horn from '../SvgComponents/Courses/Modal/Horn'; 

const SignIp = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const signInMessageSelector = useAppSelector(state => state.signIn.message);
  const signUpMessageSelector = useAppSelector(state => state.signUp.message);
  const logOutMessageSelector = useAppSelector(state => state.logout.message);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);
  const isLogInSelector = useAppSelector(state => state.signIn.isLogiIn);

  // open/close alert modal window
  const [alertModalToggle, setAlertModalToggle] = useState(false);

  useEffect(() => {
  
    if(isLogInSelector) {

      navigate('/courses');
      dispatch(changeSingIn({operation: 'changeIsLogiIn', data: false}));

    }; 
   
  },[isLogInSelector]);

  useEffect(() => {
  
    if(tokenSelector !== '') dispatch(changeLogout({operation: 'changeIsLogout', data: false}));
   
  },[tokenSelector]);

  useEffect(() => {
  
    if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  },[isLogOutSelector]);

  useEffect(() => {
  
    if(signInMessageSelector !== '' || logOutMessageSelector !== '') {

      setAlertModalToggle(true);

      // clear timer and close modalAlert window
      const alertHandler = () => {

        // close modalAlert window 
        setAlertModalToggle(false);

        clearTimeout(timout);

        dispatch(changeSingUp({operation: 'clearMessage', data: ''}));
        dispatch(changeSingIn({operation: 'clearMessage', data: ''}));
        dispatch(changeLogout({operation: 'clearMessage', data: ''}));

      };

      // start timer and open modalAlert window
      const timout = window.setTimeout(alertHandler, 3000);

    };
    
  },[signInMessageSelector, logOutMessageSelector]);

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/,
          { message: 'Invalid email' }
        )
        .required('Email field is required'),
      password: Yup.string()
        .min(8, 'Min 8 characters')
        .required('Password field is required'),
    }
  ),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(singInAPI({
        email: values.email,
        password: values.password
      }));

      resetForm();

    },
  });

  return (
    <div className={si.container}>

      {alertModalToggle && <PillsModalAlert>

        <div className={si.messageContainer}> <Horn width={'35px'} height={'35px'}/> <p>{signInMessageSelector ? signInMessageSelector: signUpMessageSelector? signUpMessageSelector: logOutMessageSelector ? logOutMessageSelector : ''}</p></div>
              
      </ PillsModalAlert>}

      <form onSubmit={formik.handleSubmit}>

        <div className={si.messageContainer} style={formik.errors.email || formik.errors.password ? {width: '230px', } : {width: '0'}}>

          <div className={si.curtain}>

            <p>{formik.errors.email ? formik.errors.email : formik.errors.password ? formik.errors.password : ''}</p>

          </div>

        </div>

        <h1 className={si.formTitle}>SignIn</h1>
                
        <div className={si.itemLabel}> <Lock width={'20px'} height={'20px'} /> <label htmlFor="email">Email</label></div>

        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <div className={si.itemLabel}> <Mail width={'20px'} height={'20px'} /> <label htmlFor="password">Password</label> </div>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <button type="submit" className={si.courseButton}>Submit</button>

      </form>
    </div>
  )
}

export default SignIp