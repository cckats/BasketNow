export default function jsonToPlaces(json, activeCourts, onlyActive) {


    let idsSet
    if (activeCourts) {
        idsSet = new Set(activeCourts.map(item => parseInt(item.courtId)));
        console.log(idsSet);
    } else {
        idsSet = false
    }

    const uniqueCourts = {};
    const places = json.data.elements.map((element) => {
        var longitude = typeof element.lon !== 'undefined' ? element.lon : element.center.lon;
        var latitude = typeof element.lat !== 'undefined' ? element.lat : element.center.lat;

        const key = `${Math.round((latitude + Number.EPSILON) * 10000) / 10000},${Math.round((longitude + Number.EPSILON) * 10000) / 10000}`;
        // Check if this center point has been encountered before
        var active = idsSet ? idsSet.has(element.id) ? true : false : false
        if (!uniqueCourts[key] && (!onlyActive || active)) {
            uniqueCourts[key] = element;  // Keep the one with the highest ID
            return {
                id: element.id,
                name: typeof element.tags.name !== 'undefined' ? element.tags.name : null,//getPlaceName(latitude, longitude),
                longitude,
                latitude,
                active
            }
        }
        else {
            return {
                id: element.id,
                name: null,//getPlaceName(latitude, longitude),
                longitude: 0,
                latitude: 0,
                active: false
            }
        }
    });

    // var activeplaces= new Set(places.map((place) => place.active))
    // console.log(activeplaces.has(true));

    return places
}