import * as iam from '@aws-cdk/aws-iam';

const AwsExternalDnsPolicy = [
  {
    Effect: 'Allow',
    Action: [
      'route53:ChangeResourceRecordSets',
    ],
    Resource: [
      'arn:aws:route53:::hostedzone/*',
    ],
  },
  {
    Effect: 'Allow',
    Action: [
      'route53:ListHostedZones',
      'route53:ListResourceRecordSets',
    ],
    Resource: [
      '*',
    ],
  },
];

/**
 * Aws External Dns Policy class ,help you add policy to your Iam Role for service account.
 */
export class AwsExternalDnsPolicyHelper {
  public static addPolicy(role: any) :any {
    AwsExternalDnsPolicy.forEach(e => {
      role.addToPolicy(iam.PolicyStatement.fromJson(e));
    });
    return role;
  }
};