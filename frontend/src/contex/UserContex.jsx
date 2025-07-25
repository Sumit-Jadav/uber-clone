import React, { useState } from "react";

export const UserContext = React.createContext();

const UserContex = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </div>
  );
};

export default UserContex;
