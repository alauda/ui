import { ButtonModule, TooltipModule } from '@alauda/ui';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('tooltip', () => {
    const content = text('content', 'content text');
    const typeOptions = {
      default: 'default',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
    };
    const type = select('type', typeOptions, 'default');
    const triggerOptions = {
      hover: 'hover',
      click: 'click',
      focus: 'focus',
    };
    const trigger = select('trigger', triggerOptions, 'hover');

    const positionOptions = {
      top: 'top',
      'top start': 'top start',
      'top end': 'top end',
      bottom: 'bottom',
      'bottom start': 'bottom start',
      'bottom end': 'bottom end',
      start: 'start',
      'start top': 'start top',
      'start bottom': 'start bottom',
      end: 'end',
      'end top': 'end top',
      'end bottom': 'end bottom',
    };
    const position = select('position', positionOptions, 'top');
    const disabled = boolean('disabled', false);

    const onShow = action('show');
    const onHide = action('hide');

    return {
      moduleMetadata: {
        imports: [TooltipModule, ButtonModule],
      },
      template: /* HTML */ `
        <div style="padding: 50px;">
          <button
            aui-button
            [auiTooltip]="content"
            [auiTooltipType]="type"
            [auiTooltipPosition]="position"
            [auiTooltipTrigger]="trigger"
            [auiTooltipDisabled]="disabled"
            (auiTooltipShow)="onShow()"
            (auiTooltipHide)="onHide()"
            auiTooltipActive="tooltip-actived"
          >
            text
          </button>
          <button
            aui-button
            [auiTooltip]="template"
            [auiTooltipType]="type"
            [auiTooltipPosition]="position"
            [auiTooltipTrigger]="trigger"
            [auiTooltipDisabled]="disabled"
            (auiTooltipShow)="onShow()"
            (auiTooltipHide)="onHide()"
          >
            template
          </button>
          <button
            aui-button
            [auiTooltipCopy]="content"
            [auiTooltipPosition]="'bottom'"
          >
            copy
          </button>
        </div>
        <ng-template #template>
          <button aui-button="primary">{{ content }}</button>
        </ng-template>
      `,
      props: {
        content,
        type,
        trigger,
        position,
        disabled,
        onHide,
        onShow,
      },
    };
  });
