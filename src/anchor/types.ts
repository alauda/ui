import { EventEmitter, TemplateRef } from '@angular/core';

export interface AnchorItemBase {
  readonly id?: string;
  readonly target?: HTMLElement;
  readonly label: string | TemplateRef<unknown>;
  readonly labelContext?: unknown;
  readonly labelChange?: EventEmitter<string | TemplateRef<unknown>>;
}

export interface AnchorItem extends AnchorItemBase {
  readonly level: number;
}

export interface AnchorTreeItem extends AnchorItemBase {
  children?: AnchorTreeItem[];
}
