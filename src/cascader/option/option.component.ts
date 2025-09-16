import { NgIf, NgTemplateOutlet, NgFor, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';

import { IconComponent } from '../../icon';
import { Bem, buildBem } from '../../internal/utils';
import { CascaderOption } from '../cascader.types';
import { isParentOption } from '../utils';

@Component({
  selector: 'aui-cascader-option',
  template: `
    <div [class]="bem.element('label')">
      {{ option.label }}
    </div>
    <aui-icon
      *ngIf="$isParent()"
      [class]="bem.element('icon')"
      [icon]="option.loading ? 'spinner' : 'angle_right'"
    ></aui-icon>
  `,
  styleUrls: ['option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, NgFor, AsyncPipe, IconComponent],
})
export class CascaderOptionComponent<T> {
  bem: Bem = buildBem('aui-cascader-option');

  @Input()
  get option() {
    return this.$$option();
  }

  set option(val) {
    this.$$option.set(val);
  }

  @Input() activated = false;

  @HostBinding('class')
  className = this.bem.block();

  @HostBinding('class.isDisabled') get isDisabled() {
    return this.option?.disabled;
  }

  @HostBinding('class.isActivated') get isActivated() {
    return this.activated;
  }

  $$option = signal<CascaderOption<T>>(null);

  $isParent = computed(() => isParentOption(this.$$option()));
}
