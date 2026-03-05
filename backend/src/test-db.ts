import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./data-source";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to Neon successfully");

    const tables = AppDataSource.entityMetadatas.map((e) => e.tableName);
    console.log(`Tables (${tables.length}):`, tables.join(", ") || "none");

    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

main();
