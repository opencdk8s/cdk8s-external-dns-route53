const { ConstructLibraryCdk8s } = require('projen/lib/cdk8s');

const CDK_VERSION = '2.20.0';

const project = new ConstructLibraryCdk8s({
  author: 'Hunter Thompson',
  authorAddress: 'aatman@auroville.org.in',
  cdk8sVersion: '2.2.74',
  constructsVersion: '10.0.5',
  defaultReleaseBranch: 'development',
  stability: 'experimental',
  jsiiFqn: 'projen.ConstructLibraryCdk8s',
  name: '@opencdk8s/cdk8s-external-dns-route53',
  keywords: ['aws', 'cdk8s', 'external-dns-controller', 'cdk'],
  npmAccess: 'public',
  repositoryUrl: 'https://github.com/opencdk8s/cdk8s-external-dns-route53',
  python: {
    distName: 'cdk8s-external-dns-route53',
    module: 'cdk8s_external_dns_route53',
  },
  peerDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  devDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  publishToGo: {
    gitUserName: 'Hunter-Thompson',
    gitUserEmail: 'aatman@auroville.org.in',
    moduleName: 'github.com/opencdk8s/cdk8s-external-dns-route53-go',
  },
  dependabot: false,
  pullRequestTemplate: false,
  codeCov: true,
  clobber: false,
  readme: true,
  mergify: true,
  depsUpgrade: false,
});

const common_exclude = ['cdk.out', 'yarn-error.log', 'coverage', '.DS_Store', '.idea', '.vs_code'];
project.gitignore.exclude(...common_exclude);
project.synth();
