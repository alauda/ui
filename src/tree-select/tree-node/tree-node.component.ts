import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { Bem, buildBem, coerceAttrBoolean, scrollIntoView } from '../../utils';
import { TreeSelectComponent } from '../tree-select.component';
import { TreeNode } from '../tree-select.types';

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

  @Input()
  get leafOnly() {
    return this._leafOnly;
  }

  set leafOnly(val: boolean | '') {
    this._leafOnly = coerceAttrBoolean(val);
  }

  @ViewChild('titleRef', { static: true })
  titleRef: ElementRef;

  @ViewChildren(TreeNodeComponent)
  childNodes: QueryList<TreeNodeComponent<T>>;

  selected = false;
  visible = true;
  isLeaf = false;

  private _leafOnly = true;
  private readonly select: TreeSelectComponent<T>;
  selected$: Observable<boolean>;
  selfVisible$: Observable<boolean>;
  visible$: Observable<boolean>;

  constructor(
    @Inject(forwardRef(() => TreeSelectComponent))
    select: any, // FIXME: workaround temporarily
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.select = select;
    this.selected$ = combineLatest([
      this.select.value$,
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
      publishReplay(1),
      refCount(),
    );
    this.selfVisible$ = combineLatest([
      this.select.filterString$,
      this.nodeData$$,
    ]).pipe(
      map(([filterString, nodeData]) =>
        this.select.filterFn(filterString, nodeData),
      ),
      publishReplay(1),
      refCount(),
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
      map(visible => visible.some(value => value)),
      tap(hasVisibleChildren => (this.isLeaf = !hasVisibleChildren)),
    );
    this.visible$ = combineLatest([
      this.selfVisible$,
      hasVisibleChildNodes$,
    ]).pipe(
      map(visible => visible.some(value => value)),
      publishReplay(1),
      refCount(),
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
    if (this.nodeData.disabled) {
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
