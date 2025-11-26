// convex/keys.ts
import { query } from './_generated/server';

export const getGoogleMapsApiKey = query({
  handler: async () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GOOGLE_MAPS_API_KEY is not set in the environment variables on the Convex backend.'
      );
    }
    return apiKey;
  },
});
