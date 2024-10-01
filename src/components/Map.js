import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import courts from '../api/courts.json';
import jsonToPlaces from '../hooks/json-to-places'
import MarkerClusterGroup from 'react-leaflet-cluster'
import CourtMarker from './CourtMarker';
import SearchArea from './SearchArea';

function Map() {

  const mapRef = useRef(null);

  const [areaCourts, setAreaCourts] = useState([]);//jsonToPlaces(courts)
  const [userLocation, setUserLocation]= useState([38, 23.7])
  const [userZoom, setUserZoom]= useState(3)
  
 
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error,{ enableHighAccuracy: true ,timeout : 5000});
    } 
    function success(position) {
      setUserLocation([position.coords.latitude,position.coords.longitude]);
      setUserZoom(12);
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
  },[])

  
    
  return (
    <>
      <MapContainer
        ref={mapRef}
        key={userLocation}
        center={userLocation}
        zoom={userZoom}
        scrollWheelZoom
        doubleClickZoom={false}
        className='h-full w-full z-0 rounded-3xl bg-gray-800 border-2 border-orange-500'>
        <SearchArea zoomLimit={12} updateSearchArea={setAreaCourts}/>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {/* {place !== null ? <Marker riseOffset={50} position={[place.latitude, place.longitude]} /> : 'no place'} */}
        <MarkerClusterGroup chunkedLoading disableClusteringAtZoom={18} removeOutsideVisibleBounds={false} showCoverageOnHover={false}>
          {areaCourts.map((court) => {
            //if(mapRef.current.getBounds().contains([court.latitude, court.longitude]))
            return <CourtMarker key={court.id} id={court.id} name={court.name} lat={court.latitude} lng={court.longitude} />
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default Map;
