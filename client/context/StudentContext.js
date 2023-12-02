import { createContext } from "react";

const StudentContext = createContext(),
  StudentContextProvider = () => {
    return (
      <StudentContext.Provider>
        <App />
      </StudentContext.Provider>
    );
  };

export {};
