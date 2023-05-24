import { drizzle } from "drizzle-orm/node-postgres";
import { migrate as mig } from "drizzle-orm/node-postgres/migrator";
import { Config } from "sst/node/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: Config.DATABASE_URL,
});

export const DB = drizzle(pool);
export const migrate = async (path: string) => {
  return mig(DB, { migrationsFolder: path });
};

export * as SQL from "./index";
