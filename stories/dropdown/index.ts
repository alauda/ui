import {
  ButtonModule,
  ButtonType,
  ComponentSize,
  DropdownModule,
  IconModule,
} from '@alauda/ui';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('dropdown', () => {
    const typeOptions = {
      [ButtonType.Default]: ButtonType.Default,
      [ButtonType.Primary]: ButtonType.Primary,
      [ButtonType.Success]: ButtonType.Success,
      [ButtonType.Warning]: ButtonType.Warning,
      [ButtonType.Danger]: ButtonType.Danger,
      [ButtonType.Info]: ButtonType.Info,
    };
    const type = select('type', typeOptions, ButtonType.Primary);

    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);

    const plain = boolean('plain', true);

    return {
      moduleMetadata: {
        imports: [DropdownModule, ButtonModule, IconModule],
      },
      template: /* HTML */ `
        <aui-dropdown-button
          [type]="type"
          [plain]="plain"
          [size]="size"
          type="primary"
        >
          dropdown button
          <aui-menu [size]="size">
            <aui-menu-group>
              <span auiMenuGroupTitle>default</span>
              <aui-menu-item>default</aui-menu-item>
            </aui-menu-group>
            <aui-menu-group>
              <aui-menu-item type="success">
                <aui-icon icon="copy"></aui-icon>
                success
              </aui-menu-item>
              <aui-menu-item type="warning">
                <aui-icon icon="copy"></aui-icon>
                warning
              </aui-menu-item>
              <aui-menu-item type="danger">
                <aui-icon icon="copy"></aui-icon>
                danger
              </aui-menu-item>
              <aui-menu-item type="danger" [disabled]="true">
                <aui-icon icon="copy"></aui-icon>
                disabled
              </aui-menu-item>
            </aui-menu-group>
            <aui-menu-group>
              <span auiMenuGroupTitle>submenu</span>
              <aui-submenu [size]="size">
                submenu
                <aui-menu-item>创建</aui-menu-item>
                <aui-menu-item>更新</aui-menu-item>
                <aui-menu-item>删除</aui-menu-item>
              </aui-submenu>
            </aui-menu-group>
          </aui-menu>
        </aui-dropdown-button>

        <button
          [aui-button]="type"
          [plain]="plain"
          [size]="size"
          auiDropdownActive="aui-trigger--actived"
          [auiDropdown]="menu"
          [auiDropdownContext]="{action: '更新'}"
        >
          trigger
          <aui-icon icon="angle_down" margin="left"></aui-icon>
        </button>
        <button
          [aui-button]="type"
          [plain]="plain"
          [size]="size"
          [auiDropdown]="menu"
          [auiDropdownContext]="{action: '创建'}"
        >
          trigger
          <aui-icon icon="angle_down" margin="left"></aui-icon>
        </button>

        <button
          aui-button="text"
          [plain]="true"
          [square]="true"
          [size]="size"
          [auiDropdown]="menu"
          [auiDropdownContext]="{action: '更多'}"
        >
          <aui-icon icon="angle_down"></aui-icon>
        </button>

        <aui-menu #menu [size]="size">
          <ng-template auiMenuContent let-action="action">
            <aui-menu-item>{{ action }}</aui-menu-item>
          </ng-template>
        </aui-menu>
      `,
      props: {
        type,
        plain,
        size,
      },
    };
  });
