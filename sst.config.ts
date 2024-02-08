/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "announcement-module",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL as string,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
          GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
          GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
          EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST as string,
          EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT as string,
          EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER as string,
          EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD as string,
          EMAIL_FROM: process.env.EMAIL_FROM as string,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
