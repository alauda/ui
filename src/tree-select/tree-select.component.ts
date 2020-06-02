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
import { coerceAttrBoolean, coerceString } from '../utils/coercion';

import { TreeNodeComponent } from './tree-node/tree-node.component';
import { NodeFilterFn, TreeNode } from './tree-select.types';

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
export class TreeSelectComponent extends CommonFormControl<any> {
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
    this.updateSelectDisplay(this.value);
  }

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  get filterable() {
    return this._filterable;
  }

  set filterable(val) {
    this._filterable = coerceAttrBoolean(val);
  }

  @Input()
  get clearable() {
    return this._clearable;
  }

  set clearable(val) {
    this._clearable = coerceAttrBoolean(val);
  }

  @Input()
  get filterFn() {
    return this._filterFn;
  }

  set filterFn(val) {
    if (val !== this._filterFn) {
      this._filterFn = val;
      this.filterFn$$.next(val);
    }
  }

  @Input()
  get trackFn() {
    return this._trackFn;
  }

  set trackFn(val: TrackFn) {
    if (val !== this._trackFn) {
      this._trackFn = val;
      this.trackFn$$.next(val);
    }
  }

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

  private _nodesData: TreeNode[] = [];
  private _filterString = '';
  private _filterable = false;
  private _clearable = false;
  private readonly filterString$$ = new BehaviorSubject(this.filterString);

  private readonly filterFn$$ = new BehaviorSubject<NodeFilterFn>(
    this.filterFn,
  );

  private readonly trackFn$$ = new BehaviorSubject(this.trackFn);

  trackFn$: Observable<TrackFn> = this.trackFn$$.asObservable();
  filterString$: Observable<string> = this.filterString$$.asObservable();
  filterFn$: Observable<NodeFilterFn> = this.filterFn$$.asObservable();

  containerWidth: string;
  displayText = '';
  flattedNodes: TreeNode[] = [];
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

  get rootClass() {
    return `aui-tree-select ${this.displayClearable() ? 'isClearable' : ''}`;
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

  onNodeClick(node: TreeNodeComponent) {
    this.selectNode(node);
  }

  getVisibleNodeCount() {
    return this.flattedNodes.filter(node =>
      this.filterFn(this.filterString, node),
    ).length;
  }

  selectNode(node: TreeNodeComponent) {
    if (!node.selected) {
      this.emitValueChange(node.nodeData.value);
      if (this.onChange) {
        this.closeNodes();
      }
    }
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
    this.emitValueChange('');
    event.stopPropagation();
    event.preventDefault();
  }

  writeValue(value: any) {
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

  displayClearable() {
    return !this.disabled && this.clearable && this.getInputValue();
  }

  trackByLabel(_: number, data: TreeNode) {
    return data.label;
  }

  private flatNodesData(nodes: TreeNode[] = []): TreeNode[] {
    return nodes.reduce((prevValue: TreeNode[], currentNode) => {
      return prevValue.concat(
        currentNode,
        this.flatNodesData(currentNode.children),
      );
    }, []);
  }

  private getLabelFromNode(node: TreeNode) {
    return node.label || this.trackFn(node.value);
  }

  private _filterFn(filterString: string, node: TreeNode) {
    return (node.label || node.value).toString().includes(filterString);
  }

  private _trackFn<T>(value: T) {
    return value;
  }
}
