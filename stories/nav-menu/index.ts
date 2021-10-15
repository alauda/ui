import {
  IconModule,
  NavGroupConfig,
  NavItemConfig,
  NavMenuModule,
} from '@alauda/ui';
import { Component } from '@angular/core';
import { storiesOf } from '@storybook/angular';

storiesOf('Nav Menu', module)
  .add('nav menu', () => ({
    moduleMetadata: {
      imports: [NavMenuModule, IconModule],
      declarations: [NavMenuDemoComponent],
    },
    component: NavMenuDemoComponent,
  }))
  .add('grouped nav menu', () => ({
    moduleMetadata: {
      imports: [NavMenuModule, IconModule],
      declarations: [NavMenuDemoComponent],
    },
    component: NavMenuGroupDemoComponent,
  }));

const config = [
  {
    icon: 'copy',
    label: '概览',
    key: '0',
  },
  {
    icon: 'copy',
    label: '应用管理',
    key: '1',
  },
  {
    icon: 'copy',
    label: '持续交付',
    key: '2',
    children: [
      {
        icon: 'copy',
        label: '流水线',
        key: '4',
      },
      {
        icon: 'copy',
        label: '持续发布',
        key: '5',
      },
      {
        icon: 'copy',
        label: '持续构建',
        key: '6',
      },
    ],
  },
  {
    icon: 'copy',
    label: '运维中心',
    key: '3',
    children: [
      {
        icon: 'copy',
        label: '监控',
        key: '7',
        href: '/monitor',
      },
      {
        icon: 'copy',
        label: '日志',
        key: '8',
        children: [
          {
            icon: 'copy',
            label: '日志查询分析',
            key: '10',
            href: '/workspace',
          },
          {
            icon: 'copy',
            label: '策略管理',
            key: '11',
          },
          {
            icon: 'copy',
            label: '导入记录',
            key: '12',
          },
        ],
      },
      {
        icon: 'copy',
        label: '告警',
        key: '9',
      },
    ],
  },
];

@Component({
  selector: 'aui-nav-demo',
  template: `
    <aui-nav-menu
      [(activatedKey)]="activatedKey"
      [(mainPanelCollapsed)]="mainPanelCollapsed"
      [(secondaryPanelCollapsed)]="secondaryPanelCollapsed"
      [hideMainPanelToggle]="true"
      [items]="navConfig"
    >
    </aui-nav-menu>
  `,
})
export class NavMenuDemoComponent {
  activatedKey = '2';
  mainPanelCollapsed = false;
  secondaryPanelCollapsed = false;
  navConfig: NavItemConfig[] = config;
}

@Component({
  template: `
    <aui-nav-menu
      [(activatedKey)]="activatedKey"
      [(mainPanelCollapsed)]="mainPanelCollapsed"
      [(secondaryPanelCollapsed)]="secondaryPanelCollapsed"
      [hideMainPanelToggle]="true"
      [groups]="navConfig"
    >
    </aui-nav-menu>
  `,
})
export class NavMenuGroupDemoComponent {
  activatedKey = '2';
  mainPanelCollapsed = false;
  secondaryPanelCollapsed = false;
  navConfig: NavGroupConfig[] = [
    {
      title: 'group',
      items: config,
    },
  ];
}
