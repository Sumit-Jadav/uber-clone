import React, { Children, useState } from "react";

export const CaptainContext = React.createContext();

const CaptainContex = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };
  return (
    <div>
      <CaptainContext.Provider value={value}>
        {children}
      </CaptainContext.Provider>
    </div>
  );
};

export default CaptainContex;
