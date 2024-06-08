// PreviousContainerContext.tsx

import { createContext, useContext, useState } from 'react';

// Define a type for the context state
type PreviousContainerContextType = {
  previousContainer: string;
  setPreviousContainer: (newPreviousContainer: string) => void;
};

const PreviousContainerContext = createContext<PreviousContainerContextType>({
  previousContainer: 'secureWorking',
  setPreviousContainer: (newPreviousContainer: string) => {}, // Modified function with explicit string type
});

export const usePreviousContainer = () => useContext(PreviousContainerContext);

export const PreviousContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousContainer, setPreviousContainer] = useState('secureWorking');

  return (
    <PreviousContainerContext.Provider value={{ previousContainer, setPreviousContainer }}>
      {children}
    </PreviousContainerContext.Provider>
  );
};
