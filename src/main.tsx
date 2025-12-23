import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";
import "./index.css";

// Initialize Apollo Client
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Initialize PostHog
if (typeof window !== "undefined") {
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  const posthogHost =
    import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageview: false, // We tracking pageviews manually or via the provider is better for SPAs
    });
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </PostHogProvider>
  </React.StrictMode>
);
