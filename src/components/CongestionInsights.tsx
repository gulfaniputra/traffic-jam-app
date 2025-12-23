import { useQuery } from "@apollo/client";
import { GET_LATEST_INSIGHTS } from "../graphql/queries";
import "./CongestionInsights.css";

function CongestionInsights() {
  const { data, loading, error } = useQuery(GET_LATEST_INSIGHTS);

  // The query returns an array of TrafficInsight, we probably want the first one (most recent)
  // assuming the backend returns all. If the resolver just returns all, we might need to pick one.
  // The resolver `trafficInsights` returns `TrafficInsight[]`. The Convex one was `getLatestInsights`.
  // I will assume for now we take the first element if it exists, or the backend should have filtered it.
  // Based on the name `getLatestInsights` (plural?) vs schema. Assuming we render the list or just the first.
  // The previous code used `insights.summary` directly, implying `insights` was a SINGLE object.
  // BUT the new GraphQL query `trafficInsights` returns an ARRAY `[TrafficInsight]`.
  // Wait, the previous code: `const insights = useQuery(api.traffic.getLatestInsights);`
  // And usage: `insights.summary`. So Convex returned a SINGLE object.
  // My new GraphQL query: `trafficInsights` returns `[TrafficInsight]`.
  // So I should take the first one or map them.
  // Let's assume for now I take the first one: `data?.trafficInsights?.[0]`.

  const insights = data?.trafficInsights?.[0]; // Taking the first one based on migration necessity

  const getCongestionColor = (score: number) => {
    if (score < 0.1) return "low";
    if (score < 0.4) return "medium";
    if (score < 0.8) return "high";
    return "very-high";
  };

  const renderContent = () => {
    if (loading) {
      return <div className="insights-message">Loading insights...</div>;
    }

    if (error) {
      return <div className="insights-message">Error loading insights.</div>;
    }

    if (
      !insights ||
      !insights.top_congested_roads ||
      insights.top_congested_roads.length === 0
    ) {
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
            Last generated:{" "}
            {new Date(insights.generated_at).toLocaleTimeString()}
          </p>
        </div>
        <ul className="insights-list">
          {insights.top_congested_roads.map((road: any, index: number) => (
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
                  title="Traffic congestion increases as the background color shifts from green to red."
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
