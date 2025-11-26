import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './TrafficDataList.css';

function TrafficDataList() {
  const trafficData = useQuery(api.traffic.getTrafficData);

  const getCongestionColor = (level: string) => {
    if (level === 'Low') return 'low';
    if (level === 'Medium') return 'medium';
    if (level === 'High') return 'high';
    return 'very-high';
  };

  return (
    <div className="traffic-data-container">
      <h2>Latest Traffic Conditions</h2>
      {trafficData === undefined && <div className="loading">Loading...</div>}
      {trafficData && (
        <ul className="traffic-list">
          {trafficData.map((road, index) => (
            <li key={index} className="traffic-item">
              <div className="road-info">
                <span className="road-name">{road.road_name}</span>
                <span className="road-area">{road.area_name}</span>
              </div>
              <div className="congestion-info">
                <span
                  className={`congestion-level ${getCongestionColor(
                    road.congestion_level
                  )}`}
                >
                  {road.congestion_level}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrafficDataList;

