import { useFormik } from "formik"; 

import * as Yup from 'yup';

// style
import su from './SignUpPackage.module.scss'

import singUpAPI from "../../API/signUpAPI";

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

// images
import User from "../SvgComponents/Courses/User";
import Mail from "../SvgComponents/Courses/Mail";
import Lock from "../SvgComponents/Courses/Lock";

const SignUp = () => {

  const dispatch = useAppDispatch();

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
    onSubmit: values => {

      if(values.password === values.repeatPassword) {
        dispatch(singUpAPI({
          name: values.name,
          email: values.email,
          password: values.password
        }));
      };
      
    },
  });

  return (

    <div className={su.container}>
      <form onSubmit={formik.handleSubmit}>

      <div className={su.messageContainer} style={formik.errors.email || formik.errors.password || formik.errors.repeatPassword? {width: '230px', } : {width: '0'}}>

        <div className={su.curtain}>

          <p>{formik.errors.email ? formik.errors.email : formik.errors.password ? formik.errors.password : formik.errors.repeatPassword ? formik.errors.repeatPassword : ''}</p>

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
        />
                
        <div className={su.itemLabel}> <Mail width={'20px'} height={'20px'} /> <label htmlFor="email">Email</label> </div>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <div className={su.itemLabel}> <Lock width={'20px'} height={'20px'} /> <label htmlFor="password">Password</label> </div>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <div className={su.itemLabel}> <Lock width={'20px'} height={'20px'} /> <Lock width={'20px'} height={'20px'} /> <label htmlFor="repeatPassword">Repeat Password</label> </div>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
        />
    
        <button type="submit" className={su.courseButton}>Submit</button>

      </form>
    </div>
  )
}

export default SignUp