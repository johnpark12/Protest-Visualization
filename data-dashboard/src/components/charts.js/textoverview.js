import React, { useEffect, useState } from 'react';

function getTotalProtests(protests) {
  return protests.length;
}

function getLongestProtest(protests) {
  return protests.reduce((longest, current) => {
    const currentLength = current.enddatetime - current.startdatetime;
    const longestLength = longest.enddatetime - longest.startdatetime;
    return currentLength > longestLength ? current : longest;
  }, protests[0]);
}

function getRegionWithMostProtests(protests) {
  const regionCounts = protests.reduce((counts, current) => {
    counts[current.region] = (counts[current.region] || 0) + 1;
    return counts;
  }, {});

  return Object.entries(regionCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

function Textoverview({ protests }) {
  const [totalProtests, setTotalProtests] = useState(0);
  const [longestProtest, setLongestProtest] = useState(null);
  const [regionWithMostProtests, setRegionWithMostProtests] = useState(null);

  useEffect(() => {
    if (!protests || protests.length == 0) return;

    setTotalProtests(getTotalProtests(protests));
    setLongestProtest(getLongestProtest(protests));
    setRegionWithMostProtests(getRegionWithMostProtests(protests));
  }, [protests]);

  if (!protests || protests.length === 0) {
    return <div>No protests data available.</div>;
  }

  return (
    <div className='w-full text-2xl font-semibold'>
    {/* <p>There were {totalProtests} protests in this period, with the longest protest taking place on {longestProtest.startdatetime.toDateString()} and ending on {longestProtest.enddatetime.toDateString()}. The region experiencing the most protest was {regionWithMostProtests}.</p> */}
      There were {totalProtests} protests in this period, with the longest protest taking place on. The region experiencing the most protest was {regionWithMostProtests}.
    </div>
  );
}

export default Textoverview;
