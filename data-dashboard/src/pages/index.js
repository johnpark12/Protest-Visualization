import React, { useEffect, useState } from 'react';
import pako from 'pako';

import Layout from "../components/layout"
import Seo from "../components/seo"

import Dataview from '../components/dataview';

const Dashboard = () => {
    return (
        <body>
        <div className="h-screen w-screen flex flex-col">
            <h1 className='text-4xl m-5'>Protest Analytics</h1>
            <div className='w-screen'>
                <Dataview/>
            </div>
        </div>
        </body>
    )
}

export const Head = () => <Seo title="Dashboard View" />

export default Dashboard
