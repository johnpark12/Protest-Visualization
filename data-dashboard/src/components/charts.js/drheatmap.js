import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

import { reduceToHighestProtest, selectRandomCountries, filterByCountries } from "../../utils/helperFunctions";

// Show as percentage of population?
const DRHeatmap = ({data}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || containerRef.current === null) return;

    const plot = Plot.plot({
        marginLeft: 60,
        width: 1200,
        height:1000, // Should be number of elements selected * 200 or something 
        x: {grid:true, inset: 10},
        y: {grid:true, label: null, padding: 0.9},
        r: {range:[0,40]},
        marks: [
          Plot.dot(data, {x: "startdatetime", y: "country", stroke: "protesterviolence",
          r: (d)=>d.participants})
        ]
      })

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default DRHeatmap
