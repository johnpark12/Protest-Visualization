import React, { useState, useEffect } from 'react';

import Countryfilter from '../options/countryfilter';
import Yearfilter from '../options/yearfilter';

const OptionList = ({state, dispatch}) => {
    return (
        <div className="flex flex-col w-1/3">
            <Countryfilter state={state} dispatch={dispatch}/>
            <Yearfilter state={state} dispatch={dispatch}/>
        </div>
    );
};

export default OptionList;
