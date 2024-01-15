import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [enrolled, setEnrolled] = useState(false);

  return (
    <AppContext.Provider value={{ enrolled, setEnrolled }}>
      {children}
    </AppContext.Provider>
  );
};