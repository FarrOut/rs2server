import * as cdk from "aws-cdk-lib";
import { ImagePipeline } from "cdk-image-pipeline";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class ImagePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const machineImage = ec2.MachineImage.latestAmazonLinux2023();
    const machineImageConfig = machineImage.getImage(this);
    const amiId = machineImageConfig.imageId;

    // Create a new image pipeline with the required properties
    new ImagePipeline(this, "RustImagePipeline", {
      components: [
        {
          document: "./lib/components/steamcmd.yml",
          name: "steamcmd",
          version: "0.0.1",
        },
        {
          document: "./lib/components/rust.yml",
          name: "rust",
          version: "0.0.1",
        },
      ],
      parentImage: amiId,
      ebsVolumeConfigurations: [
        {
          deviceName: "/dev/xvda",
          ebs: {
            encrypted: true,
            iops: 200,
            kmsKeyId: "alias/app1/key",
            volumeSize: 20,
            volumeType: "gp3",
            throughput: 1000,
          },
        },
      ],
    });
  }
}
