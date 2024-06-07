import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"; 

import * as Yup from 'yup';

// style
import su from './SignUpPackage.module.scss'

import singUpAPI from "../../API/signUpAPI";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

import PillsModalAlert from '../PillsModalAlert/PillsModalAlert';

import reVerifyAPI from '../../API/reVerifyAPI';

import { changeSingIn } from "../../pmStore/signInStore"; 
import { changeSingUp } from "../../pmStore/signUpStore";  
import { changeLogout } from "../../pmStore/logoutStore";  
import { changeReVerify } from "../../pmStore/reVerifyStore";

// images
import User from "../SvgComponents/Courses/User";
import Mail from "../SvgComponents/Courses/Mail";
import Lock from "../SvgComponents/Courses/Lock";
import Compare from "../SvgComponents/Courses/Compare";
import Horn from '../SvgComponents/Courses/Modal/Horn'; 
import Loading from '../SvgComponents/Courses/Loading/Loading';

const SignUp = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const signInMessageSelector = useAppSelector(state => state.signIn.message);
  const signUpMessageSelector = useAppSelector(state => state.signUp.message);
  const isSignUpSelector = useAppSelector(state => state.signUp.isSignUp);
  const logOutMessageSelector = useAppSelector(state => state.logout.message);
  const reVerifyMessageSelector = useAppSelector(state => state.reVerify.message);
  const isLogOutSelector = useAppSelector(state => state.logout.isLogout);
  const isLoadingSelector = useAppSelector(state => state.signUp.isLoading);
  const lightModeSelector = useAppSelector(state => state.pm.lightMode);
  const languageSelector = useAppSelector(state => state.pm.language);

  // open/close alert modal window
  const [alertModalToggle, setAlertModalToggle] = useState(false);

  const [reVerifyMessage, setReVerifyMessage] = useState('');

  useEffect(() => {
  
    if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  },[isLogOutSelector]);

  useEffect(() => {
  
    if(signUpMessageSelector !== '' || reVerifyMessageSelector !== '' || logOutMessageSelector !== '' || reVerifyMessage != '' || reVerifyMessageSelector !== '') {

      setAlertModalToggle(true);

      // clear timer and close modalAlert window
      const alertHandler = () => {

        // close modalAlert window 
        setAlertModalToggle(false);

        clearTimeout(timout);

        dispatch(changeSingIn({operation: 'clearMessage', data: ''}));
        dispatch(changeSingUp({operation: 'clearMessage', data: ''}));
        dispatch(changeLogout({operation: 'clearMessage', data: ''}));
        dispatch(changeReVerify({operation: 'clearMessage', data: ''}));

        setReVerifyMessage('');

      };

      // start timer and open modalAlert window
      const timout = window.setTimeout(alertHandler, 3000);

    };
    
  },[signUpMessageSelector, logOutMessageSelector, reVerifyMessage, reVerifyMessageSelector]);

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'email':
        languageSelector === 'En' ? message = 'Invalid email': message = 'Невірний формат пошти';
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

      case 'passportRep':
        languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
      break;

      case 'passportRepReq':
        languageSelector === 'En' ? message = 'RepeatPassword field is required': message = "Повторіть пароль";
      break;

      case 'passportMatch':
        languageSelector === 'En' ? message = 'Passwords must match': message = "Паролі мають збігатися";
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
        repeatPassword: Yup.string()
          .min(8, errorMessagesTrans('passportRep'))
          .required(errorMessagesTrans('passportRepReq'))
          .oneOf([Yup.ref('password')], errorMessagesTrans('passportMatch')),
                            // ,null^
      }
    ),

    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: (values, { resetForm }) => {

      if(values.password === values.repeatPassword) {
        dispatch(singUpAPI({
          name: values.name,
          email: values.email,
          password: values.password
        }));
      };

      if(isSignUpSelector) resetForm();
      
    },
  });

  const reverify = () => {

    if(formik.values.email !== '') {
    
        dispatch(reVerifyAPI({email: formik.values.email}));
     
    }else {
      setReVerifyMessage('Email not found');
    };

  };

  return (

    <div className={su.container}>

      {alertModalToggle && <PillsModalAlert>

        <div className={su.messageContainer}> <Horn width={'35px'} height={'35px'}/> <p>{signInMessageSelector ? signInMessageSelector: signUpMessageSelector? signUpMessageSelector: logOutMessageSelector ? logOutMessageSelector : reVerifyMessage? reVerifyMessage : reVerifyMessageSelector ? reVerifyMessageSelector : ''}</p></div>
                
      </ PillsModalAlert>}
      <div className={su.formWrapper} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'white'}}>
       
        <form onSubmit={formik.handleSubmit} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}>

        <div className={su.messageContainer} style={formik.errors.email || formik.errors.password || formik.errors.repeatPassword? {width: '230px', } : {width: '0'}}>

          <div className={su.curtain} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}>

            <p>{formik.errors.email ? formik.errors.email : formik.errors.password ? formik.errors.password : formik.errors.repeatPassword ? formik.errors.repeatPassword : signUpMessageSelector}</p>

          </div>

        </div>

          <h1 className={su.formTitle}>{languageSelector === 'En' ? 'SignUp': 'Створити'}</h1>

          <div className={su.itemLabel}> <User width={'20px'} height={'20px'} /> <label htmlFor="name">{languageSelector === 'En' ? 'Name': "Ім'я"}</label> </div>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
                  
          <div className={su.itemLabel}> <Mail width={'20px'} height={'20px'} /> <label htmlFor="email">{languageSelector === 'En' ? 'Email': 'Пошта'}</label> </div>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <div className={su.itemLabel}> <Lock width={'20px'} height={'20px'} /> <label htmlFor="password">{languageSelector === 'En' ? 'Password': 'Пароль'}</label> </div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <div className={su.itemLabel}> <Compare width={'21px'} height={'21px'} /> <label htmlFor="repeatPassword">{languageSelector === 'En' ? 'Repeat Password': 'Повторити пароль'}</label> </div>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
      
          <button type="submit" className={su.courseButton} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'lightgray'}}>{!isLoadingSelector ? languageSelector === 'En' ? 'Submit': 'Створити' : <Loading width={'30px'} height={'30px'}/>}</button>

          <a className={su.verify} onClick={reverify}>{languageSelector === 'En' ? 'Repeat verification letter': 'Повторний лист верифікації'}</a>

        </form>

        <p className={su.switch} onClick={() => navigate('/signin')}>{languageSelector === 'En' ? 'to SignIn': 'Увійти'}</p>

      </div>  

    </div>
  )
}

export default SignUp