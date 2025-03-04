import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
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
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputComponent {
  value: string;
}
