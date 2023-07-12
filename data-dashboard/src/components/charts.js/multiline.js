import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";

import { reduceToHighestProtest, selectRandomCountries, filterByCountries } from "../../utils/helperFunctions";

const Multiline = ({data}) => {
  const containerRef = useRef();

  useEffect(() => {
    // if (data === undefined) return;
    if (!data || containerRef.current === null) return;

    ///////////////////////////
    let countries = selectRandomCountries(data, 7);
    let filteredData = filterByCountries(data, countries);
    let highest_protest = reduceToHighestProtest(filteredData);
    console.log(highest_protest)
    // const highest_protest = reduceToHighestProtest(data)
    ///////////////////////////

    const plot = Plot.plot({
        // style: "overflow: scroll; min-width:100%;",
        style: "overflow: scroll; min-width:100%;",
        y: {grid: true},
        color: {legend: true},
        marks: [
          Plot.ruleY([0]),
          Plot.lineY(highest_protest, {x: "year", y: "protestnumber", stroke: "country"}),
        //   Plot.text(highest_protest, Plot.selectLast({x: "year", y: "protestnumber", z: "country", text: "country", textAnchor: "start", dx:5, dy:5}))
        ]
      })
    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default Multiline