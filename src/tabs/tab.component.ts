/* eslint-disable no-prototype-builtins */
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { coerceAttrBoolean } from '../utils/coercion';

import { TabContentDirective, TabLabelDirective } from './tab-directives';

@Component({
  selector: 'aui-tab',
  exportAs: 'auiTab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TabComponent implements AfterContentInit, OnDestroy, OnChanges {
  /** Plain text label for the tab, used when there is no template label. */
  @Input('label')
  textLabel = '';

  /** Whether or not to show the close button in the header */
  @Input()
  closeable = false;

  /** Whether or not the tab is disabled  */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: any) {
    this._disabled = coerceAttrBoolean(value);
  }

  @Output()
  close = new EventEmitter<void>();

  /** Content for the tab label given by `<ng-template [auiTabLabel]>`. */
  @ContentChild(TabLabelDirective, { static: false })
  templateLabel: TabLabelDirective;

  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  @ContentChild(TabContentDirective, { read: TemplateRef, static: false })
  _explicitContent: TemplateRef<any>;

  /** Template inside the AuiTab view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef, { static: true })
  _implicitContent: TemplateRef<any>;

  get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  /**
   * Whether the tab is currently active.
   */
  isActive = false;

  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position: number | null = null;

  /**
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin: number | null = null;

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /** Portal that will be the hosted content of the tab */
  private _contentPortal: TemplatePortal | null = null;

  private _disabled = false;

  constructor(private readonly _viewContainerRef: ViewContainerRef) {}

  ngAfterContentInit(): void {
    this._contentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent,
      this._viewContainerRef,
    );
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.hasOwnProperty('textLabel') ||
      changes.hasOwnProperty('disabled') ||
      changes.hasOwnProperty('closeable')
    ) {
      this._stateChanges.next();
    }
  }
}
