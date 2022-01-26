export function rgbColor(color: string): string {
  return `rgb(var(--aui-color-${color}))`;
}

export function rgbaColor([color, opacity]: [string, number]) {
  return `rgba(var(--aui-color-${color}), ${opacity})`;
}

export function cssVar(value: string) {
  return `var(--aui-${value})`;
}
