// NoCampsPage.js
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';


const NoRegisteredCamps = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="card max-w-md text-center bg-base-100 shadow-xl rounded-box p-8">
        <div className="card-body items-center text-center">
          {/*
            Icon/Emoji: A large, prominent emoji to visually indicate the status.
            Using a clipboard emoji (📋) to suggest a list that's currently empty.
            - text-6xl: Makes the emoji very large
            - mb-4: Adds margin-bottom for spacing
          */}
          <p className="text-6xl mb-4" role="img" aria-label="Clipboard">
            📋
          </p>

          {/*
            Main Message: A clear heading for the user.
            - card-title: DaisyUI class for card titles
            - text-3xl: Large text size
            - font-bold: Bold font weight
            - text-base-content: Uses DaisyUI's default text color
            - mb-2: Adds margin-bottom
          */}
          <h2 className="card-title text-3xl font-bold text-base-content mb-2">
            You have not Joined any Camps Yet!
          </h2>

          {/*
            Descriptive Text: Explains why the page is empty and what to do.
            - text-lg: Standard text size
            - text-base-content: Default text color
            - opacity-70: Makes the text slightly transparent for a softer look
            - mb-8: Adds a larger margin-bottom before the button
          */}
          <p className="text-lg text-base-content opacity-70 mb-8">
            It looks like you haven't registered any medical camps yet. Start by joining your first camp!
          </p>

          {/*
            Call to Action Button: A button to navigate the user to the "Add New Camp" page.
            - btn: DaisyUI's base button class
            - btn-primary: Uses DaisyUI's primary color theme for the button
            - btn-wide: Makes the button wider
            - btn-lg: Makes the button larger
            - rounded-full: Applies fully rounded corners to the button
            - onClick: Placeholder for navigation to an "Add Camp" route (e.g., using React Router)
          */}
          <button
            className="btn bg-primary/70 text-white btn-wide btn-lg rounded-full"
            onClick={() => navigate('/available-camps')} // Replace with actual navigation
          >
            See All Camps <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoRegisteredCamps;