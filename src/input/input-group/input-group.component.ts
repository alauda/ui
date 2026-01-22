import { NgClass, AsyncPipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Bem, buildBem, watchContentExist } from '../../internal/utils';
import {
  InputAddonAfterDirective,
  InputAddonBeforeDirective,
  InputPrefixDirective,
  InputSuffixDirective,
} from '../helper-directives';
import { InputComponent } from '../input.component';

@Component({
  selector: 'aui-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  imports: [NgClass, AsyncPipe],
})
export class InputGroupComponent implements AfterContentInit {
  bem: Bem = buildBem('aui-input-group');

  @ContentChildren(InputAddonBeforeDirective)
  private readonly addonBeforeRefs: QueryList<InputAddonBeforeDirective>;

  @ContentChildren(InputAddonAfterDirective)
  private readonly addonAfterRefs: QueryList<InputAddonAfterDirective>;

  @ContentChildren(InputPrefixDirective)
  private readonly prefixRefs: QueryList<InputPrefixDirective>;

  @ContentChildren(InputSuffixDirective)
  private readonly suffixRefs: QueryList<InputSuffixDirective>;

  @ContentChild(InputComponent, { static: false })
  inputRef: InputComponent;

  hasAddonBefore$: Observable<boolean>;
  hasAddonAfter$: Observable<boolean>;
  hasPrefix$: Observable<boolean>;
  hasSuffix$: Observable<boolean>;

  ngAfterContentInit() {
    this.hasAddonBefore$ = watchContentExist(this.addonBeforeRefs);
    this.hasAddonAfter$ = watchContentExist(this.addonAfterRefs);
    this.hasPrefix$ = watchContentExist(this.prefixRefs);
    this.hasSuffix$ = watchContentExist(this.suffixRefs);
  }
}

export const INPUT_GROUP_MODULE = [
  InputGroupComponent,
  InputAddonAfterDirective,
  InputAddonBeforeDirective,
  InputPrefixDirective,
  InputSuffixDirective,
] as const;
