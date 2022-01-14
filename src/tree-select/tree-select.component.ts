import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { CommonFormControl } from '../form/public-api';
import { InputComponent } from '../input/public-api';
import { TrackFn } from '../select/select.types';
import { TooltipDirective } from '../tooltip/public-api';
import { coerceAttrBoolean, coerceString } from '../utils';

import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeNode } from './tree-select.types';

@Component({
  selector: 'aui-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true,
    },
  ],
})
export class TreeSelectComponent<T = unknown> extends CommonFormControl<T> {
  @Input()
  get nodesData() {
    return this._nodesData;
  }

  set nodesData(val) {
    if (!val || val === this._nodesData) {
      return;
    }
    this._nodesData = val;
    this.flattedNodes = this.flatNodesData(val);
    this.updateSelectDisplay(this.propValue);
  }

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  get filterable() {
    return this._filterable;
  }

  set filterable(val: boolean | '') {
    this._filterable = coerceAttrBoolean(val);
  }

  @Input()
  get clearable() {
    return this._clearable;
  }

  set clearable(val: boolean | '') {
    this._clearable = coerceAttrBoolean(val);
  }

  @Input()
  get leafOnly() {
    return this._leafOnly;
  }

  set leafOnly(val: boolean | '') {
    this._leafOnly = coerceAttrBoolean(val);
  }

  @Input()
  filterFn = this._filterFn;

  @Input()
  trackFn: TrackFn<T> = this._trackFn;

  @Input()
  labelFn?: (value: T) => string;

  @Output()
  filterChange = new EventEmitter<string>();

  @Output()
  show = new EventEmitter<void>();

  @Output()
  hide = new EventEmitter<void>();

  @ViewChild('selectRef', { static: true })
  protected selectRef: ElementRef<HTMLElement>;

  @ViewChild('tooltipRef', { static: true })
  protected tooltipRef: TooltipDirective;

  @ViewChild('nodeListRef', { static: true })
  nodeListRef: ElementRef;

  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  private _nodesData: Array<TreeNode<T>> = [];
  private _filterString = '';
  private _filterable = false;
  private _clearable = false;
  private _leafOnly = false;
  private readonly filterString$$ = new BehaviorSubject(this.filterString);

  filterString$: Observable<string> = this.filterString$$.asObservable();

  containerWidth: string;
  displayText = '';
  flattedNodes: Array<TreeNode<T>> = [];

  get isClearable() {
    return !this.disabled && this.clearable && this.getInputValue();
  }

  get opened() {
    return this.tooltipRef.isCreated;
  }

  get inputReadonly() {
    return !(this.filterable && this.opened);
  }

  get filterString() {
    return this._filterString;
  }

  set filterString(val) {
    if (val !== this._filterString) {
      this._filterString = val;
      this.filterString$$.next(val);
      this.filterChange.emit(val);
    }
  }

  openNodes() {
    this.tooltipRef.createTooltip();
  }

  closeNodes() {
    this.tooltipRef.disposeTooltip();
  }

  updatePosition() {
    this.tooltipRef.updatePosition();
  }

  onShowNodes() {
    this.containerWidth = this.selectRef.nativeElement.offsetWidth + 'px';
    this.show.emit();
    this.cdr.detectChanges();
  }

  onHideNodes() {
    if (this.onTouched) {
      this.onTouched();
    }
    this.filterString = '';
    this.hide.emit();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterString = value;
    this.cdr.markForCheck();
  }

  onNodeClick(node: TreeNodeComponent<T>) {
    this.selectNode(node);
  }

  getVisibleNodeCount() {
    return this.flattedNodes.filter(node =>
      this.filterFn(this.filterString, node),
    ).length;
  }

  selectNode(node: TreeNodeComponent<T>) {
    if (!node.selected) {
      this.emitValueChange(node.nodeData.value);
      if (this.onChange) {
        this.closeNodes();
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOption();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  closeOption() {
    this.tooltipRef.disposeTooltip();
  }

  updateSelectDisplay(value: any) {
    const pickedNode = this.flattedNodes.find(
      node => this.trackFn(node.value) === this.trackFn(value),
    );
    if (pickedNode) {
      this.displayText = this.getLabelFromNode(pickedNode).toString();
    } else {
      this.displayText = coerceString(this.trackFn(value));
    }
  }

  clearValue(event: Event) {
    this.emitValueChange(null);
    event.stopPropagation();
    event.preventDefault();
  }

  writeValue(value: T) {
    this.value$$.next(value);
    this.updateSelectDisplay(value);
    this.closeNodes();
  }

  getPlaceholder() {
    return this.filterable && this.opened ? this.displayText : this.placeholder;
  }

  getInputValue() {
    return this.filterable && this.opened ? '' : this.displayText;
  }

  // `this` is not available in `trackBy`...
  trackByLabel = (_: number, node: TreeNode<T>) => this.getLabelFromNode(node);

  private flatNodesData(nodes: Array<TreeNode<T>> = []): Array<TreeNode<T>> {
    return nodes.reduce(
      (prevValue: Array<TreeNode<T>>, currentNode) =>
        prevValue.concat(currentNode, this.flatNodesData(currentNode.children)),
      [],
    );
  }

  private getLabelFromNode(node: TreeNode<T>) {
    return (
      node.label ||
      this.labelFn?.(node.value) ||
      coerceString(this.trackFn(node.value))
    );
  }

  private _filterFn(filterString: string, node: TreeNode<T>) {
    return this.getLabelFromNode(node)?.includes(filterString ?? '');
  }

  private _trackFn<T>(value: T) {
    return value;
  }
}
