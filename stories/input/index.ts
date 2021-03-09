import { ComponentSize, IconModule, InputModule } from '@alauda/ui';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('input', () => ({
    moduleMetadata: {
      imports: [InputModule, FormsModule],
    },
    template: /* HTML */ `
      <div>
        <p style="margin-top: 26px;">Input:</p>
        <input
          style="margin-top: 16px;"
          size="large"
          aui-input
          [(ngModel)]="value"
          placeholder="placeholder"
        />
        <input
          style="margin-top: 16px;"
          size="medium"
          aui-input
          [(ngModel)]="value"
          placeholder="placeholder"
        />
        <input
          readonly
          style="margin-top: 16px;"
          size="small"
          aui-input
          [(ngModel)]="value"
          placeholder="readonly"
        />
        <input
          disabled
          style="margin-top: 16px;"
          size="mini"
          aui-input
          [(ngModel)]="value"
          placeholder="disabled"
        />
        <p style="margin-top: 26px;">Textarea:</p>
        <textarea
          style="margin-top: 16px;"
          size="large"
          aui-input
          [(ngModel)]="value"
          placeholder="size:large, default 3 rows"
        ></textarea>
        <textarea
          style="margin-top: 16px;"
          size="medium"
          aui-input
          [(ngModel)]="value"
          placeholder="size:medium, default 3 rows"
        ></textarea>
        <textarea
          readonly
          style="margin-top: 16px;"
          size="small"
          aui-input
          [(ngModel)]="value"
          placeholder="size:small, default 3 rows"
        ></textarea>
        <textarea
          disabled
          style="margin-top: 16px;"
          size="mini"
          aui-input
          [(ngModel)]="value"
          placeholder="size:mini, default 3 rows"
        ></textarea>
        <p style="margin-top: 26px;">
          Textarea with autosize (size:default = medium):
        </p>
        <textarea
          autosize
          aui-input
          placeholder="autosize default: 1 row"
        ></textarea>
        <textarea
          [autosize]="{minRows:3,maxRows:10}"
          style="margin-top: 16px;"
          aui-input
          placeholder="autosize: min 3 rows, max 10 rows"
        ></textarea>
      </div>
    `,
  }))
  .add('input group', () => {
    const disabled = boolean('disabled', false);
    return {
      moduleMetadata: {
        imports: [InputModule, IconModule],
      },
      template: /* HTML */ `
        <div style="margin-top: 20px;">
          <aui-input-group>
            <span auiInputAddonBefore>HTTPS</span>
            <span auiInputAddonAfter>GB</span>
            <aui-icon auiInputPrefix icon="search_s"></aui-icon>
            <aui-icon auiInputSuffix icon="spinner"></aui-icon>
            <input
              aui-input
              size="large"
              [disabled]="disabled"
              placeholder="placeholder"
            />
          </aui-input-group>
        </div>
        <div style="margin-top: 20px;">
          <aui-input-group>
            <span auiInputAddonBefore>HTTPS</span>
            <span auiInputAddonAfter>GB</span>
            <aui-icon auiInputPrefix icon="search_s"></aui-icon>
            <aui-icon auiInputSuffix icon="spinner"></aui-icon>
            <input
              aui-input
              size="medium"
              [disabled]="disabled"
              placeholder="placeholder"
            />
          </aui-input-group>
        </div>
        <div style="margin-top: 20px;">
          <aui-input-group>
            <span auiInputAddonBefore>HTTPS</span>
            <span auiInputAddonAfter>GB</span>
            <aui-icon auiInputPrefix icon="search_s"></aui-icon>
            <aui-icon auiInputSuffix icon="spinner"></aui-icon>
            <input
              aui-input
              size="small"
              [disabled]="disabled"
              placeholder="placeholder"
            />
          </aui-input-group>
        </div>
        <div style="margin-top: 20px;">
          <aui-input-group>
            <span auiInputAddonBefore>HTTPS</span>
            <span auiInputAddonAfter>GB</span>
            <aui-icon auiInputPrefix icon="search_s"></aui-icon>
            <aui-icon auiInputSuffix icon="spinner"></aui-icon>
            <input
              aui-input
              size="mini"
              [disabled]="disabled"
              placeholder="placeholder"
            />
          </aui-input-group>
        </div>
      `,
      props: {
        disabled,
      },
    };
  })
  .add('tags input', () => {
    const value = ['app', 'service'];
    const pattern = /^a/;
    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const checkArrFn: ValidatorFn = control => {
      const value = control.value as string[];
      if (value.includes('b')) {
        return { patternA: true };
      }
      return null;
    };

    const control = new FormControl(value, { validators: [checkArrFn] });
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const allowRepeat = boolean('allowRepeat', true);
    const allowEmpty = boolean('allowEmpty', false);
    const checkFn: ValidatorFn = control => {
      const value = control.value as string;
      if (value.startsWith('a')) {
        return { patternA: true };
      }
      return null;
    };
    const printStatus = () => {
      console.log('print control status to make sure sync', control.status);
    };

    return {
      moduleMetadata: { imports: [InputModule, ReactiveFormsModule] },
      template: /* HTML */ `
        <aui-tags-input
          [size]="size"
          [formControl]="control"
          [inputValidator]="checkFn"
          [clearable]="true"
          [allowRepeat]="allowRepeat"
          [allowEmpty]="allowEmpty"
          placeholder="placeholder"
          [maxRowCount]="3"
        ></aui-tags-input>
        {{ value | json }} status:{{control.status}}
        <br />
        <button (click)="printStatus()">submit</button>
        <br />
        <br />
        <div>只读标签，不可删除</div>
        <aui-tags-input
          [size]="size"
          [formControl]="control"
          [inputValidator]="checkFn"
          [clearable]="true"
          [readonlyTags]="['service']"
          [allowRepeat]="allowRepeat"
          [allowEmpty]="allowEmpty"
          placeholder="placeholder"
        ></aui-tags-input>
      `,
      props: {
        checkFn,
        control,
        pattern,
        value,
        size,
        allowRepeat,
        allowEmpty,
        printStatus,
      },
    };
  })
  .add('search input', () => {
    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const searchButton = boolean('searchButton', false);
    const searching = boolean('searching', false);
    const clearable = boolean('clearable', false);
    const disabled = boolean('disabled', false);
    const keyword = text('keyword', 'keyword');

    const onChangeHandler = action('change');
    const onSearchHandler = action('search');
    const onClearHandler = action('clear');

    return {
      moduleMetadata: {
        imports: [InputModule],
      },
      template: /* HTML */ `
        <aui-search
          [size]="size"
          [searchButton]="searchButton"
          [searching]="searching"
          [clearable]="clearable"
          [disabled]="disabled"
          [(keyword)]="keyword"
          placeholder="placeholder"
          (search)="onSearchHandler($event)"
          (keywordChange)="onChangeHandler($event)"
          (clear)="onClearHandler($event)"
        ></aui-search>
        {{ keyword }}
      `,
      props: {
        size,
        searchButton,
        searching,
        clearable,
        disabled,
        keyword,
        onChangeHandler,
        onSearchHandler,
        onClearHandler,
      },
    };
  })
  .add('number input', () => {
    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const min = number('min', 0);
    const max = number('max', 10);
    const step = number('step', 1);
    const precision = number('precision', 1);
    const value = number('value', 4);
    const disabled = boolean('disabled', false);
    const controls = boolean('controls', true);

    return {
      moduleMetadata: {
        imports: [InputModule, FormsModule],
      },
      template: /* HTML */ `
        <aui-number-input
          [size]="size"
          [step]="step"
          [precision]="precision"
          [min]="min"
          [max]="max"
          [controls]="controls"
          [disabled]="disabled"
          placeholder="placeholder"
          [(ngModel)]="value"
        ></aui-number-input>
        <br />
        {{ value | json }}
      `,
      props: {
        size,
        step,
        precision,
        min,
        max,
        value,
        disabled,
        controls,
      },
    };
  });
