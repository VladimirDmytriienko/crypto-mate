import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from '@tanstack/react-router'
import { useAuthQuery } from '../../hooks/useAuthQuery'

interface AuthFormProps {
  mode: 'signup' | 'signin'
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { signUp, signIn } = useAuthQuery()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      const authAction = mode === 'signup' ? signUp : signIn
      authAction(values, {
        onSuccess: () => {
          resetForm()
          navigate({ to: '/' })
        }
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className=" p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div> : null}
      </div>

      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div> : null}
      </div>

      <button type="submit" className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
