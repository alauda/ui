import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';

import { CommonFormControl } from '../../form/public-api';
import { ComponentSize } from '../../types';
import { Bem, buildBem } from '../../utils/bem';

@Component({
  selector: 'aui-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: [
    '../../input/input.component.scss',
    '../../tag/tag.component.scss',
    './tags-input.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true,
    },
  ],
})
export class TagsInputComponent extends CommonFormControl<string[]> {
  bem: Bem = buildBem('aui-tags-input');

  @Input()
  placeholder = '';

  @Input()
  size = ComponentSize.Medium;

  // TODO: implement this feature
  @Input()
  clearable = false;

  @Input()
  allowRepeat = false;

  @Input()
  allowEmpty = false;

  @ViewChild('inputRef', { static: true })
  inputRef: ElementRef<HTMLInputElement>;

  @ViewChild('inputValueMirror', { static: true })
  inputValueMirror: ElementRef<HTMLElement>;

  snapshot = {
    value: [] as string[],
  };

  value$: Observable<string[]> = this.value$$.asObservable().pipe(
    tap(value => {
      this.snapshot.value = value;
      this.clearInput();
    }),
    publishReplay(1),
    refCount(),
  );

  focused = false;

  inputValue = '';

  get rootClass() {
    const size = this.size || ComponentSize.Medium;
    return `aui-input ${this.bem.block(size)} ${
      this.disabled ? 'isDisabled' : ''
    } ${this.focused ? 'isFocused' : ''} ${
      this.clearable ? 'isClearable' : ''
    }`;
  }

  get tagSize() {
    return this.size === ComponentSize.Large
      ? ComponentSize.Medium
      : ComponentSize.Mini;
  }

  get inputClass() {
    return `${this.bem.element('input', {
      hidden: this.disabled || !this.focused,
    })} aui-tag aui-tag--${this.tagSize}`;
  }

  constructor(cdr: ChangeDetectorRef, private readonly renderer: Renderer2) {
    super(cdr);
  }

  writeValue(val: string[]) {
    this.value$$.next(val || []);
  }

  onRemove(index: number) {
    this.emitValueChange(this.snapshot.value.filter((_, i) => i !== index));
  }

  onInput() {
    this.inputValue = this.inputRef.nativeElement.value;
    // make sure value sync to span element
    if (!this.inputValue.length) {
      requestAnimationFrame(() => {
        this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
      });
    } else {
      requestAnimationFrame(() => {
        this.renderer.setStyle(
          this.inputRef.nativeElement,
          'width',
          this.inputValueMirror.nativeElement.scrollWidth + 'px',
        );
      });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const inputEl = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && inputEl.value === '') {
      this.onRemove(this.snapshot.value.length - 1);
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      this.pushValue(inputEl.value);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onInputFocus() {
    this.focused = true;
  }

  onInputBlur(event: Event) {
    this.focused = false;
    this.pushValue((event.target as HTMLInputElement).value);
    if (this.onTouched) {
      this.onTouched();
    }
  }

  trackByValue(_: number, value: string) {
    return value;
  }

  private pushValue(value: string) {
    if (!this.allowEmpty && !value) {
      return;
    }
    if (!this.allowRepeat && this.snapshot.value.includes(value)) {
      return;
    }
    this.emitValueChange(this.snapshot.value.concat(value));
  }

  private clearInput() {
    this.inputRef.nativeElement.value = '';
    this.renderer.removeStyle(this.inputRef.nativeElement, 'width');
    this.inputValue = '';
  }
}
