import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './CongestionInsights.css';

function CongestionInsights() {
  const insights = useQuery(api.traffic.getLatestInsights);

  const getCongestionColor = (score: number) => {
    if (score < 0.1) return 'low';
    if (score < 0.4) return 'medium';
    if (score < 0.8) return 'high';
    return 'very-high';
  };

  const renderContent = () => {
    if (insights === undefined) {
      return <div className="insights-message">Loading insights...</div>;
    }

    if (!insights || insights.top_congested_roads.length === 0) {
      return (
        <div className="insights-message">
          <p>
            Traffic data is currently being generated. This may take a few
            moments.
          </p>
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            Refresh Data
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="insights-summary">
          <p>{insights.summary}</p>
          <p>
            Last generated:{' '}
            {new Date(insights.generated_at).toLocaleTimeString()}
          </p>
        </div>
        <ul className="insights-list">
          {insights.top_congested_roads.map((road, index) => (
            <li key={index} className="insight-item">
              <div className="road-info">
                <span className="road-rank">{index + 1}.</span>
                <span className="road-name">{road.road_name}</span>
                <span className="road-area">{road.area_name}</span>
              </div>
              <div className="congestion-info">
                <span
                  className={`congestion-score ${getCongestionColor(
                    road.congestion_score
                  )}`}
                >
                  {road.congestion_score.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="insights-container">
      <h2>Insights</h2>
      {renderContent()}
    </div>
  );
}

export default CongestionInsights;