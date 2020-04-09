import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'aui-tab-body',
  templateUrl: './tab-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TabBodyComponent implements OnDestroy {
  private _content: TemplatePortal;

  content$ = new BehaviorSubject<TemplatePortal>(null);

  /** The portal host inside of this container into which the tab body content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true })
  _portalOutlet: CdkPortalOutlet;

  /** The tab body content to display. */
  @Input()
  get content() {
    return this._content;
  }

  set content(content: TemplatePortal) {
    if (this._content !== content) {
      this.content$.next(content);
    }
    this._content = content;
  }

  ngOnDestroy() {
    this.content$.complete();
  }
}
