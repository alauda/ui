import { IconModule } from '@alauda/ui';
import { HttpClientModule } from '@angular/common/http';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('icon', () => {
    const icon = text('icon', 'spinner');
    const size = text('size', '24px,24px');
    const color = text('color', 'black');
    return {
      moduleMetadata: {
        imports: [IconModule, HttpClientModule],
      },
      template: /* HTML */ `
        <div>
          大小默认是 font-size, 颜色默认是 currentColor。
          <a
            href="http://confluence.alauda.cn/pages/viewpage.action?pageId=24221238"
            target="_blank"
          >
            图标定义
          </a>
        </div>
        <aui-icon [icon]="icon" [size]="size" [color]="color"></aui-icon>
      `,
      props: {
        icon,
        size,
        color,
      },
    };
  });
