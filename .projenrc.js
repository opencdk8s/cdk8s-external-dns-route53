const { ConstructLibraryCdk8s } = require('projen/lib/cdk8s');

const CDK_VERSION = '1.134.0';

const project = new ConstructLibraryCdk8s({
  author: 'Hunter Thompson',
  authorAddress: 'aatman@auroville.org.in',
  cdk8sVersion: '1.2.1',
  constructsVersion: '3.3.162',
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
    `@aws-cdk/aws-iam@${CDK_VERSION}`,
    `@aws-cdk/core@${CDK_VERSION}`,
  ],
  devDeps: [
    '@types/js-yaml@^3.12.5',
    'js-yaml@^3.14.0',
    `@aws-cdk/aws-iam@${CDK_VERSION}`,
    `@aws-cdk/core@${CDK_VERSION}`,
  ],
  bundledDeps: [
    '@types/js-yaml@^3.12.5',
    'js-yaml@^3.14.0',
  ],
  dependabot: false,
  pullRequestTemplate: false,
  codeCov: true,
  clobber: false,
  readme: true,
  mergify: true,
});

const common_exclude = ['cdk.out', 'yarn-error.log', 'coverage', '.DS_Store', '.idea', '.vs_code'];
project.gitignore.exclude(...common_exclude);
project.synth();
