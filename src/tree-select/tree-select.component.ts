import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { CommonFormControl } from '../form';
import { InputComponent } from '../input';
import { TrackFn } from '../select/select.types';
import { TooltipDirective } from '../tooltip';
import {
  Bem,
  buildBem,
  coerceAttrBoolean,
  coerceString,
  publishRef,
  scrollIntoView,
} from '../utils';

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
    this.updateSelectDisplay(this.model);
  }

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input({ transform: coerceAttrBoolean })
  filterable: boolean;

  @Input({ transform: coerceAttrBoolean })
  clearable: boolean;

  @Input({ transform: coerceAttrBoolean })
  leafOnly: boolean;

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
  nodeListRef: ElementRef<HTMLElement>;

  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  private _nodesData: Array<TreeNode<T>> = [];
  private _filterString = '';
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

  updatePosition() {
    this.tooltipRef.updatePosition();
  }

  onVisibleNodes(visible: boolean) {
    if (visible) {
      this.containerWidth = this.selectRef.nativeElement.offsetWidth + 'px';
      this.show.emit();
      this.cdr.detectChanges();
    } else {
      if (this.onTouched) {
        this.onTouched();
      }
      this.filterString = '';
      this.hide.emit();
    }
  }

  onInput(event: Event) {
    this.filterString = (event.target as HTMLInputElement).value;
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
      this.emitValue(node.nodeData.value);
      if (this.onChange) {
        this.closeOption();
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

  openOption() {
    this.tooltipRef.show();
  }

  closeOption() {
    this.inputRef.elementRef.nativeElement.value = this.displayText;
    this.tooltipRef.hide();
  }

  updateSelectDisplay(value: any) {
    const pickedNode = this.flattedNodes.find(
      node => this.trackFn(node.value) === this.trackFn(value),
    );
    this.displayText = pickedNode
      ? this.getLabelFromNode(pickedNode).toString()
      : coerceString(this.trackFn(value));
  }

  clearValue(event: Event) {
    this.emitValue(null);
    event.stopPropagation();
    event.preventDefault();
  }

  protected override valueIn(v: T): T {
    this.updateSelectDisplay(v);
    this.closeOption();
    return v;
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
      this.labelFn?.(node.value) ||
      node.label ||
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

@Component({
  selector: 'aui-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class TreeNodeComponent<T> implements AfterViewInit, OnDestroy {
  bem: Bem = buildBem('aui-tree-node');

  private _nodeData: TreeNode<T>;
  private readonly nodeData$$ = new BehaviorSubject<TreeNode<T>>(this.nodeData);
  private readonly destroy$$ = new Subject<void>();

  @Input()
  get nodeData() {
    return this._nodeData;
  }

  set nodeData(val) {
    if (val === this._nodeData) {
      return;
    }
    this._nodeData = val;
    this.nodeData$$.next(val);
  }

  @Input({ transform: coerceAttrBoolean })
  leafOnly = true;

  @ViewChild('titleRef', { static: true })
  titleRef: ElementRef<HTMLElement>;

  @ViewChildren('treeNodes')
  childNodes: QueryList<TreeNodeComponent<T>>;

  selected = false;
  visible = true;
  isLeaf = false;

  private readonly select: TreeSelectComponent<T>;
  selected$: Observable<boolean>;
  selfVisible$: Observable<boolean>;
  visible$: Observable<boolean>;

  constructor(
    select: TreeSelectComponent<T>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.select = select;
    this.selected$ = combineLatest([
      this.select.model$,
      this.nodeData$$.pipe(map(data => data.value)),
    ]).pipe(
      map(
        ([selectValue, selfValue]) =>
          selectValue &&
          this.select.trackFn(selectValue) === this.select.trackFn(selfValue),
      ),
      tap(selected => {
        this.selected = selected;
      }),
      publishRef(),
    );
    this.selfVisible$ = combineLatest([
      this.select.filterString$,
      this.nodeData$$,
    ]).pipe(
      map(([filterString, nodeData]) =>
        this.select.filterFn(filterString, nodeData),
      ),
      publishRef(),
    );
  }

  ngAfterViewInit() {
    const hasVisibleChildNodes$ = this.childNodes.changes.pipe(
      startWith(this.childNodes),
      switchMap((nodes: QueryList<TreeNodeComponent<T>>) =>
        nodes.length > 0
          ? combineLatest(nodes.map(node => node.visible$))
          : of([false]),
      ),
      map(visible => visible.some(Boolean)),
      tap(hasVisibleChildren => (this.isLeaf = !hasVisibleChildren)),
    );
    this.visible$ = combineLatest([
      this.selfVisible$,
      hasVisibleChildNodes$,
    ]).pipe(
      map(visible => visible.some(Boolean)),
      publishRef(),
    );

    this.visible$.pipe(takeUntil(this.destroy$$)).subscribe(visible => {
      this.visible = visible;
      this.cdr.markForCheck();
    });
    this.selected$.pipe(takeUntil(this.destroy$$)).subscribe(selected => {
      this.selected = selected;
      this.cdr.markForCheck();
    });

    if (this.selected) {
      requestAnimationFrame(() => {
        this.scrollToNode(this);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  onClick() {
    if (this.nodeData.disabled || this.nodeData.loading) {
      return;
    }
    if (this.leafOnly && !this.isLeaf) {
      this.switchExpanded();
      return;
    }
    this.select.onNodeClick(this);
  }

  switchExpanded() {
    this.nodeData.expanded = !this.nodeData.expanded;
    if (this.nodeData.expanded && this.childNodes.last) {
      requestAnimationFrame(() => {
        this.scrollToNode(this.childNodes.last);
      });
    }
    requestAnimationFrame(() => {
      this.select.updatePosition();
    });
  }

  getIcon() {
    return this.nodeData.expanded
      ? this.nodeData.expandedIcon || this.nodeData.icon
      : this.nodeData.icon;
  }

  trackByLabel(_: number, data: TreeNode<T>) {
    return data.label;
  }

  scrollToNode(node: TreeNodeComponent<T>) {
    if (this.select.nodeListRef) {
      scrollIntoView(
        this.select.nodeListRef.nativeElement,
        node.titleRef.nativeElement,
      );
    }
  }
}
