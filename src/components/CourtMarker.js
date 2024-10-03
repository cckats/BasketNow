import L from 'leaflet';
import { useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import CourtPopup from './CourtPopup';

function CourtMarker({ id, lat, lng, name, active}) {
    const customIcon = new L.Icon({
        iconUrl: active?'basketnow/activePin.png':'basketnow/pins.png', // URL of your icon image
        iconSize: [28, 35], // size of the icon
        iconAnchor: [14, 35], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
        //shadowUrl: null, // Disable the shadow by setting it to null
    });
    const map = useMap();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup open state
    const eventHandlers = {
        popupopen: () => setIsPopupOpen(true),//; map.panTo([lat,lng], { animate: false }); map.panBy(L.point(0,-200),{ animate: false })}, // Set to true when the popup is opened
        popupclose: () => setIsPopupOpen(false), // Set to false when the popup is closed
    };
    

    return (lat && lng) ? <Marker title={name} autoPanOnFocus opacity={0.8} position={[lat, lng]} icon={customIcon} eventHandlers={eventHandlers}>
        <Popup offset={L.point(3, 47)} autoPanPadding={L.point(26, 340)} closeOnClick={false}>
            {isPopupOpen ? <CourtPopup id={id} inName={name} lat={lat} lng={lng} ></CourtPopup> : <div className='p-3'></div>}
        </Popup>
    </Marker> : <></>;
};

export default CourtMarker