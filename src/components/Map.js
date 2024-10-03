import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import {Control , Circle, MapContainer, TileLayer } from 'react-leaflet';
import courts from '../api/courts.json';
import jsonToPlaces from '../hooks/json-to-places'
import MarkerClusterGroup from 'react-leaflet-cluster'
import CourtMarker from './CourtMarker';
import SearchArea from './SearchArea';
import { icon, map } from 'leaflet';

function Map() {

  const mapRef = useRef(null);

  const [areaCourts, setAreaCourts] = useState([]);//jsonToPlaces(courts)
  const [userLocation, setUserLocation]= useState()
  const [userZoom, setUserZoom]= useState(5)
  
 
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error,{ enableHighAccuracy: FontFaceSetLoadEvent ,timeout : 5000});
    } 
    function success(position) {
      setUserLocation([position.coords.latitude,position.coords.longitude]);
      setUserZoom(14);
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
        center={userLocation?userLocation:[38, 23.7]}
        zoom={userZoom}
        scrollWheelZoom
        doubleClickZoom={false}
        zoomAnimationThreshold={8}
        className='h-full w-full z-0 rounded-3xl bg-gray-800 border-2 border-orange-500'>
        <SearchArea zoomLimit={12} updateSearchArea={setAreaCourts} userLocation={userLocation}/>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {areaCourts.map((court) => {
            return court.active?<CourtMarker key={court.id} id={court.id} name={court.name} lat={court.latitude} lng={court.longitude} active={court.active} />:<></>
          })}
        <MarkerClusterGroup chunkedLoading disableClusteringAtZoom={18} removeOutsideVisibleBounds={false} showCoverageOnHover={false}>
          {areaCourts.map((court) => {
            return court.active?<></>:<CourtMarker key={court.id} id={court.id} name={court.name} lat={court.latitude} lng={court.longitude} active={court.active} />
          })}
        </MarkerClusterGroup> 
       
        {userLocation?<Circle opacity={0.5} center={userLocation} radius={200}></Circle>:<></>}
      </MapContainer>
    </>
  );
}

export default Map;
