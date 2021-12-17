import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils';

@Component({
  selector: 'aui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SearchComponent {
  bem: Bem = buildBem('aui-search');

  @Input()
  size: ComponentSize = ComponentSize.Medium;

  @Input()
  searchButton = false;

  @Input()
  clearable = true;

  @Input()
  searching = false;

  @Input()
  placeholder = '';

  @Input()
  disabled = false;

  @Input()
  get keyword() {
    return this.value;
  }

  set keyword(value: string) {
    this.value = value;
  }

  @Output()
  keywordChange = new EventEmitter<string>();

  @Output()
  search = new EventEmitter<string>();

  @Output()
  clear = new EventEmitter<void>();

  value = '';

  get showSpinner() {
    return this.searching && !this.searchButton;
  }

  get showClear() {
    return !this.disabled && this.clearable && this.value && !this.showSpinner;
  }

  emitChange(value: string): void {
    this.value = value;
    this.keywordChange.emit(value);
  }

  emitSearch(): void {
    if (this.disabled) {
      return;
    }
    this.search.emit(this.value);
  }

  emitClear(): void {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.keywordChange.emit('');
    this.search.emit('');
    this.clear.emit();
  }
}
