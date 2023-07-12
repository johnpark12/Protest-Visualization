
export function aggregate_per_year(data){
    // Given a list of JSONs for each country for each year for each protest,
    // aggregate into a list of JSONs for each country

    
}

export function processData(data) {
    // Process the fetched data here
    data.forEach(d => {
        if (d.protest != 0){
            d.startdatetime = new Date(d.startdatetime);
            d.enddatetime = new Date(d.enddatetime);

            // Check if startdatetime and enddatetime are on the same day
            if (d.startdatetime.getUTCFullYear() === d.enddatetime.getUTCFullYear() &&
            d.startdatetime.getUTCMonth() === d.enddatetime.getUTCMonth() &&
            d.startdatetime.getUTCDate() === d.enddatetime.getUTCDate()) {

            // If they are, add one day to enddatetime
            d.enddatetime.setDate(d.enddatetime.getDate() + 1);
        }
        }
    });
    return data;
}

export function reduceToHighestProtest(data) {
    // Use reduce to create an object where the keys are the combination of country and year
    let resultObj = data.reduce((acc, obj) => {
        let key = `${obj.country}_${obj.year}`;

        // If this combination of country and year is not in the accumulator
        // or if the current protestnumber is higher than the stored protestnumber,
        // store this object
        if (!acc[key] || obj.protestnumber > acc[key].protestnumber) {
            acc[key] = obj;
        }

        return acc;
    }, {});

    // Convert the result object back to an array
    return Object.values(resultObj);
}

export function selectRandomCountries(data, numCountries) {
    // Get a list of unique countries
    let countries = [...new Set(data.map(obj => obj.country))];

    // Shuffle the countries array
    for (let i = countries.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [countries[i], countries[j]] = [countries[j], countries[i]];
    }

    // Return the first numCountries countries from the shuffled array
    return countries.slice(0, numCountries);
    }

export function filterByCountries(data, countries) {
    return data.filter(obj => countries.includes(obj.country));
}

// TODO: Double check that this works as expected.
export function aggregateProtests(jsonList) {
    return jsonList.reduce((aggregatedData, jsonData) => {
      console.log(`${jsonData.country} with ${jsonData.countrycode}`)
      const country = jsonData.countrycode;
      const protestNumber = jsonData.protestnumber;
  
      // Add the protest number to the existing country entry or initialize a new one
      aggregatedData[country] = (aggregatedData[country] || 0) + protestNumber;
  
      return aggregatedData;
    }, {});
}
  
export function roundProtestNumbers(objects) {
    return objects.map(obj => {
        const protestNumber = obj.protestnumber;
        if (protestNumber < 10) {
        return { ...obj, protestnumber: Math.round(protestNumber) };
        } else {
        const magnitude = Math.pow(10, Math.floor(Math.log10(protestNumber)));
        const roundedMagnitude = Math.pow(10, Math.floor(Math.log10(protestNumber)) - 1);
        const roundedValue = Math.round(protestNumber / magnitude) * roundedMagnitude;
        return { ...obj, protestnumber: roundedValue };
        }
    });
  }

export function getUniqueValues(data, attribute) {
    const uniqueValues = new Set(data.map(item => item[attribute]));
    return Array.from(uniqueValues);
}
  