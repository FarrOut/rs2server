#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RustServerStack } from "../lib/rust-server-stack";
import { ImagePipelineStack } from "../lib/image-pipeline-stack";

const app = new cdk.App();

new ImagePipelineStack(app, "ImagePipelineStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new RustServerStack(app, "RustServerStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
