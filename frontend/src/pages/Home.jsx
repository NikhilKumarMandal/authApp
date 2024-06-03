import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-r border-gray-300 p-4 overflow-hidden">
          {/* SearchBar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search User"
              className="w-full p-2 pl-10 border rounded"
            />
            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-600" />
          </div>

          {/* ChatList */}
          <div className="flex flex-col h-full">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4">
              New Group Chat +
            </button>
            <div className="overflow-y-auto flex-grow">
              {/* List of chats will be rendered here */}
              <p>No chats available</p>
            </div>
          </div>
        </div>

        {/* ChatWindow */}
        <div className="w-full md:w-3/4 p-4 flex items-center justify-center">
          <div className="h-full flex items-center justify-center w-full">
            <p className="text-gray-500">Click on a user to start chatting</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

