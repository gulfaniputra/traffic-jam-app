// convex/crons.ts
import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

// Schedule a cron job to update traffic data every 15 minutes.
// This aligns with the PRD requirement for the Insights tab refresh interval.
// crons.cron(
//   'update_traffic_data', // A unique identifier for this cron job
//   '*/15 * * * *', // Every 15 minutes
//   internal.traffic.updateAllTrafficData, // The function to execute
//   {} // Arguments for the function
// );

export default crons;