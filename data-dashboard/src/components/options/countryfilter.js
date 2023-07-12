import React, { useState, useEffect } from 'react';
import { getUniqueValues } from '../../utils/helperFunctions';

const Countryfilter = ({state, dispatch}) => {
    
    const [uniqueCountries, setUniqueCountries] = useState(null);
    useEffect(()=>{
        if (!state){
            return null
        }

        setUniqueCountries(getUniqueValues(state.originalData, "country"))
    }, [state])

    // TODO: use dispatch when adding/removing state info
    const handleSelect = (country) => {
        const newCountryFilter = state.filters.country.includes(country)
            ? state.filters.country.filter(c => c !== country)
            : [...state.filters.country, country];

        dispatch({ type: 'SET_FILTER', payload: { filterName: 'country', filterValue: newCountryFilter } });
    };

    console.log(state)

    // TODO: Update selected options to show based on state.filters
    return (
        <div className="flex flex-col w-full">
            <h1 className="text-2xl m-2">Select Countries:</h1>
            <div className="m-2 flex gap-1 flex-wrap">
                {uniqueCountries != null && uniqueCountries.map((countryName, index) => {
                    return (
                    <div 
                        key={index} 
                        className={`w-fit h-fit p-1 text-sm bg-white rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer
                            ${state.filters.country.includes(countryName) && 'bg-blue-500 text-black'}`}
                        onClick={() => handleSelect(countryName)}
                    >
                        {countryName}
                    </div>
                    )}
                )}
            </div>
        </div>
    );
};

export default Countryfilter;
