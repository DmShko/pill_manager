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
          .min(8, 'Must be 8 characters or more')
          .required('Password field is required'),
        repeatPassword: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .required('RepeatPassword field is required')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
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

      // if(tokenSelector !== '') {
        dispatch(reVerifyAPI({email: formik.values.email}));
      // }else {

      //   setReVerifyMessage('You need to authentifycate');

      // };

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

          <h1 className={su.formTitle}>SignUp</h1>

          <div className={su.itemLabel}> <User width={'20px'} height={'20px'} /> <label htmlFor="name">Name</label> </div>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
                  
          <div className={su.itemLabel}> <Mail width={'20px'} height={'20px'} /> <label htmlFor="email">Email</label> </div>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <div className={su.itemLabel}> <Lock width={'20px'} height={'20px'} /> <label htmlFor="password">Password</label> </div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />

          <div className={su.itemLabel}> <Compare width={'21px'} height={'21px'} /> <label htmlFor="repeatPassword">Repeat Password</label> </div>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
      
          <button type="submit" className={su.courseButton} style={lightModeSelector === 'dark' ? {backgroundColor: '#4b51b9'} : {backgroundColor: 'lightgray'}}>{!isLoadingSelector ? 'Submit' : <Loading width={'30px'} height={'30px'}/>}</button>

          <a className={su.verify} onClick={reverify}>{'Repeat verification letter'}</a>

        </form>

        <p className={su.switch} onClick={() => navigate('/signin')}>{'to SignIn'}</p>

      </div>  

    </div>
  )
}

export default SignUp