import {
  IconModule,
  NavGroupConfig,
  NavMenuModule,
  PlatformNavModule,
} from '@alauda/ui';
import { Component } from '@angular/core';
import { storiesOf } from '@storybook/angular';

storiesOf('Nav Menu', module)
  .add('nav menu', () => {
    return {
      moduleMetadata: {
        imports: [NavMenuModule, IconModule],
        declarations: [NavMenuDemoComponent],
      },
      component: NavMenuDemoComponent,
    };
  })
  .add('platform nav', () => {
    return {
      moduleMetadata: {
        imports: [PlatformNavModule],
        declarations: [PlatformNavDemoComponent],
      },
      component: PlatformNavDemoComponent,
    };
  });

@Component({
  template: `
    <aui-nav-menu
      [(activatedKey)]="activatedKey"
      [(mainPanelCollapsed)]="mainPanelCollapsed"
      [(secondaryPanelCollapsed)]="secondaryPanelCollapsed"
    >
      <aui-nav-item-group>
        <ng-template auiNavItemGroupTitle>group 1</ng-template>

        <aui-nav-item key="0">
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>概览</ng-template>
        </aui-nav-item>

        <aui-nav-item key="1">
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>应用管理</ng-template>
        </aui-nav-item>
      </aui-nav-item-group>

      <aui-nav-item-group>
        <ng-template auiNavItemGroupTitle>group 2</ng-template>

        <aui-nav-item>
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>DevOps</ng-template>
          <aui-nav-item>
            <ng-template auiNavItemContent>持续交付</ng-template>

            <aui-nav-item key="2">
              <ng-template auiNavItemContent>流水线</ng-template>
            </aui-nav-item>
            <aui-nav-item key="3">
              <ng-template auiNavItemContent>生成镜像</ng-template>
            </aui-nav-item>
            <aui-nav-item key="4">
              <ng-template auiNavItemContent>更新服务</ng-template>
            </aui-nav-item>
          </aui-nav-item>

          <aui-nav-item>
            <ng-template auiNavItemContent>工具链</ng-template>

            <aui-nav-item key="5">
              <ng-template auiNavItemContent>代码仓库</ng-template>
            </aui-nav-item>
            <aui-nav-item key="6">
              <ng-template auiNavItemContent>制品仓库</ng-template>
            </aui-nav-item>
            <aui-nav-item key="7">
              <ng-template auiNavItemContent>代码检查</ng-template>
            </aui-nav-item>
            <aui-nav-item key="8">
              <ng-template auiNavItemContent>测试工具</ng-template>
            </aui-nav-item>
            <aui-nav-item key="9">
              <ng-template auiNavItemContent>项目管理</ng-template>
            </aui-nav-item>
          </aui-nav-item>
        </aui-nav-item>

        <aui-nav-item>
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>微服务</ng-template>
          <aui-nav-item key="10">
            <ng-template auiNavItemContent>服务</ng-template>
          </aui-nav-item>
          <aui-nav-item key="11">
            <ng-template auiNavItemContent>配置列表</ng-template>
          </aui-nav-item>
          <aui-nav-item key="12">
            <ng-template auiNavItemContent>熔断监控</ng-template>
          </aui-nav-item>
          <aui-nav-item key="13">
            <ng-template auiNavItemContent>调用链</ng-template>
          </aui-nav-item>
        </aui-nav-item>

        <aui-nav-item>
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>Service Mesh</ng-template>
          <aui-nav-item key="14">
            <ng-template auiNavItemContent>调用链</ng-template>
          </aui-nav-item>
        </aui-nav-item>
      </aui-nav-item-group>

      <aui-nav-item-group>
        <aui-nav-item key="15">
          <ng-template auiNavItemIcon>
            <aui-icon icon="search_s"></aui-icon>
          </ng-template>
          <ng-template auiNavItemContent>成员</ng-template>
        </aui-nav-item>
      </aui-nav-item-group>
    </aui-nav-menu>
  `,
})
class NavMenuDemoComponent {
  activatedKey = '2';
  mainPanelCollapsed = false;
  secondaryPanelCollapsed = false;
}

const platformNavConfig: NavGroupConfig[] = [
  {
    title: 'group 1',
    items: [
      {
        icon: 'search_s',
        label: '概览',
        key: 'overview',
        divider: true,
      },
      {
        icon: 'search_s',
        label: '应用管理',
        key: 'application',
        stage: 'Alpha',
      },
    ],
  },
  {
    title: 'group 2',
    items: [
      {
        icon: 'search_s',
        label: 'Devops',
        key: 'devops',
        children: [
          {
            label: '持续交付',
            key: 'delivery',
            children: [
              {
                label: '流水线',
                key: 'pipeline',
              },
              {
                label: '生成镜像',
                key: 'image',
              },
              {
                label: '更新服务',
                key: 'service',
              },
            ],
          },
          {
            label: '工具链',
            key: 'tool_chain',
            children: [
              {
                label: '代码仓库',
                key: 'code_repo',
              },
              {
                label: '制品仓库',
                key: 'product_repo',
              },
              {
                label: '代码检查',
                key: 'code_check',
              },
              {
                label: '测试工具',
                key: 'test_util',
              },
              {
                label: '项目管理',
                key: 'project_management',
              },
            ],
          },
        ],
      },
      {
        icon: 'search_s',
        label: '微服务',
        key: 'micro_service',
        children: [
          {
            label: '服务',
            key: 'service',
          },
          {
            label: '配置列表',
            key: 'config',
          },
          {
            label: '熔断监控',
            key: 'fusing',
          },
        ],
      },
      {
        icon: 'search_s',
        label: 'Service Mesh',
        key: 'service_mesh',
        children: [{ label: '调用链', stage: 'Beta', key: 'invoking_chain' }],
      },
    ],
  },
  {
    items: [
      {
        icon: 'search_s',
        label: '成员',
        key: 'member',
      },
    ],
  },
];

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'platform-nav-demo',
  template: `
    <aui-platform-nav
      [(activatedKey)]="activatedKey"
      [groups]="navGroups"
      [(mainPanelCollapsed)]="mainPanelCollapsed"
      [(secondaryPanelCollapsed)]="secondaryPanelCollapsed"
    ></aui-platform-nav>
  `,
})
export class PlatformNavDemoComponent {
  activatedKey = 'code_repo';
  navGroups: NavGroupConfig[] = platformNavConfig;
}
