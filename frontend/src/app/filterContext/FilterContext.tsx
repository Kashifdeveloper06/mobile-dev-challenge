import React, { createContext, useContext, useState } from 'react';

type FilterType = {
    spicinessLevel: string | null;
    setSpicinessLevel: (value: string | null) => void;
    selectedCountry: string | null;
    setSelectedCountry: (value: string | null) => void;
};

const FilterContext = createContext<FilterType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [spicinessLevel, setSpicinessLevel] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    return (
        <FilterContext.Provider value={{ spicinessLevel, setSpicinessLevel, selectedCountry, setSelectedCountry }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = (): FilterType => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilter must be used within a FilterProvider');
    return context;
};
