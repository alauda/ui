import { DomPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
} from '@angular/core';

import { IconComponent } from '../../icon/icon.component';
import { Bem, buildBem } from '../../utils';
import { BaseSelect } from '../base-select';
import { SelectOption } from '../select.types';

@Component({
  selector: 'aui-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [IconComponent, CommonModule, PortalModule],
  standalone: true,
})
export class OptionItemComponent<T> {
  @Input()
  label: SelectOption['label'];

  @Input()
  value: T = null;

  @Input()
  disabled = false;

  @Input()
  labelContext: unknown = {};

  @Input()
  focused: boolean;

  @Input()
  selected: boolean;

  @HostBinding('class.is-group')
  @Input()
  groupTitle: ElementRef;

  @Input()
  contentTemplate: TemplateRef<any>;

  bem: Bem = buildBem('aui-option');

  get groupTitlePortal() {
    return new DomPortal(this.groupTitle || '');
  }

  constructor(
    @Inject(forwardRef(() => BaseSelect))
    readonly select: BaseSelect<T>,
  ) {}

  onClick() {
    if (this.disabled) {
      return;
    }
    this.select.onOptionClick(this);
  }
}
