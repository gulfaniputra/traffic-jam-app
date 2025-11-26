// src/components/GoogleMap.tsx
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './GoogleMap.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Balikpapan center
const center = {
  lat: -1.2653,
  lng: 116.8285,
};

// This component is only rendered when the API key is available.
const MapView = ({ apiKey }: { apiKey: string }) => {
  const trafficData = useQuery(api.traffic.getTrafficData);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return <div className="loading">Loading Map...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
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
};

function GoogleMapComponent() {
  const apiKey = useQuery(api.keys.getGoogleMapsApiKey);

  // The API key is still being fetched from the backend.
  if (apiKey === undefined) {
    return <div className="loading">Loading Configuration...</div>;
  }

  // The API key has been fetched, but it's missing.
  if (apiKey === null || apiKey === '') {
    return (
      <div className="error">
        Google Maps API Key is not configured. Please set it in the backend.
      </div>
    );
  }

  // The API key is present, render the map.
  return <MapView apiKey={apiKey} />;
}

export default GoogleMapComponent;
