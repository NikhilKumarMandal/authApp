import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPasswordLinkSchema } from '../validations/Schema';
import { useForgetPasswordMutation } from '../redux/api';

function ResetPassword() {
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [forgetPassword] = useForgetPasswordMutation();

  const initialValues = {
    email: ''
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordLinkSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const res = await forgetPassword(values).unwrap();
        if (res.success === true) {
          setServerSuccessMessage(res.message);
          setServerErrorMessage('');
          resetForm();
        } else {
          setServerErrorMessage(res.message || 'Failed to verify email');
          setServerSuccessMessage('');
        }
      } catch (error) {
        console.log(error);
        setServerErrorMessage('An unexpected error occurred');
      }
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
        <p className="mb-4">Enter your email and we'll send you instructions on how to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
            Send Email
          </button>
        </form>
        {serverSuccessMessage && (
          <div className="mt-4 text-green-600 text-center">
            {serverSuccessMessage}
          </div>
        )}
        {serverErrorMessage && (
          <div className="mt-4 text-red-600 text-center">
            {serverErrorMessage}
          </div>
        )}
        <div className="mt-4 text-center">
          <Link to='/login' className="text-sm text-gray-600 hover:underline">
            Go back to Login page.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
