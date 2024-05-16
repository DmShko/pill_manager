import { useFormik } from "formik"; 

import * as Yup from 'yup';

// style
import su from './SignUpPackage.module.scss'

import singUpAPI from "../../API/signUpAPI";

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

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

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
                
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
        />
    
        <button type="submit" className={su.courseButton}>Submit</button>

      </form>
    </div>
  )
}

export default SignUp