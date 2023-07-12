import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

import { reduceToHighestProtest, selectRandomCountries, filterByCountries } from "../../utils/helperFunctions";

// Show as percentage of population?
const StackedTimeline = ({data}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || containerRef.current === null) return;

    const plot = Plot.plot({
        marginLeft: 130,
        width:1800,
        x: {
          axis: "top",
          grid: true,
        },
        y: {
          grid: true,
        },
        color: { legend: true },
        marks: [
          Plot.barX(data, {
            x1: "startdatetime",
            x2: "enddatetime",
            y: "country",
            fill:"participants",
            opacity: 0.5,
            sort: {y: "x1"}
          }),
        //   Plot.text(data, {
        //     x: "startdatetime",
        //     y: "country",
        //     text: "country",
        //     textAnchor: "end",
        //     dx: -3
        //   })
        ]
      })

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default StackedTimeline