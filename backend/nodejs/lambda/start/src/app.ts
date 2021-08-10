import { ECS } from 'aws-sdk';

const CLUSTER_ARN = process.env.CLUSTER_ARN as string;
const SERVICE_ARN = process.env.SERVICE_ARN as string;

export default async () => {
  const ecs = new ECS();

  // update service
  await ecs
    .updateService({
      cluster: CLUSTER_ARN,
      service: SERVICE_ARN,
      desiredCount: 1,
    })
    .promise();
};