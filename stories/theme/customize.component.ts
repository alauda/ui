import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import chroma from 'chroma-js';
import { saveAs } from 'file-saver';

@Component({
    template: `<h2>Select Colors:</h2>
    <div class="picker-container">
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Primary Color</label>
        <aui-color-picker
          auiFormItemControl
          [(value)]="mainColors.primary"
          (valueChange)="updateColors()"
        ></aui-color-picker>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Normal Status Color</label>
        <aui-color-picker
          auiFormItemControl
          [(value)]="mainColors.blue"
          (valueChange)="updateColors()"
        ></aui-color-picker>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Success Color</label>
        <aui-color-picker
          auiFormItemControl
          [(value)]="mainColors.green"
          (valueChange)="updateColors()"
        ></aui-color-picker>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Warning Color</label>
        <aui-color-picker
          auiFormItemControl
          [(value)]="mainColors.yellow"
          (valueChange)="updateColors()"
        ></aui-color-picker>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Danger Color</label>
        <aui-color-picker
          auiFormItemControl
          [(value)]="mainColors.red"
          (valueChange)="updateColors()"
        ></aui-color-picker>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Export Colors</label>
        <button
          aui-button
          [square]="true"
          (click)="exportColors()"
        >
          <aui-icon
            icon="arrow_up_to_line"
            [style.transform]="'rotate(180deg)'"
          ></aui-icon>
        </button>
      </aui-form-item>
      <aui-form-item labelPosition="top">
        <label auiFormItemLabel>Export Script</label>
        <button
          aui-button
          [square]="true"
          (click)="exportScript()"
        >
          <aui-icon
            icon="arrow_up_to_line"
            [style.transform]="'rotate(180deg)'"
          ></aui-icon>
        </button>
      </aui-form-item>
    </div>

    <div class="demo-container">
      <h2>Examples:</h2>
      <button aui-button>button</button>
      <button aui-button="primary">button</button>
      <button aui-button="success">button</button>
      <button aui-button="warning">button</button>
      <button aui-button="danger">button</button>
      <br />
      <br />
      <input
        aui-input
        [style.width]="'200px'"
        placeholder="input"
      />
    </div> `,
    styleUrls: ['./customize.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CustomizeComponent {
  mainColors = {
    primary: '#007af5',
    blue: '#007af5',
    green: '#00c261',
    yellow: '#f5a300',
    red: '#eb0027',
  };

  private readonly styleEl: HTMLStyleElement;

  private schema: ColorSchema;

  constructor(private readonly elRef: ElementRef<HTMLElement>) {
    this.styleEl = document.createElement('style');
    this.elRef.nativeElement.append(this.styleEl);
    this.updateColors();
  }

  updateColors() {
    this.schema = new ColorSchema(this.mainColors);
    this.styleEl.innerHTML = `.demo-container {${this.schema.toString()} }`;
  }

  exportColors() {
    const colors = `:root {${this.schema.toString()} }`;

    saveAs(
      new Blob([colors], {
        type: 'text/plain;charset=utf-8',
      }),
      'aui-colors.css',
    );
  }

  exportScript() {
    const script = `(() => {
  const themeDefinition = \`html[aui-theme-mode=custom] { ${this.schema.toString()} }\`;
  
  window.__NAV_ICON_CUSTOM_COLORS = {
    main_active: '${this.schema.get('primary')}',
    secondary_active: '${this.schema.get('p-3')}',
    background_active: '${this.schema.get('p-5')}',
  };

  const htmlEl = document.querySelector('html');
  const headEl = document.querySelector('head');
  
  const styleEl = document.createElement('style');
  styleEl.innerHTML = themeDefinition;
  
  htmlEl.setAttribute('aui-theme-mode', 'custom');
  headEl.appendChild(styleEl);
  
  localStorage.setItem('theme-mode', 'custom');
})();
`;

    saveAs(
      new Blob([script], {
        type: 'text/plain;charset=utf-8',
      }),
      'override-theme.js',
    );
  }
}

class ColorSchema {
  private readonly prefix = '  --aui-color';
  private readonly schema: Record<string, string>;

  constructor(seed: Record<string, string>) {
    this.schema = Object.entries(seed).reduce<Record<string, string>>(
      (schema, [name, value]) => {
        Object.assign(schema, this.calcColors(name, value));
        return schema;
      },
      {},
    );
  }

  get(name: string) {
    return this.schema[name];
  }

  toString() {
    return Object.entries(this.schema).reduce(
      (acc, [name, value]) =>
        acc + `${this.prefix}-${name}: ${auiColorVar(value)};`,
      '',
    );
  }

  private calcColors(name: string, value: string) {
    const shortName = name.charAt(0);
    return this.calcColorStack(value).reduce<Record<string, string>>(
      (acc, curr, index) => {
        acc[`${shortName}-${index}`] = curr;
        return acc;
      },
      {
        [name]: value,
      },
    );
  }

  private calcColorStack(value: string) {
    const stack = [0.15, 0.3, 0.4, 0.7, 0.8, 0.9, 0.95].map(v =>
      chroma.mix(value, 'white', v, 'rgb').hex(),
    );
    stack.unshift(chroma.mix(value, 'black', 0.15, 'rgb').hex());
    return stack;
  }
}

function auiColorVar(color: string) {
  return chroma(color).rgb().join(', ');
}
