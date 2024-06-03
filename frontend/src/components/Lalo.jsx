import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa';

function Lalo() {
  return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Talk-A-Tive</h1>
      <div className="flex items-center space-x-4">
        <FaBell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <FaUserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
      </div>
    </div>
  )
}

export default Lalo