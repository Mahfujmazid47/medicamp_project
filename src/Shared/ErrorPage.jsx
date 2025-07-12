import React from 'react';

const ErrorPage = () => {
  return (

    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">

      <div className="hero max-w-md text-center bg-base-100 shadow-xl rounded-box p-8">
        <div className="hero-content flex-col">

          <p className="text-6xl mb-4" role="img" aria-label="Sad Face">
            🩺
          </p>


          <h1 className="text-5xl font-bold text-error mb-2">
            404
          </h1>

 
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Page Not Found
          </h2>


          <p className="text-lg text-base-content opacity-70 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>


          <button
              className="btn btn-outline hover:text-white btn-primary btn-wide btn-lg rounded-full flex items-center justify-center"
              onClick={() => window.history.back()}
            >
              {/* SVG icon for a left arrow */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>


          <button
            className="btn btn-primary text-white btn-wide btn-lg rounded-full"
            onClick={() => window.location.href = '/'} // Redirects to the root path
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;