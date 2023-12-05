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
export class DrawerComponent<T = unknown, C = unknown, R = any>
  implements AfterViewInit, OnChanges, Required<DrawerOptions<T, C>>
{
  @Input()
  title: string | TemplateRef<C>;

  @Input()
  footer: string | TemplateRef<C>;

  @Input()
  size: DrawerSize = DrawerSize.Medium;

  @Input()
  offsetY = '0px';

  @Input()
  visible: boolean;

  @Input()
  content: TemplateRef<C> | ComponentType<T>;

  @Input()
  hideOnClickOutside = false;

  @Input()
  showClose = true;

  @Input()
  drawerClass: string;

  @Input()
  mask: boolean;

  @Input()
  maskClosable: boolean;

  @Input()
  divider = true;

  @Input()
  width: number;

  @Input()
  contentParams: C;

  @Output()
  readonly close = new EventEmitter<R>();

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  private readonly titleTemplate: TemplateRef<C>;

  @ContentChild(DrawerContentDirective, { read: TemplateRef })
  private readonly contentTemplateOrComponent:
    | TemplateRef<C>
    | ComponentType<T>;

  @ContentChild(DrawerFooterDirective, { read: TemplateRef })
  private readonly footerTemplate: TemplateRef<C>;

  private drawerRef: DrawerRef;

  constructor(private readonly drawerService: DrawerService) {}

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
  }

  ngAfterViewInit() {
    this.title = this.title || this.titleTemplate;
    this.content = this.content || this.contentTemplateOrComponent;
    this.footer = this.footer || this.footerTemplate;
  }
}
