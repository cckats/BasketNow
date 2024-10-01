import getPlaceName from "./getPlaceName";


export default function jsonToPlaces(json, filter) {


    let idsSet
    if (filter) {
        idsSet = new Set(filter.map(item => parseInt(item.courtId)));
    }

    const uniqueCourts = {};
    const places = json.data.elements.map((element) => {
        var longitude = typeof element.lon !== 'undefined' ? element.lon : element.center.lon;
        var latitude = typeof element.lat !== 'undefined' ? element.lat : element.center.lat;

        const key = `${Math.round((latitude + Number.EPSILON) * 10000) / 10000},${Math.round((longitude + Number.EPSILON) * 10000) / 10000}`;
        // Check if this center point has been encountered before
        if (!uniqueCourts[key] && !(idsSet?!idsSet.has(element.id):false)) {
            uniqueCourts[key] = element;  // Keep the one with the highest ID
            return {
                id: element.id,
                name: typeof element.tags.name !== 'undefined' ? element.tags.name : null,//getPlaceName(latitude, longitude),
                longitude,
                latitude,
            }
        }
        else {
            return {
                id: element.id,
                name: null,//getPlaceName(latitude, longitude),
                longitude: 0,
                latitude: 0,
            }
        }
    });

    //console.log(places);

    return places
}