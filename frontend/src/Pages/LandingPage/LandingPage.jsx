import React from 'react'

const LandingPage = () => {
  return (
    <div className="bg-purple-700 text-white min-h-screen flex items-center justify-center">
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Task Manager App</h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8">
        Organize your tasks efficiently with ease.
      </p>
      <div>
        <button className="bg-white text-purple-700 py-3 px-6 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>
    </div>
  </div>
  )
}

export default LandingPage