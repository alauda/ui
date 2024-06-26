import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComponentSize } from '@alauda/ui';

@Component({
  template: `
    <aui-search
      [size]="size"
      [searchButton]="searchButton"
      [searching]="searching"
      [clearable]="clearable"
      [disabled]="disabled"
      [(keyword)]="keyword"
      placeholder="placeholder"
      (search)="onSearchHandler($event)"
      (keywordChange)="onChangeHandler($event)"
      (clear)="onClearHandler($event)"
    ></aui-search>
    <div style="margin-top: 20px;">
      <aui-search
        [size]="size"
        [searchButton]="searchButton"
        [searching]="searching"
        [clearable]="true"
        [disabled]="disabled"
        [(keyword)]="keyword"
        placeholder="placeholder"
        (search)="onSearchHandler($event)"
        (keywordChange)="onChangeHandler($event)"
        (clear)="onClearHandler($event)"
      ></aui-search>
    </div>
    <div style="margin-top: 20px;">
      <aui-search
        [size]="size"
        [searchButton]="searchButton"
        [searching]="true"
        [clearable]="true"
        [disabled]="disabled"
        [(keyword)]="keyword"
        placeholder="placeholder"
        (search)="onSearchHandler($event)"
        (keywordChange)="onChangeHandler($event)"
        (clear)="onClearHandler($event)"
      ></aui-search>
    </div>
    <div style="margin-top: 20px;">
      <aui-search
        [size]="size"
        [searchButton]="true"
        [searching]="searching"
        [clearable]="true"
        [disabled]="disabled"
        [(keyword)]="keyword"
        placeholder="placeholder"
        (search)="onSearchHandler($event)"
        (keywordChange)="onChangeHandler($event)"
        (clear)="onClearHandler($event)"
      ></aui-search>
    </div>
    <div style="margin-top: 20px;">
      <aui-search
        [size]="size"
        [searchButton]="true"
        [searching]="true"
        [clearable]="true"
        [disabled]="disabled"
        [(keyword)]="keyword"
        placeholder="placeholder"
        (search)="onSearchHandler($event)"
        (keywordChange)="onChangeHandler($event)"
        (clear)="onClearHandler($event)"
      ></aui-search>
    </div>

    {{ keyword }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  size = ComponentSize.Medium;
  searchButton = false;
  searching = false;
  clearable = false;
  disabled = false;
  keyword = 'keyword';

  onChangeHandler = () => {
    console.log('change');
  };

  onSearchHandler = () => {
    console.log('search');
  };

  onClearHandler = () => {
    console.log('clear');
  };
}
