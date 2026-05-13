import { createContext, useContext, useState } from "react";

const SectorContext = createContext();

export const SectorProvider = ({ children }) => {
  const [activeSector, setActiveSector] = useState("peternakan");

  return (
    <SectorContext.Provider value={{ activeSector, setActiveSector }}>
      {children}
    </SectorContext.Provider>
  );
};

export const useSector = () => useContext(SectorContext);