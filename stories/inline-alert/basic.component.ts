import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
    <aui-inline-alert>
      <ng-container auiInlineAlertTitle>
        Kubernetes 是什么？（下面是 Kubernetes 的概述。下面是 Kubernetes
        的概述。下面是 Kubernetes 的概述。）
      </ng-container>
      <div>
        Kubernetes
        是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。
        Kubernetes 拥有一个庞大且快速增长的生态系统。Kubernetes
        的服务、支持和工具广泛可用。
      </div>
      <div>
        Kubernetes 这个名字源于希腊语，意为“舵手”或“飞行员”。 k8s 这个缩写是因为
        k 和 s 之间有八个字符的关系。 Google 在 2014 年开源了 Kubernetes 项目。
        Kubernetes 建立在 Google 在大规模运行生产工作负载方面拥有十几年的经验
        的基础上，结合了社区中最好的想法和实践。
      </div>
    </aui-inline-alert>
    <aui-inline-alert>
      <div>提示内容 <a href="javascript:void(0)">链接</a></div>
    </aui-inline-alert>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class InlineBasicComponent {}
