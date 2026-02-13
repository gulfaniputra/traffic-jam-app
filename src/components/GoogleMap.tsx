import { useQuery } from "@apollo/client";
import { GET_TRAFFIC_DATA } from "../graphql/queries";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  TrafficLayer,
} from "@react-google-maps/api";
import "./GoogleMap.css";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -1.2653,
  lng: 116.8285,
};

function GoogleMapWithApiKey({ apiKey }: { apiKey: string }) {
  const { data, loading, error } = useQuery(GET_TRAFFIC_DATA);
  const trafficData = data?.trafficSegments || [];

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(18);
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    preventGoogleFontsLoading: true,
  });

  if (!isLoaded || loading) {
    return <div className="loading">Loading Map...</div>;
  }

  if (error) {
    console.error("Traffic data fetch error:", error);
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
      >
        <TrafficLayer />
        {trafficData.map(
          (road: {
            id: string;
            road_name: string;
            congestion_level: string;
            latitude: number;
            longitude: number;
          }) => (
            <Marker
              key={road.id}
              position={{ lat: road.latitude, lng: road.longitude }}
              title={`${road.road_name} (${road.congestion_level})`}
            />
          ),
        )}
      </GoogleMap>
    </div>
  );
}

function GoogleMapComponent() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="error">
        Missing Google Maps API Key. Please set VITE_GOOGLE_MAPS_API_KEY in
        .env.local
      </div>
    );
  }

  return <GoogleMapWithApiKey apiKey={apiKey} />;
}

export default GoogleMapComponent;
