import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import chroma from 'chroma-js';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeComponent {
  mainColors = {
    primary: '#007af5',
    blue: '#007af5',
    green: '#00c261',
    yellow: '#f5a300',
    red: '#eb0027',
  };

  private styleEl: HTMLStyleElement;

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
    this.schema = Object.entries(seed).reduce((schema, [name, value]) => {
      Object.assign(schema, this.calcColors(name, value));
      return schema;
    }, {} as Record<string, string>);
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
    return this.calcColorStack(value).reduce(
      (acc, curr, index) => {
        acc[`${shortName}-${index}`] = curr;
        return acc;
      },
      {
        [name]: value,
      } as Record<string, string>,
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
