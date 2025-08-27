import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-input-group',
  template: `
    <div style="margin-top: 20px;">
      <aui-input-group>
        <span auiInputAddonBefore>HTTPS</span>
        <span auiInputAddonAfter>GB</span>
        <aui-icon
          auiInputPrefix
          icon="magnifier"
        ></aui-icon>
        <aui-icon
          auiInputSuffix
          icon="spinner"
        ></aui-icon>
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
        <aui-icon
          auiInputPrefix
          icon="magnifier"
        ></aui-icon>
        <aui-icon
          auiInputSuffix
          icon="spinner"
        ></aui-icon>
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
        <aui-icon
          auiInputPrefix
          icon="magnifier"
        ></aui-icon>
        <aui-icon
          auiInputSuffix
          icon="spinner"
        ></aui-icon>
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
        <aui-icon
          auiInputPrefix
          icon="magnifier"
        ></aui-icon>
        <aui-icon
          auiInputSuffix
          icon="spinner"
        ></aui-icon>
        <input
          aui-input
          size="mini"
          [disabled]="disabled"
          placeholder="placeholder"
        />
      </aui-input-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputGroupComponent {
  @Input() disabled: boolean;
}
