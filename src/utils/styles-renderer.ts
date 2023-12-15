export function getCompatibleStylesRenderer() {
  if ('CSSStyleSheet' in self && 'adoptedStyleSheets' in document) {
    return new CSSStyleSheetRenderer();
  }
  return new StylesRenderer();
}

export class StylesRenderer implements Renderer {
  private styleElement: HTMLStyleElement;

  render(styles: string): void {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.append(this.styleElement);
    }
    this.styleElement.innerHTML = styles;
  }

  cleanup(): void {
    this.styleElement?.remove();
  }
}

export class CSSStyleSheetRenderer implements Renderer {
  private styleSheet: CSSStyleSheet;

  constructor(private readonly options?: CSSStyleSheetInit) {}

  render(styles: string): void {
    if (!this.styleSheet) {
      this.styleSheet = new CSSStyleSheet(this.options);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        this.styleSheet,
      ];
    }
    this.styleSheet.replaceSync(styles);
  }

  cleanup(): void {
    if (!this.styleSheet) {
      return;
    }

    const i = document.adoptedStyleSheets.indexOf(this.styleSheet);
    if (i >= 0) {
      document.adoptedStyleSheets.splice(i, 1);
    }
  }
}

interface Renderer {
  render(styles: string): void;
  cleanup(): void;
}
