# cdk8s-external-dns-route53

Upstream Fork of [this repo](https://github.com/guan840912/cdk8s-external-dns)
Synths an install manifest for [ExternalDNS - Route53](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md)

## Controller version : `v0.7.6`

## Overview

### `install.yaml` example

```typescript
import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { AwsExternalDns } from '@opencdk8s/cdk8s-external-dns-route53';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    new AwsExternalDns(this, 'example', {
      args: [
        '--custom-arg=custom'
      ]
    })
    

  }
}

const app = new App();
new MyChart(app, 'example');
app.synth();
```
<details>
<summary>install.k8s.yaml</summary>

```yaml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: external-dns
rules:
  - apiGroups:
      - ""
    resources:
      - services
      - endpoints
      - pods
    verbs:
      - get
      - watch
      - list
  - apiGroups:
      - extensions
      - networking.k8s.io
    resources:
      - ingresses
    verbs:
      - get
      - watch
      - list
  - apiGroups:
      - ""
    resources:
      - nodes
    verbs:
      - list
      - watch
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: external-dns-viewer
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: external-dns
subjects:
  - kind: ServiceAccount
    name: external-dns
    namespace: default
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: external-dns
  namespace: default
spec:
  selector:
    matchLabels:
      app: external-dns
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: external-dns
    spec:
      containers:
        - args:
            - --source=service
            - --source=ingress
            - --provider=aws
            - --registry=txt
            - --txt-owner-id=external-dns
            - --custom-arg=custom
          image: k8s.gcr.io/external-dns/external-dns:v0.7.6
          name: external-dns
      securityContext:
        fsGroup: 65534
      serviceAccountName: external-dns
```
</details>

## Installation

### TypeScript

Use `yarn` or `npm` to install.

```sh
$ npm install @opencdk8s/cdk8s-external-dns-route53
```

```sh
$ yarn add @opencdk8s/cdk8s-external-dns-route53
```

### Python

```sh
$ pip install cdk8s-external-dns-route53
```

## Contribution

1. Fork ([link](https://github.com/opencdk8s/cdk8s-external-dns-route53/fork))
2. Bootstrap the repo:
  
    ```bash
    npx projen   # generates package.json 
    yarn install # installs dependencies
    ```
3. Development scripts:
   |Command|Description
   |-|-
   |`yarn compile`|Compiles typescript => javascript
   |`yarn watch`|Watch & compile
   |`yarn test`|Run unit test & linter through jest
   |`yarn test -u`|Update jest snapshots
   |`yarn run package`|Creates a `dist` with packages for all languages.
   |`yarn build`|Compile + test + package
   |`yarn bump`|Bump version (with changelog) based on [conventional commits]
   |`yarn release`|Bump + push to `master`
4. Create a feature branch
5. Commit your changes
6. Rebase your local changes against the master branch
7. Create a new Pull Request (use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for the title please)

## Licence

[Apache License, Version 2.0](./LICENSE)

## Author

[Hunter-Thompson](https://github.com/Hunter-Thompson)