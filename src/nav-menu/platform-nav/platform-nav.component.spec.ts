import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavGroupConfig, NavItemKey } from '../nav-menu.types';
import { PlatformNavModule } from '../platform-nav.module';

describe('PlatformNavComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlatformNavModule],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
  });

  it('should render correct template', () => {
    expect(fixture).toMatchSnapshot();

    ins.mainPanelCollapsed = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    ins.secondaryPanelCollapsed = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

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
  template: `
    <aui-platform-nav
      [(activatedKey)]="activatedKey"
      [groups]="navGroups"
      [(mainPanelCollapsed)]="mainPanelCollapsed"
      [(secondaryPanelCollapsed)]="secondaryPanelCollapsed"
    ></aui-platform-nav>
  `,
})
class TestComponent {
  activatedKey: NavItemKey;
  navGroups = platformNavConfig;
  mainPanelCollapsed = false;
  secondaryPanelCollapsed = false;
}
