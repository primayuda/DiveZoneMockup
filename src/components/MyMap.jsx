import { useState, useMemo } from 'react';
import Map, {Marker, NavigationControl, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from './Pins';

import CITIES from '../data/cities';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJpbWF5dWRhIiwiYSI6ImNsODlxMXI4YzA5cG0zbnFrZ3dmdWhsYTYifQ.UMHawW_6NTEZN1Qv026xwg'; // Set your mapbox token here

export default function MyMap() {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <Map
      initialViewState={{   // center on Indonesia
        latitude: -2,
        longitude: 115.21,
        zoom: 4.5
      }}
      style={{width: "100%", height: 600}}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position='top-left' />
      {pins}

      {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
    </Map>
  );
}