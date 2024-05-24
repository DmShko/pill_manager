import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import si from './SignInPackage.module.scss'

import singInAPI from "../../API/signInAPI";

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

// images
import Mail from "../SvgComponents/Courses/Mail";
import Lock from "../SvgComponents/Courses/Lock";

const SignIp = () => {

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
        .min(8, 'Min 8 characters')
        .required('Password field is required'),
    }
  ),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(singInAPI({
        email: values.email,
        password: values.password
      }));
    },
  });

  return (
    <div className={si.container}>

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