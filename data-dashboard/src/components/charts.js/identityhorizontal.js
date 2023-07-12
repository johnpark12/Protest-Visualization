import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

// Show as percentage of population?
const Identityhorizontal = ({data}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || containerRef.current === null) return;

    // Should only show those groups that are above the median.

    const plot = Plot.plot({
        y: {grid: true, label:null},
        marginLeft: 200,
        width: 1500,
        color:{legend:true},
        marks: [
          Plot.barX(data, {y: "protesteridentity", x: "participants", fill: "startdatetime", sort: {y: "x", reverse: true}}),
          Plot.ruleX([0])
        ]
      })

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default Identityhorizontal
