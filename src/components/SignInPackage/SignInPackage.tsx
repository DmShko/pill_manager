import { useFormik } from "formik"; 

// style
import si from './SignInPackage.module.scss'

const SignIp = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      
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