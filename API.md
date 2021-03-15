# API Reference

**Classes**

Name|Description
----|-----------
[AwsExternalDns](#opencdk8s-cdk8s-external-dns-route53-awsexternaldns)|Generate external-dns config yaml.


**Structs**

Name|Description
----|-----------
[AwsExternalDnsOptions](#opencdk8s-cdk8s-external-dns-route53-awsexternaldnsoptions)|*No description*



## class AwsExternalDns 🔹 <a id="opencdk8s-cdk8s-external-dns-route53-awsexternaldns"></a>

Generate external-dns config yaml.

see https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new AwsExternalDns(scope: Construct, id: string, options: AwsExternalDnsOptions)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **options** (<code>[AwsExternalDnsOptions](#opencdk8s-cdk8s-external-dns-route53-awsexternaldnsoptions)</code>)  *No description*
  * **args** (<code>Array<string></code>)  Args for controller. __*Default*__: None
  * **image** (<code>string</code>)  image for external-dns. __*Default*__: k8s.gcr.io/external-dns/external-dns:v0.7.6
  * **namespace** (<code>string</code>)  Namespace for external-dns. __*Default*__: default
  * **serviceAccountName** (<code>string</code>)  Service Account Name for external-dns. __*Default*__: external-dns



### Properties


Name | Type | Description 
-----|------|-------------
**deploymentName**🔹 | <code>string</code> | Kubernetes Deployment Name for external-dns.
**image**🔹 | <code>string</code> | image for external-dns.
**namespace**🔹 | <code>string</code> | Namespace for external-dns.
**serviceAccountName**🔹 | <code>string</code> | Service Account Name for external-dns.



## struct AwsExternalDnsOptions 🔹 <a id="opencdk8s-cdk8s-external-dns-route53-awsexternaldnsoptions"></a>






Name | Type | Description 
-----|------|-------------
**args**?🔹 | <code>Array<string></code> | Args for controller.<br/>__*Default*__: None
**image**?🔹 | <code>string</code> | image for external-dns.<br/>__*Default*__: k8s.gcr.io/external-dns/external-dns:v0.7.6
**namespace**?🔹 | <code>string</code> | Namespace for external-dns.<br/>__*Default*__: default
**serviceAccountName**?🔹 | <code>string</code> | Service Account Name for external-dns.<br/>__*Default*__: external-dns



