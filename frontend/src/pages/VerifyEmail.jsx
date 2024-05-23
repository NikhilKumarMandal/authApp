import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation, useResendOtpMutation } from '../redux/api';

function VerifyEmail() {
  const { id } = useParams(); // Ensure this captures the userId
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [verifyEmail] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("User ID:", id); 
      const response = await verifyEmail({ id, otp }); 
      console.log("API Response:", response); 
      if (response.data && response.data.success) {
        setServerSuccessMessage(response.data.message);
        setServerErrorMessage('');
        setOtp('');
        navigate('/login');
      } else {
        setServerErrorMessage(response.error.message || "Verification failed");
        setServerSuccessMessage('');
      }
    } catch (error) {
      console.log(error); 
      setServerErrorMessage('An unexpected error occurred');
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({id}).unwrap();
      setServerSuccessMessage('OTP sent successfully');
      setServerErrorMessage('');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setServerErrorMessage('Error sending OTP');
      setServerSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Verify your account</h2>
        <p className="text-sm text-center mb-6 text-gray-400">
          Check your email for OTP. OTP is valid for 15 minutes.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block font-medium mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              placeholder="Enter your OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Verify
          </button>
        </form>
        <button
          onClick={handleResendOtp}
          className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          disabled={isResending}
        >
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
        <p className="text-sm text-gray-600 p-1">
          Already a User?{' '}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">
            Login
          </Link>
        </p>
        {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
        {serverErrorMessage && <div className="text-sm text-red-500 font-semibold px-2 text-center">{serverErrorMessage}</div>}
      </div>
    </div>
  );
}

export default VerifyEmail;
