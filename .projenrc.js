const { ConstructLibraryCdk8s } = require('projen');

const CDK_VERSION = '1.92.0';

const project = new ConstructLibraryCdk8s({
  author: 'Hunter Thompson',
  authorAddress: 'aatman@auroville.org.in',
  cdk8sVersion: '1.0.0-beta.10',
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
    'constructs@^3.3.65',
    `@aws-cdk/aws-iam@^${CDK_VERSION}`,
    `@aws-cdk/core@^${CDK_VERSION}`,
  ],
  releaseEveryCommit: false,
  devDeps: [
    'constructs@^3.3.65',
    '@types/js-yaml@^3.12.5',
    'js-yaml@^3.14.0',
    `@aws-cdk/aws-iam@^${CDK_VERSION}`,
    `@aws-cdk/core@^${CDK_VERSION}`,
  ],
  bundledDeps: [
    '@types/js-yaml@^3.12.5',
    'js-yaml@^3.14.0',
  ],
  dependabot: false,
  gitignore: ['package.json', 'test/'],
  pullRequestTemplate: false,
  releaseBranches: ['development'],
  codeCov: true,
  clobber: false,
  readme: true,
  mergify: false,
});

const common_exclude = ['cdk.out', 'package.json', 'yarn-error.log', 'coverage', '.DS_Store', '.idea', '.vs_code'];
project.gitignore.exclude(...common_exclude);

project.synth();
