import React, { createContext, useContext } from 'react';
import mushroomInfo from '../app/data/mushroomInfo.json';

type Mushroom = {
  name: string;
  description: string;
};

type MushroomContextType = {
  mushrooms: Mushroom[];
};

const MushroomDataContext = createContext<MushroomContextType | undefined>(undefined);

export const MushroomDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MushroomDataContext.Provider value={{ mushrooms: mushroomInfo }}>
      {children}
    </MushroomDataContext.Provider>
  );
};

export const useMushroomData = (): MushroomContextType => {
  const context = useContext(MushroomDataContext);
  if (!context) {
    throw new Error('useMushroomData must be used within a MushroomDataProvider');
  }
  return context;
};
