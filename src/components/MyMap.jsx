import Map, {Marker, NavigationControl} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJpbWF5dWRhIiwiYSI6ImNrcGNicG1qejE0emYydW11NmpqZXAwZHMifQ.0XbWGmeEjExM9Ol0M-Dg7Q'; // Set your mapbox token here

export default function MyMap() {
  return (
    <Map
      initialViewState={{   // center on Denpasar
        latitude: -2,
        longitude: 115.21,
        zoom: 4.5
      }}
      style={{width: "100%", height: 600}}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl />
      <Marker longitude={106.81} latitude={-6.2} color="red" />  // Jakarta
      <Marker longitude={115.22} latitude={-8.65} color="red" />  // Jakarta
    </Map>
  );
}