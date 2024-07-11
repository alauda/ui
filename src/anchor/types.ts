import { EventEmitter, TemplateRef } from '@angular/core';

export interface AnchorItemBase {
  readonly id?: string;
  readonly target?: HTMLElement;
  readonly label: TemplateRef<unknown> | string;
  readonly labelContext?: unknown;
  readonly labelChange?: EventEmitter<TemplateRef<unknown> | string>;
}

export interface AnchorItem extends AnchorItemBase {
  readonly level: number;
}

export interface AnchorTreeItem extends AnchorItemBase {
  children?: AnchorTreeItem[];
}
