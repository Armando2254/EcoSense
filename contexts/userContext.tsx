import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  idRecolector: string | null;
  setIdRecolector: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [idRecolector, setIdRecolector] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ idRecolector, setIdRecolector }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
