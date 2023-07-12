import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, {useEffect, useRef, useState} from "react";
import * as topojson from "topojson"

import { reduceToHighestProtest, aggregateProtests } from "../../utils/helperFunctions";

const Worldmap = ({data}) => {
  const containerRef = useRef();
  const [topoData, setTopoData] = useState(null);

  useEffect(() => {
    fetch('/countries-110m.json')
      .then(response => response.json())
      .then(data => {
        setTopoData(data);
      })
      .catch(error => {
        console.error('Error loading JSON data:', error);
      });
  }, []);

  useEffect(() => {
    if (!data || !topoData || containerRef.current === null) return;

    // First create a mapping from countrycode to total number of protests
    const only_highest = reduceToHighestProtest(data)
    console.log(only_highest)
    const only_country = aggregateProtests(only_highest)
    console.log(only_country)
    // Then use that mapping to add values to the "land"

    // const land = topojson.feature(topoData, topoData.objects.land)
    // console.log(land)

    // Extract the countries object
    let countries = topojson.feature(topoData, topoData.objects.countries).features;

    // Join the population data with the countries
    for (let i = 0; i < countries.length; i++) {
        let countryId = countries[i].id;
        countries[i].properties.population = only_country[countryId] || 0;
        if (countries[i].properties.population == 0){
            console.log(`${countryId} missing`)
        }
    }

    // // Define a color scale based on population
    // const colorScale = d3.scaleQuantize()
    //     .domain([d3.min(Object.values(only_country)), d3.max(Object.values(only_country))])
    //     .range(d3.schemeBlues[9]);

    // const plot = Plot.plot({
    //     projection: "equirectangular",
    //     height: 1000,
    //     width: 1500,
    //     marks: [
    //         Plot.graticule(),
    //         Plot.geo(countries, {
    //             fill: d => colorScale(d.properties.population),
    //             title: d => `${d.properties.name}: ${d.properties.population}`
    //         }),
    //         Plot.sphere()
    //     ]
    // });

    console.log(countries)

    const plot = Plot.plot({
        projection:"equirectangular",
        width:1300,
        color: {
          type: "quantize",
          n: 5,
          domain: [d3.min(Object.values(only_country)), d3.max(Object.values(only_country))],
          scheme: "blues",
          label: "Total Number of Protests",
          legend: true,
          width: 800,
        },
        marks: [
          Plot.graticule(),
          Plot.geo(countries, Plot.centroid({
            fill: d => only_country[d.id]||null,
            tip: true,
            channels: {
              Country: d => d.properties.name,
            }
          })),
          Plot.geo(countries, {stroke: "black"})
        ]
    })

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return (<div ref={containerRef}/>);
}

export default Worldmap