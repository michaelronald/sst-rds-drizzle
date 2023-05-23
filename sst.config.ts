import { SSTConfig } from "sst";
import { API } from "./stacks/API";

export default {
  config(_input) {
    return {
      name: "rds-drizzle",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
