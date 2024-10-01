import axios from "axios";
import { useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import jsonToPlaces from "../hooks/json-to-places";
import L from 'leaflet';
import { useFetchActiveCourtsIDQuery } from "../store";
import { ballersApi } from "../store/apis/ballersApi";
import { MdRefresh } from "react-icons/md";


function SearchArea({ zoomLimit, updateSearchArea }) {

  const [searchArea, setSearchArea] = useState([0, 0, 0, 0])
  const [showSearch, setShowSearch] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [activechecked, setActiveChecked] = useState(false);
  const { data: activeCourts, error, isFetching, refetch } = useFetchActiveCourtsIDQuery();
  const [overpassData, setOverpassData] = useState({})
  const [searchRect, setSearchRect] = useState(null)


  const map = useMap(); // Use map instance to get bounds

  useEffect(() => {
    //setSearchArea([SouthWest.lat, SouthWest.lng, NorthEast.lat, NorthEast.lng]);
    if (map.getZoom() < zoomLimit)
      setShowZoom(true);
    else {
      setShowSearch(true)
    }

  }, [])


  useMapEvent('move', () => {
    const bounds = map.getBounds();
    const SouthWest = bounds.getSouthWest();
    const NorthEast = bounds.getNorthEast();
    var change = 0.1;
    var bottom = searchArea[0] - SouthWest.lat;
    var left = searchArea[1] - SouthWest.lng;
    var top = searchArea[2] - NorthEast.lat;
    var right = searchArea[3] - NorthEast.lng;
    if (bottom < 0 && left < 0 && top > 0 && right > 0) var inside = true; else var inside = false;
    //if (bottom > 0 && left > 0 && top < 0 && right < 0) var outside = true; else var outside = false;
    if (
      // (Math.abs(bottom) > change ||
      // Math.abs(left) > change ||
      // Math.abs(top) > change ||
      // Math.abs(right) > change) &&
      map.getZoom() >= zoomLimit &&
      !inside) {
      setShowSearch(true); // Show the button after map stops moving
    }
    else {
      setShowSearch(false);
    }
  })

  const handleSearchArea = async () => {
    refetch()
    if (searchRect) {
      searchRect.remove();
    }
    const bounds = map.getBounds(); // Get current map bounds
    const SouthWest = bounds.getSouthWest()
    const NorthEast = bounds.getNorthEast()
    setSearchArea([SouthWest.lat, SouthWest.lng, NorthEast.lat, NorthEast.lng]);
    const overpassResponse = await axios.get('https://overpass-api.de/api/interpreter', {
      params: {
        data: `[out:json][timeout:80];(nwr["leisure"="pitch"]["sport"="basketball"](${SouthWest.lat},${SouthWest.lng},${NorthEast.lat},${NorthEast.lng}););out center;`,
      },
    });
    setOverpassData(overpassResponse)
    activechecked ? updateSearchArea(jsonToPlaces(overpassResponse, activeCourts)) : updateSearchArea(jsonToPlaces(overpassResponse));
    setShowSearch(false);

    const newRectangle = L.rectangle(bounds, { fill: false, color: "#ff7800", weight: 1 });
    newRectangle.addTo(map);
    setSearchRect(newRectangle);
  };

  useMapEvent('zoomend', () => {
    if (map.getZoom() < zoomLimit)
      setShowZoom(true);
    else
      setShowZoom(false);
  });

  const handleZoomClick = () => {
    map.setZoom(zoomLimit)
  }


  const handleActiveChange = () => {
    refetch()
    if (searchArea[0])
      !activechecked ? updateSearchArea(jsonToPlaces(overpassData, activeCourts)) : updateSearchArea(jsonToPlaces(overpassData));
    setActiveChecked(!activechecked);
  };
  const handleRefetch = () => {
    refetch()
    if (searchArea[0])
      setActiveChecked(true)
      updateSearchArea(jsonToPlaces(overpassData, activeCourts))
    
  };

  return (<div className='z-[5000] flex flex-col relative w-full h-full p-2 items-center justify-between pointer-events-none'>
    <div>
      {showSearch ?
        <button onClick={handleSearchArea}
          className='p-2 font-bold text-xl rounded-xl bg-gray-800 border-2 border-orange-500 pointer-events-auto' >
          Search this area
        </button> : <></>}
      {showZoom ?
        <button onClick={handleZoomClick}
          className='p-2 font-bold text-xl rounded-xl bg-gray-800 border-2 border-orange-500 pointer-events-auto' >
          Zoom in to search
        </button> : <></>}
    </div>
    <div className="rounded font-bold text-l flex items-center bg-gray-800 border-2 border-orange-500 pointer-events-auto">
      <label className="cursor-pointer rounded flex items-center hover:text-orange-500 duration-100 ">
        <input className="m-1 duration-100 text-xl" type="checkbox" onChange={handleActiveChange} checked={activechecked} />
        See Only Active Courts
      </label>
      <button className="ml-2 m-1 p-1 text-xl" onClick={handleRefetch}><MdRefresh /></button>
    </div>
  </div>);
}

export default SearchArea