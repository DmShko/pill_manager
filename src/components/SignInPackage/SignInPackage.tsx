import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import si from './SignInPackage.module.scss'

import singInAPI from "../../API/signInAPI";

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

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
        .min(8, 'Must be 8 characters or more')
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

        <button type="submit" className={si.courseButton}>Submit</button>

      </form>
    </div>
  )
}

export default SignIp