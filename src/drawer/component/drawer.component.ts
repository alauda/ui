import { ComponentType } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { first } from 'rxjs';

import { DrawerRef } from '../drawer-ref';
import { DrawerService } from '../drawer.service';
import {
  DrawerContentDirective,
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from '../helper-directives';
import { DrawerOptions, DrawerSize } from '../types';

@Component({
  selector: 'aui-drawer',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DrawerService],
})
export class DrawerComponent<
    T = unknown,
    C extends object = object,
    R = unknown,
  >
  implements AfterViewInit, OnChanges, Required<DrawerOptions<T, C>>
{
  @Input()
  title: TemplateRef<C> | string;

  @Input()
  footer: TemplateRef<C> | string;

  @Input()
  size: DrawerSize;

  @Input()
  offsetY: string;

  @Input()
  visible: boolean;

  @Input()
  content: ComponentType<T> | TemplateRef<C>;

  @Input()
  hideOnClickOutside: boolean;

  @Input()
  showClose: boolean;

  @Input()
  drawerClass: string;

  @Input()
  mask: boolean;

  @Input()
  maskClosable: boolean;

  @Input()
  divider: boolean;

  @Input()
  width: number;

  @Input()
  contentParams: C;

  @Input()
  disposeWhenHide = false;

  @Output()
  readonly close = new EventEmitter<R>();

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  private readonly titleTemplate: TemplateRef<C>;

  @ContentChild(DrawerContentDirective, { read: TemplateRef })
  private readonly contentTemplateOrComponent:
    | ComponentType<T>
    | TemplateRef<C>;

  @ContentChild(DrawerFooterDirective, { read: TemplateRef })
  private readonly footerTemplate: TemplateRef<C>;

  private drawerRef: DrawerRef<T, C, R>;

  constructor(private readonly drawerService: DrawerService<T, C, R>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { visible } = changes;
    if (visible) {
      const value = visible.currentValue;
      if (value) {
        this.drawerRef = this.drawerService.open(this);
        this.drawerRef.afterClosed.pipe(first()).subscribe(res => {
          this.close.emit(res);
        });
      } else if (!visible.firstChange) {
        // 不希望默认关闭时，drawer 渲染后就触发 close 事件
        this.drawerRef.close();
      }
    }
    this.drawerService.updateOptions(this);
  }

  ngAfterViewInit() {
    this.title = this.title || this.titleTemplate;
    this.content = this.content || this.contentTemplateOrComponent;
    this.footer = this.footer || this.footerTemplate;
  }
}
