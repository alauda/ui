import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../utils/bem';

import { Status, StatusBarSize } from './status-bar.types';

@Component({
  selector: 'aui-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class StatusBarComponent {
  bem: Bem = buildBem('aui-status-bar');

  @Input()
  status: Status[] = [];

  @Input()
  size = StatusBarSize.Medium;

  @Input()
  template: TemplateRef<any>;

  @Output()
  statusClick = new EventEmitter<Status>();
}
