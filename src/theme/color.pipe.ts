import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'auiRgbColor', pure: true })
export class RgbColorPipe implements PipeTransform {
  transform(color: string) {
    return `rgb(var(--aui-color-${color}))`;
  }
}

@Pipe({ name: 'auiRgbaColor', pure: true })
export class RgbaColorPipe implements PipeTransform {
  transform([color, opacity]: [string, number]) {
    return `rgba(var(--aui-color-${color}), ${opacity})`;
  }
}

@Pipe({ name: 'auiCssVar', pure: true })
export class CssVarPipe implements PipeTransform {
  transform(value: string) {
    return `var(--aui-${value})`;
  }
}
