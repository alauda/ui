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

import { DrawerService } from '../drawer.service';
import {
  DrawerContentDirective,
  DrawerFooterDirective,
  DrawerHeaderDirective,
} from '../helper-directives';
import { DrawerSize } from '../types';

@Component({
  selector: 'aui-drawer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DrawerService],
})
export class DrawerComponent implements AfterViewInit, OnChanges {
  @Input()
  title: string | TemplateRef<unknown>;

  @Input()
  footer: string | TemplateRef<unknown>;

  @Input()
  size: DrawerSize = DrawerSize.Medium;

  @Input()
  offsetY = '0px';

  @Input()
  visible: boolean;

  @Input()
  content: TemplateRef<unknown> | ComponentType<unknown>;

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

  @Output()
  readonly close = new EventEmitter<MouseEvent>();

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  private readonly titleTemplate: TemplateRef<unknown>;

  @ContentChild(DrawerContentDirective, { read: TemplateRef })
  private readonly contentTemplateOrComponent:
    | TemplateRef<unknown>
    | ComponentType<unknown>;

  @ContentChild(DrawerFooterDirective, { read: TemplateRef })
  private readonly footerTemplate: TemplateRef<unknown>;

  constructor(private readonly drawerService: DrawerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { visible } = changes;
    if (visible) {
      const value = visible.currentValue;
      if (value) {
        this.open();
      } else if (!visible.firstChange) {
        // 不希望默认关闭时，drawer 渲染后就触发 close 事件
        this.drawerService.close();
      }
    }
  }

  ngAfterViewInit() {
    this.title = this.title || this.titleTemplate;
    this.content = this.content || this.contentTemplateOrComponent;
    this.footer = this.footer || this.footerTemplate;
  }

  private open() {
    const ref = this.drawerService.open(this);
    ref.afterClosed.pipe(first()).subscribe(res => {
      this.close.emit(res);
    });
  }
}
