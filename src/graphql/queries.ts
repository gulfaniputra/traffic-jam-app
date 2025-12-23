import { gql } from "@apollo/client";

export const GET_TRAFFIC_DATA = gql`
  query GetTrafficData {
    trafficSegments {
      id
      road_name
      area_name
      congestion_score
      congestion_level
      latitude
      longitude
      updated_at
    }
  }
`;

export const GET_LATEST_INSIGHTS = gql`
  query GetLatestInsights {
    trafficInsights {
      id
      generated_at
      summary
      top_congested_roads {
        road_name
        area_name
        congestion_score
        congestion_level
      }
      average_congestion_score
    }
  }
`;
