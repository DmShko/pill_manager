import { useState, useEffect, } from "react";  

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
import Loading from '../SvgComponents/Courses/Loading/Loading';

const SignIp = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const signInMessageSelector = useAppSelector(state => state.signIn.message);
  const signUpMessageSelector = useAppSelector(state => state.signUp.message);
  const logOutMessageSelector = useAppSelector(state => state.logout.message);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);
  const isLogInSelector = useAppSelector(state => state.signIn.isLogIn);
  const isLoadingSelector = useAppSelector(state => state.signIn.isLoading);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

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

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'email':
        languageSelector === 'En' ? message = 'Invalid email' : message = 'Невірний формат пошти';
      break;

      case 'emailReq':
        languageSelector === 'En' ? message = 'Email field is required': message = "Пошта обов'язкова";
      break;

      case 'passport':
        languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
      break;

      case 'passportReq':
        languageSelector === 'En' ? message = 'Password field is required': message = "Пароль обов'язковий";
      break;

      default:
        break;
    }

    return message;
    
  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/,
          { message: errorMessagesTrans('email')}
        )
        .required(errorMessagesTrans('emailReq')),
      password: Yup.string()
        .min(8, errorMessagesTrans('passport'))
        .required(errorMessagesTrans('passportReq')),
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

      if(isLogInSelector) resetForm();

    },
  });

  return (
    
    <div className={si.container}>

      {alertModalToggle && <PillsModalAlert>

        <div className={si.messageContainer}> <Horn width={'35px'} height={'35px'}/> <p>{signInMessageSelector ? signInMessageSelector: signUpMessageSelector? signUpMessageSelector: logOutMessageSelector ? logOutMessageSelector : ''}</p></div>
              
      </ PillsModalAlert>}

      <div className={si.formWrapper} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'white'}}>

        <form onSubmit={formik.handleSubmit} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}>

          <div className={si.messageContainer} style={formik.errors.email || formik.errors.password ? {width: '230px', } : {width: '0'}}>

            <div className={si.curtain} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}>

              <p>{formik.errors.email ? formik.errors.email : formik.errors.password ? formik.errors.password : signInMessageSelector}</p>

            </div>

          </div>

          <h1 className={si.formTitle}>{languageSelector === 'En' ? 'SignIn': 'Увійти'}</h1>
                  
          <div className={si.itemLabel}> <Lock width={'20px'} height={'20px'} /> <label htmlFor="email">{languageSelector === 'En' ? 'Email': 'Пошта'}</label></div>

          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <div className={si.itemLabel}> <Mail width={'20px'} height={'20px'} /> <label htmlFor="password">{languageSelector === 'En' ? 'Password': 'Пароль'}</label> </div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <button type="submit" className={si.courseButton} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'lightgray'}}>{!isLoadingSelector ? languageSelector === 'En' ? 'Submit': 'Увійти': <Loading width={'30px'} height={'30px'} />}</button>

        </form>

        <p className={si.switch} onClick={() => navigate('/signup')}>{languageSelector === 'En' ? 'to SignUp': 'Створити'}</p>

      </div>

    </div>
  )
}

export default SignIp