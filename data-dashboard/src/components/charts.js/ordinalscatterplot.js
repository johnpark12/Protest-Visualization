import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

import { reduceToHighestProtest, getUniqueValues } from "../../utils/helperFunctions";

// Show as percentage of population?
const OrdinalScatterplot = ({data}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || containerRef.current === null) return;

    const countryCount = getUniqueValues(data, "country")
    console.log(countryCount.length)

    const plot = Plot.plot({
        marginLeft: 90,
        height: Math.max(countryCount.length * 80, 200),
        // style: "width: 100%;", 
        width: 1800,
        x: {grid:true, inset: 50},
        y: {grid:true, label: null},
        r: {range:[0,40]},
        color: { legend: true },
        marks: [
          Plot.dot(data, {x: "startdatetime", y: "country", stroke: "protesteridentity",
          r: (d)=>d.participants, tip:true,
          channels: {
            notes: d => d.notes||"none",
            sources: d => d.sources||"none",
          },
          sort:{x:"y"}
        })
        ]
      })

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default OrdinalScatterplot
