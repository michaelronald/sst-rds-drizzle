import * as iam from "aws-cdk-lib/aws-iam";
import { StackContext, Api, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");
  const VPC_ACCESS_ROLE = iam.Role.fromRoleArn(
    stack,
    "VPC_ACCESS_ROLE",
    "arn:aws:iam::691781821755:role/lambda-vpc-role"
  );

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [DATABASE_URL],
        role: VPC_ACCESS_ROLE,
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
