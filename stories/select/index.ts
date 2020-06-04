import {
  ComponentSize,
  IconModule,
  OptionComponent,
  SelectModule,
} from '@alauda/ui';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

const trackFn = (val: any): string => val?.key || val;
const filterFn = (filter: string, option: OptionComponent) =>
  trackFn(option.value).includes(filter);
const tagClassFn = (_: string, tag: { key: string }) => `tag-${tag.key}`;

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('select', () => {
    const value = { key: 'option120' };
    const arr = new Array(5).fill(null).map((_, i) => i + 1);

    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const placeholder = text('placeholder', 'placeholder');
    const disabled = boolean('disabled', false);
    const loading = boolean('loading', false);
    const filterable = boolean('filterable', true);
    const allowCreate = boolean('allowCreate', true);
    const clearable = boolean('clearable', true);

    return {
      moduleMetadata: {
        imports: [SelectModule, IconModule],
      },
      template: /* HTML */ `
        value: {{ value | json }}
        <aui-select
          [(ngModel)]="value"
          [size]="size"
          [clearable]="clearable"
          [disabled]="disabled"
          [loading]="loading"
          [filterable]="filterable"
          [allowCreate]="allowCreate"
          [placeholder]="placeholder"
          [trackFn]="trackFn"
          [filterFn]="filterFn"
        >
          <aui-option-group *ngFor="let i of arr">
            <div auiOptionGroupTitle>group {{ i }}</div>
            <aui-option
              *ngFor="let j of arr"
              [label]="label"
              [labelContext]="{ key: 'option' + (arr.length * i + j) }"
              [value]="{ key: 'option' + (arr.length * i + j) }"
            >
              <aui-icon icon="sun"></aui-icon>
              option {{ arr.length * i + j }}
            </aui-option>
          </aui-option-group>
          <aui-option-placeholder>Empty</aui-option-placeholder>
        </aui-select>

        <ng-template #label let-label="key">
          <aui-icon icon="sun"></aui-icon>
          {{ label }}
        </ng-template>
      `,
      props: {
        value,
        size,
        disabled,
        loading,
        placeholder,
        filterable,
        allowCreate,
        clearable,
        trackFn,
        filterFn,
        arr,
      },
    };
  })
  .add('multi-select', () => {
    const value: any[] = [{ key: 'option1' }];

    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const placeholder = text('placeholder', 'placeholder');
    const disabled = boolean('disabled', false);
    const loading = boolean('loading', false);
    const filterable = boolean('filterable', true);
    const clearable = boolean('clearable', true);
    const allowCreate = boolean('allowCreate', true);

    return {
      moduleMetadata: {
        imports: [SelectModule, IconModule],
      },
      template: /* HTML */ `
        value: {{ value | json }}
        <aui-multi-select
          [(ngModel)]="value"
          required
          maxlength="4"
          minlength="2"
          [clearable]="clearable"
          [size]="size"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [loading]="loading"
          [filterable]="filterable"
          [allowCreate]="allowCreate"
          [trackFn]="trackFn"
          [filterFn]="filterFn"
          [tagClassFn]="tagClassFn"
        >
          <aui-option [value]="{key:'option1'}">option1</aui-option>
          <aui-option [value]="{key:'option2'}">option2</aui-option>
          <aui-option [value]="{key:'option3'}">option3</aui-option>
          <aui-option [value]="{key:'option4'}">option4</aui-option>
          <aui-option [value]="{key:'option5'}">option5</aui-option>
          <aui-option [value]="{key:'option6'}">option6</aui-option>
          <aui-option [value]="{key:'option7'}">option7</aui-option>
          <aui-option
            [value]="{key:'option8'}"
            [label]="option"
            [labelContext]="{ key: 'option8' }"
          >
            option icon
          </aui-option>
          <aui-option-placeholder>无</aui-option-placeholder>
        </aui-multi-select>
        <ng-template #option let-key="key">
          <aui-icon icon="sun"></aui-icon>
          key: {{key}}
        </ng-template>
      `,
      props: {
        size,
        value,
        placeholder,
        disabled,
        loading,
        clearable,
        filterable,
        allowCreate,
        trackFn,
        filterFn,
        tagClassFn,
      },
    };
  });
