import axios from "axios";

export default async function getPlaceName (latitude,longitude){

const response = await axios.get('https://overpass-api.de/api/interpreter', {
    params: {
      data: `[timeout:10][out:json];is_in(${latitude},${longitude})->.a;way(pivot.a)["leisure"!~"pitch"];out tags bb;out ids;`,
    },
  });

  //console.log(response);
  
  // if (typeof response.data.elements[0] === 'undefined'){
  //   return null
  // }else{
  //   if (typeof response.data.elements[0].tags === 'undefined'){
  //       return null
  //     }else{
  //       if(typeof response.data.elements[0].tags.name === 'undefined')
  //       return response.data.elements[0].tags["name:en"];
  //     }
  // }

  var outName = null
  response.data.elements.forEach(element => {
    if (typeof element.tags !== 'undefined') {
      if (typeof element.tags.name !== 'undefined'){
        !outName ? outName = element.tags.name : outName = null;
      }else{
        !outName ? outName = element.tags["name:en"] : outName = null;}
    }
  })

  console.log(outName);

  return outName
  
};