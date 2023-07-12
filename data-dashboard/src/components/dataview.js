import React, { useEffect, useState, useReducer } from 'react';
import pako from 'pako';
import Multiline from './charts.js/multiline';
import Worldmap from './charts.js/worldmap';
import OrdinalScatterplot from './charts.js/ordinalscatterplot';
import StackedTimeline from './charts.js/timeline';

import OptionList from './charts.js/optionlist';

import { processData } from '../utils/helperFunctions';
import Textoverview from './charts.js/textoverview';
import Identityhorizontal from './charts.js/identityhorizontal';

const initialState = {
    originalData: [],
    filteredData: [],
    filters: { country: [], startYear: 1980, endYear: 2018, participants: null, violent: null }
};  

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_DATA':
        return { ...state, originalData: action.payload, filteredData:  filterData(state.originalData, state.filters) };
        case 'SET_FILTER':
        const newFilters = { ...state.filters, [action.payload.filterName]: action.payload.filterValue };

        return {
            ...state,
            filters: newFilters,
            filteredData: filterData(state.originalData, newFilters)
        };
        default:
        throw new Error();
    }
}
  
// function filterData(data, filters) {
// return data.filter(item =>
//     (!filters.country.length || filters.country.includes(item.country)) &&
//     (!filters.year || item.year === filters.year) &&
//     (!filters.participants || item.participants === filters.participants) &&
//     (filters.violent === null || item.violent === filters.violent)
// );
// }
function filterData(data, filters) {
    return data.filter(item =>
        (!filters.country.length || filters.country.includes(item.country)) &&
        (!filters.startYear || item.year >= filters.startYear) &&   // Checks if year is greater or equal to startYear
        (!filters.endYear || item.year <= filters.endYear) &&   // Checks if year is less or equal to endYear
        (!filters.participants || item.participants === filters.participants) &&
        (filters.violent === null || item.violent === filters.violent)
    );
}

const Dataview = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let isMounted = true; // add this line
      
        const fetchData = async () => {
          try {
            const response = await fetch('/data.json.gz');
            const arrayBuffer = await response.arrayBuffer();
            const inflatedData = pako.inflate(arrayBuffer, { to: 'string' });
            const data = JSON.parse(inflatedData);
            console.log(data)
      
            const pData = processData(data);
      
            if (isMounted) dispatch({ type: 'LOAD_DATA', payload: pData }); // modify this line
          } catch (error) {
            console.error('Error fetching or parsing data:', error);
          }
        };
      
        fetchData();
      
        return () => { isMounted = false }; // add this line
      }, []);
      
    
    return (
        <div className='flex flex-col w-screen items-center gap-5'>
            <div className='flex w-11/12'>
                <OptionList dispatch={dispatch} state={state} />
                <Worldmap data={state.filteredData}/>
            </div>
            <div className='w-11/12'>
                {state.filteredData && 
                <Textoverview protests={state.filteredData}/>}
            </div>
            <div className='w-11/12'>
                <OrdinalScatterplot data={state.filteredData}/>
            </div>
            <div className='w-11/12'>
                <StackedTimeline data={state.filteredData}/>
            </div>
            <div className='w-11/12'>
                <Identityhorizontal data={state.filteredData}/>
            </div>
        </div>
    )
}

// export const Head = () => <Seo title="404: Not Found" />

export default Dataview
