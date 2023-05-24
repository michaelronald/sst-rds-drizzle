import { ApiHandler } from "sst/node/api";
import { SQL } from "@rds-drizzle/core/sql";
import { users } from "@rds-drizzle/core/sql/schema";

export const handler = ApiHandler(async (_evt) => {
  const response = await SQL.DB.select().from(users);

  return {
    body: JSON.stringify(response, null, 2),
  };
});
