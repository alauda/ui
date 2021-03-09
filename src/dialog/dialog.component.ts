import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../utils';

import { DialogConfig } from './dialog-config';
import { throwDialogContentAlreadyAttachedError } from './utils';

@Component({
  selector: 'aui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  preserveWhitespaces: false,
})
export class DialogComponent {
  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet: CdkPortalOutlet;

  bem: Bem = buildBem('aui-dialog');

  config: DialogConfig;

  hidden = false;

  get id() {
    return this._id;
  }

  set id(value) {
    this.elementRef.nativeElement.dataset.id = value;
  }

  private readonly _id: string;

  get rootClass() {
    return `${this.bem.block(this.config.size)} ${
      this.config.fitViewport ? this.bem.modifier('fit-viewport') : ''
    }`;
  }

  get customStyle() {
    return this.hidden
      ? {
          display: 'none',
        }
      : {};
  }

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }
    this.blurActiveElement();
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }
    this.blurActiveElement();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  private blurActiveElement() {
    if (document) {
      (document.activeElement as HTMLElement).blur();
    }
  }
}
