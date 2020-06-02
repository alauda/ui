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

import { Bem, buildBem } from '../../utils/bem';
import { scrollIntoView } from '../../utils/scroll-into-view';
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
export class TreeNodeComponent implements AfterViewInit, OnDestroy {
  bem: Bem = buildBem('aui-tree-node');

  private _nodeData: TreeNode;
  private readonly nodeData$$ = new BehaviorSubject<TreeNode>(this.nodeData);
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

  @ViewChild('titleRef', { static: true })
  titleRef: ElementRef;

  @ViewChildren(TreeNodeComponent)
  childNodes: QueryList<TreeNodeComponent>;

  selected = false;
  visible = true;

  private readonly select: TreeSelectComponent;
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
      this.select.trackFn$,
      this.select.value$,
      this.nodeData$$.pipe(map(data => data.value)),
    ]).pipe(
      map(
        ([trackFn, selectValue, selfValue]) =>
          selectValue && trackFn(selectValue) === trackFn(selfValue),
      ),
      tap(selected => {
        this.selected = selected;
      }),
      publishReplay(1),
      refCount(),
    );
    this.selfVisible$ = combineLatest([
      this.select.filterFn$,
      this.select.filterString$,
      this.nodeData$$,
    ]).pipe(
      map(([filterFn, filterString, nodeData]) =>
        filterFn(filterString, nodeData),
      ),
      publishReplay(1),
      refCount(),
    );
  }

  ngAfterViewInit() {
    const hasVisibleChildNodes$ = (this.childNodes.changes as Observable<
      QueryList<TreeNodeComponent>
    >).pipe(
      startWith(this.childNodes),
      switchMap(nodes => {
        if (nodes.length > 0) {
          return combineLatest(nodes.map(node => node.visible$));
        } else {
          return of([false]);
        }
      }),
      map(values => values.some(value => !!value)),
    );
    this.visible$ = combineLatest([
      this.selfVisible$,
      hasVisibleChildNodes$,
    ]).pipe(
      map(values => values.some(value => value)),
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

  trackByLabel(_: number, data: TreeNode) {
    return data.label;
  }

  scrollToNode(node: TreeNodeComponent) {
    if (this.select.nodeListRef) {
      scrollIntoView(
        this.select.nodeListRef.nativeElement,
        node.titleRef.nativeElement,
      );
    }
  }
}
