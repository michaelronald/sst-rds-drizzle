import { StackContext, Api, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [DATABASE_URL],
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },
    routes: {
      "GET /hello-world": "packages/functions/src/hello-world/lambda.handler",
      "GET /migrate": "packages/functions/src/migrate.handler",
      "GET /get-users": "packages/functions/src/get-users/lambda.handler",
      "POST /insert-user": "packages/functions/src/insert-user/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
