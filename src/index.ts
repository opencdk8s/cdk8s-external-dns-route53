import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';

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


  constructor(scope: Construct, id: string, options: AwsExternalDnsOptions) {
    super(scope, id);
    this.serviceAccountName = options.serviceAccountName ?? 'external-dns';
    this.deploymentName = 'external-dns';
    this.namespace = options.namespace ?? 'default';
    this.image = options.image ?? 'k8s.gcr.io/external-dns/external-dns:v0.7.6';
    new cdk8s.ApiObject(this, 'external-dns-cluster-role', {
      apiVersion: 'rbac.authorization.k8s.io/v1beta1',
      kind: 'ClusterRole',
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
    new cdk8s.ApiObject(this, 'external-dns-cluster-role-binding', {
      apiVersion: 'rbac.authorization.k8s.io/v1beta1',
      kind: 'ClusterRoleBinding',
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

    new cdk8s.ApiObject(this, 'external-dns-deploy', {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
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
          },
        },
      },
    });
  }
  private argsFunc(args?: string[]):string[] {
    const defaultArgs = ['--source=service', '--source=ingress', '--provider=aws', '--registry=txt', '--txt-owner-id=external-dns'];
    if (args) {
      args.forEach(e => defaultArgs.push(e));
    }
    return defaultArgs;
  }
}
