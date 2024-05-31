import { useFormik } from 'formik';
import { changePasswordSchema } from '../validations/Schema';
import { useResetPasswordLinkMutation } from '../redux/api';
import { useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";

const initialValues = {
  password: "",
  confirmPassword: ""
}
const ChangePassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const [serverSuccessMessage, setServerSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [changePassword] = useResetPasswordLinkMutation()
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const response = await changePassword({...values,token})
        if (response.data && response.data.success === true) {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          action.resetForm();
          navigate('/login')

           
        } else if (response.error) {
          setServerErrorMessage(response.error.message || "Registration failed");
          setServerSuccessMessage('');
        }
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    }
  })

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your new password"
            />
            {errors.password && <div className="text-sm text-red-500 px-2">{errors.password}</div>}

          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && <div className="text-sm text-red-500 px-2">{errors.confirmPassword}</div>}

          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
            disabled={loading}>
            Change Password
          </button>
        </form>
        {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
        {serverErrorMessage && <div className="text-sm text-red-500 font-semibold px-2 text-center">{serverErrorMessage}</div>}
      </div>
    </div>
  );
}

export default ChangePassword