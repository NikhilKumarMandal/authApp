import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../validations/Schema';
import { useLoginUserMutation } from '../redux/api';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loginUserMutation] = useLoginUserMutation(); 

  const initialValues = {
    email: '',
    password: ''
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await loginUserMutation(values);
        console.log(response);
        if (response.data && response.data.success === true) {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          resetForm();
          dispatch(loginUser(response.data));
          navigate('/');
        } else if (response.error) {
          setServerErrorMessage(response.error.data.message || "Login failed");
          setServerSuccessMessage('');
        }
      } catch (error) {
        console.log(error);
        setServerErrorMessage('An unexpected error occurred');
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your email"
            />
            {errors.email && <div className="text-sm text-red-500 px-2">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-sm text-red-500 px-2">{errors.password}</div>}
          </div>
          <p className="text-sm text-gray-600 p-1">
            <Link to="/resetPassword/email" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Forgot Password?</Link>
          </p>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 p-1">
          Not a User? <Link to="/sign-up" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Create an account</Link>
        </p>
        {serverSuccessMessage && <div className="text-sm text-green-500 px-2 mt-2">{serverSuccessMessage}</div>}
        {serverErrorMessage && <div className="text-sm text-red-500 px-2 mt-2">{serverErrorMessage}</div>}
      </div>
    </div>
  );
}

export default SignIn;
