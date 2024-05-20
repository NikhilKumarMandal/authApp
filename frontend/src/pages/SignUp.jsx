import React from 'react'
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import {registerSchema} from '../validations/Schema'

function SignUp() {

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const { values, errors,handleChange,handleSubmit } = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your name"
            />
            {errors.name && <div className="text-sm text-red-500 px-2">{errors.name}</div>}

          </div>
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
          <div className="mb-4">
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
         
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 disabled:bg-gray-400" >Register</button>
        </form>
        <p className="text-sm text-gray-600 p-1">Already an User ? <Link href="/account/login" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Login</Link></p>
       

      </div>

    </div>
  )
}

export default SignUp