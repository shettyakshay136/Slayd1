import React, { createContext, useState, useContext } from 'react';

// Create a context
const TutorialContext = createContext();

// Custom hook to use the TutorialContext
export const useTutorial = () => {
  return useContext(TutorialContext);
};

export const TutorialProvider = ({ children }) => {
  const [guideStep, setGuideStep] = useState(1);

  // Function to increment the guideStep
  const handleStepChange = () => {
    setGuideStep(prevStep => prevStep + 1);
  };

  return (
    <TutorialContext.Provider value={{ guideStep, handleStepChange }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorialContext = () => {
  return useContext(TutorialContext);
};
