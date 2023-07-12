import React, { useState } from 'react';

const Yearfilter = ({state, dispatch}) => {
    
  const handleStartYearChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { filterName: 'startYear', filterValue: e.target.value } });
  }

  const handleEndYearChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { filterName: 'endYear', filterValue: e.target.value } });
  }

  return (
    <div className="flex space-x-2">
        <h2>
            Select Starting and Ending Year
        </h2>

      <input
        name="startYear"
        type="number"
        value={state.startYear}
        onChange={handleStartYearChange}
        className="w-1/2 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start Year"
      />

      <input
        name="startYear"
        type="number"
        value={state.endYear}
        onChange={handleEndYearChange}
        className="w-1/2 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="End Year"
      />
    </div>
  );
}

export default Yearfilter;
