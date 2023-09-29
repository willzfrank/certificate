import React, { createContext, useContext, useState, ReactNode } from 'react';

type FreeAccessModalContextType = {
  pricingPlan: any; // Replace 'any' with your desired type
  setPricingPlan: React.Dispatch<React.SetStateAction<any>>;
  discountDetails: any; // Replace 'any' with your desired type
  setDiscountDetails: React.Dispatch<React.SetStateAction<any>>;
};

const FreeAccessModalContext = createContext<
  FreeAccessModalContextType | undefined
>(undefined);

export const useCourseContext = () => {
  const context = useContext(FreeAccessModalContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

type FreeAccessProviderProps = {
  children: ReactNode;
};

export const FreeAccessProvider: React.FC<FreeAccessProviderProps> = ({
  children,
}) => {
  const [pricingPlan, setPricingPlan] = useState<any | null>(null); // Replace 'any' with your desired type
  const [discountDetails, setDiscountDetails] = useState<any | null>(null); // Replace 'any' with your desired type

  const contextValue: FreeAccessModalContextType = {
    pricingPlan,
    setPricingPlan,
    discountDetails,
    setDiscountDetails,
  };

  return (
    <FreeAccessModalContext.Provider value={contextValue}>
      {children}
    </FreeAccessModalContext.Provider>
  );
};
