import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './GoogleMap.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -1.2653,
  lng: 116.8285,
};

function GoogleMapWithApiKey({ apiKey }: { apiKey: string }) {
  const trafficData = useQuery(api.traffic.getTrafficData);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    preventGoogleFontsLoading: true,
  });

  if (!isLoaded) {
    return <div className="loading">Loading Map...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {trafficData?.map((road) => (
          <Marker
            key={road._id}
            position={{ lat: road.latitude, lng: road.longitude }}
            title={`${road.road_name} (${road.congestion_level})`}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

function GoogleMapComponent() {
  const apiKey = useQuery(api.keys.getGoogleMapsApiKey);

  if (apiKey === undefined) {
    return <div className="loading">Loading...</div>;
  }

  if (!apiKey) {
    return (
      <div className="error">
        Missing Google Maps API Key. Please set it in the backend.
      </div>
    );
  }

  return <GoogleMapWithApiKey apiKey={apiKey} />;
}

export default GoogleMapComponent;
