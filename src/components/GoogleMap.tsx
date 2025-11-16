import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, TrafficLayer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Balikpapan Coordinates
const center = {
  lat: -1.2653,
  lng: 116.853,
};

const mapOptions = {
  zoom: 12,
  center,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    // Minimalist map style (Nordic-inspired)
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7c93a3' }, { lightness: '-10' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: '10' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#f0f0f0' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#dcdcdc' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#eeeeee' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#a3c9e0' }],
    },
  ],
};

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['visualization'];

function GoogleMapComponent() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    // Per PRD: "Map auto-refresh every 5 minutes"
    // The traffic layer updates automatically, so we just update the timestamp.
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loadError) {
    return <div>Error loading maps. Please check your API key.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions}
        onLoad={() => console.log('Map loaded.')}
      >
        <TrafficLayer autoRefresh={true} />
      </GoogleMap>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Last Updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default GoogleMapComponent;