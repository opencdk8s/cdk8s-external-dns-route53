import { Construct } from 'constructs';
import * as k8s from './imports/k8s';
export * from './policy';
export * from './imports/k8s';


export interface AwsExternalDnsOptions {

  /**
   * Service Account Name for external-dns.
   *
   * @default - external-dns
   */
  readonly serviceAccountName?: string;

  /**
   * Args for controller.
   * @default - None
   */
  readonly args?: string[];

  /**
   * Namespace for external-dns
   *
   * @default - default
   */

  readonly namespace?: string;

  /**
   * image for external-dns.
   * @default - k8s.gcr.io/external-dns/external-dns:v0.7.6
   */
  readonly image?: string;

  /**
   * nodeSelector for external-dns.
   * @default - None
   */
  readonly nodeSelector?: { [key: string]: string };

  readonly kongTCP?: boolean;
}

/**
 * Generate external-dns config yaml.
 * see https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md
*/
export class AwsExternalDns extends Construct {
  /**
   * Service Account Name for external-dns.
   */
  public readonly serviceAccountName: string;
  /**
   * Kubernetes Deployment Name for external-dns.
   */
  public readonly deploymentName: string;
  /**
   * Namespace for external-dns.
   * @default - default
   */
  public readonly namespace: string ;
  /**
   * image for external-dns.
   * @default - k8s.gcr.io/external-dns/external-dns:v0.7.6
   */
  public readonly image: string ;

  public readonly nodeSelector: { [key: string]: string };

  public readonly kongTCP: boolean;


  constructor(scope: Construct, id: string, options: AwsExternalDnsOptions) {
    super(scope, id);
    this.serviceAccountName = options.serviceAccountName ?? 'external-dns';
    this.deploymentName = 'external-dns';
    this.namespace = options.namespace ?? 'default';
    this.image = options.image ?? 'k8s.gcr.io/external-dns/external-dns:v0.7.6';
    this.nodeSelector = options.nodeSelector ?? {};
    this.kongTCP = options.kongTCP ?? false;

    if (this.kongTCP) {
      new k8s.KubeClusterRole(this, 'external-dns-cluster-role', {
        metadata: {
          name: 'external-dns',
        },
        rules: [
          {
            apiGroups: [
              '',
            ],
            resources: [
              'services',
              'endpoints',
              'pods',
            ],
            verbs: [
              'get',
              'watch',
              'list',
            ],
          },
          {
            apiGroups: [
              'extensions',
              'networking.k8s.io',
            ],
            resources: [
              'ingresses',
            ],
            verbs: [
              'get',
              'watch',
              'list',
            ],
          },
          {
            apiGroups: [
              '',
            ],
            resources: [
              'nodes',
            ],
            verbs: [
              'list',
              'watch',
            ],
          },
          {
            apiGroups: [
              'configuration.konghq.com',
            ],
            resources: [
              'tcpingresses',
            ],
            verbs: [
              'get',
              'watch',
              'list',
            ],
          },
        ],
      });
    } else {
      new k8s.KubeClusterRole(this, 'external-dns-cluster-role', {
        metadata: {
          name: 'external-dns',
        },
        rules: [
          {
            apiGroups: [
              '',
            ],
            resources: [
              'services',
              'endpoints',
              'pods',
            ],
            verbs: [
              'get',
              'watch',
              'list',
            ],
          },
          {
            apiGroups: [
              'extensions',
              'networking.k8s.io',
            ],
            resources: [
              'ingresses',
            ],
            verbs: [
              'get',
              'watch',
              'list',
            ],
          },
          {
            apiGroups: [
              '',
            ],
            resources: [
              'nodes',
            ],
            verbs: [
              'list',
              'watch',
            ],
          },
        ],
      });

    }


    new k8s.KubeClusterRoleBinding(this, 'external-dns-cluster-role-binding', {
      metadata: {
        name: 'external-dns-viewer',
      },
      roleRef: {
        apiGroup: 'rbac.authorization.k8s.io',
        kind: 'ClusterRole',
        name: 'external-dns',
      },
      subjects: [
        {
          kind: 'ServiceAccount',
          name: this.serviceAccountName,
          namespace: this.namespace,
        },
      ],
    });

    new k8s.KubeDeployment(this, 'external-dns-deploy', {
      metadata: {
        name: this.deploymentName,
        namespace: this.namespace,
      },
      spec: {
        strategy: {
          type: 'Recreate',
        },
        selector: {
          matchLabels: {
            app: this.deploymentName,
          },
        },
        template: {
          metadata: {
            labels: {
              app: this.deploymentName,
            },
          },
          spec: {
            serviceAccountName: this.serviceAccountName,
            containers: [
              {
                name: this.deploymentName,
                image: this.image,
                args: this.argsFunc(options.args),
              },
            ],
            securityContext: {
              fsGroup: 65534,
            },
            nodeSelector: this.nodeSelector,
          },
        },
      },
    });
  }
  private argsFunc(args?: string[]):string[] {
    const defaultArgs = ['--source=service', '--source=ingress', '--provider=aws', '--registry=txt'];
    if (args) {
      args.forEach(e => defaultArgs.push(e));
    }
    if (this.kongTCP) {
      defaultArgs.push('--source=kong-tcpingress');
    }
    return defaultArgs;
  }
}
