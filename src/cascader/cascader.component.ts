import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, from } from 'rxjs';

import { CommonFormControl } from '../form';
import { IconComponent } from '../icon';
import {
  InputComponent,
  InputSuffixDirective,
  InputGroupComponent,
} from '../input';
import { ComponentSize } from '../internal/types';
import { coerceAttrBoolean } from '../internal/utils';
import { TooltipDirective } from '../tooltip';

import { CascaderOption, SearchedCascaderOption } from './cascader.types';
import { CascaderOptionComponent } from './option/option.component';
import {
  dropRestItems,
  isParentOption,
  searchCascadeOptions,
  trackByOption,
  trackByOptions,
} from './utils';

@Component({
  selector: 'aui-cascader',
  templateUrl: 'cascader.component.html',
  styleUrls: ['cascader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascaderComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CascaderOptionComponent,
    TooltipDirective,
    InputGroupComponent,
    InputComponent,
    InputSuffixDirective,
    IconComponent,
    NgIf,
    NgTemplateOutlet,
    NgFor,
  ],
})
export class CascaderComponent<T = unknown> extends CommonFormControl<T[]> {
  @Input()
  get size() {
    return this.$$size();
  }

  set size(val) {
    if (!val || this.$$size() === val) {
      return;
    }
    this.$$size.set(val);
  }

  @Input({ transform: coerceAttrBoolean })
  filterable = true;

  @Input({ transform: coerceAttrBoolean })
  clearable: boolean;

  @Input({ transform: coerceAttrBoolean })
  onlyShowLastLabel = false;

  @Input({ transform: coerceAttrBoolean })
  changeOnSelect = false;

  @Input()
  loading = false;

  @Input()
  placeholder = '';

  @Input()
  loadData: (
    selectedOption: CascaderOption<T>,
  ) =>
    | PromiseLike<Array<CascaderOption<T>>>
    | Observable<Array<CascaderOption<T>>>;

  @Input()
  get options() {
    return this.$$options();
  }

  set options(val) {
    this.$$options.set(val);
    this.$$columns.set([val]);
  }

  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  @ViewChild('tooltipRef', { static: true })
  private readonly tooltipRef: TooltipDirective;

  @ViewChild('selectRef', { static: true })
  protected selectRef: ElementRef<HTMLElement>;

  @Output()
  filterChange = new EventEmitter<string>();

  get rootClass() {
    return `aui-cascader aui-cascader--${this.$$size()}`;
  }

  get containerClass() {
    return `aui-cascader-option-container aui-cascader-option-container--${this.$$size()}`;
  }

  get opened() {
    return this.tooltipRef.isCreated;
  }

  get inaction() {
    return !(this.filterable && this.opened);
  }

  get filterString() {
    return this.$$filterString();
  }

  set filterString(val) {
    if (val !== this.$$filterString()) {
      this.$$filterString.set(val);
      this.filterChange.emit(val);
    }
  }

  trackByOptions = trackByOptions;
  trackByOption = trackByOption;

  $$size = signal<ComponentSize>(ComponentSize.Medium);
  $$filterString = signal('');
  $$options = signal<Array<CascaderOption<T>>>([]);
  $$columns = signal<Array<Array<CascaderOption<T>>>>([]);

  $model = toSignal(this.model$);

  $selectedOptions = computed(() => {
    const selectedOptions: Array<CascaderOption<T>> = [];
    let currentColumnOptions = this.$$options();
    this.$model()?.forEach(value => {
      const currentColumnOption = currentColumnOptions?.find(
        option => option.value === value,
      );
      selectedOptions.push(currentColumnOption);
      currentColumnOptions = currentColumnOption.children;
    });
    return selectedOptions;
  });

  $searchedOptions = computed(() =>
    this.$inSearching()
      ? searchCascadeOptions(this.$$options(), this.$$filterString())
      : [],
  );

  $optionsVisible = computed(
    () =>
      this.$$options().length > 0 &&
      (!this.$$filterString() || this.$searchedOptions().length > 0),
  );

  $hasSelected = computed(() => this.$selectedOptions().length > 0);
  $inSearching = computed(() => !!this.$$filterString());

  $containerWidth = computed(() =>
    this.$$options().length === 0 || !!this.$$filterString()
      ? this.selectRef.nativeElement.offsetWidth + 'px'
      : null,
  );

  $OptionsContentClass = computed(() =>
    this.$inSearching()
      ? 'aui-cascader-option-container__search-content'
      : 'aui-cascader-option-container__content',
  );

  $visibleColumns = computed(() =>
    this.$searchedOptions().length > 0
      ? [this.$searchedOptions()]
      : this.$$columns(),
  );

  activatedOptions: Array<CascaderOption<T>> = [];

  clearValue(event: Event) {
    this.emitValue(null);
    event.stopPropagation();
    event.preventDefault();
  }

  closeOption() {
    this.tooltipRef.hide();
  }

  onOptionsVisibleChange(visible: boolean) {
    if (!visible) {
      this.filterString = '';
      this.inputRef.elementRef.nativeElement.value = '';
      this.activatedOptions = [];
      this.$$columns.set([]);
      return;
    }

    this.activatedOptions = [...this.$selectedOptions()];
    this.$$columns.set(
      [this.options].concat(
        this.activatedOptions.map(option => option.children).filter(Boolean),
      ),
    );
  }

  onOptionClick(
    option: CascaderOption<T> | SearchedCascaderOption<T, T[]>,
    columnIndex: number,
  ) {
    if (option.disabled) {
      return;
    }
    this.$inSearching()
      ? this.onClickSearchedOption(option as SearchedCascaderOption<T, T[]>)
      : this.onClickOption(option as CascaderOption<T>, columnIndex);
  }

  isOptionActivated(
    option: CascaderOption<T> | SearchedCascaderOption<T, T[]>,
    columnIndex: number,
  ) {
    return this.$inSearching()
      ? this.checkSearchedOptionActivated(
          option as SearchedCascaderOption<T, T[]>,
        )
      : this.checkOptionActivated(option as CascaderOption<T>, columnIndex);
  }

  onInput(event: Event) {
    this.filterString = (event.target as HTMLInputElement).value;
  }

  private checkOptionActivated(option: CascaderOption<T>, columnIndex: number) {
    return this.activatedOptions[columnIndex] === option;
  }

  private checkSearchedOptionActivated(
    searchedOption: SearchedCascaderOption<T, T[]>,
  ) {
    return (
      searchedOption.path.length === this.activatedOptions.length &&
      searchedOption.path.every(
        (option, index) => option === this.activatedOptions[index],
      )
    );
  }

  private onClickOption(option: CascaderOption<T>, columnIndex: number) {
    if (this.checkOptionActivated(option, columnIndex)) {
      return;
    }
    this.activatedOptions[columnIndex] = option;

    const isParent = isParentOption(option);
    const performChange = !isParent || this.changeOnSelect;

    if (isParent && option.children?.length > 0) {
      this.setColumnsData(option, columnIndex);
    } else if (isParent && !!this.loadData) {
      // 需要懒加载 children 的节点需要显式的声明 isLeaf: false
      option.loading = true;
      from(this.loadData(option)).subscribe(childrenOptions => {
        option.loading = false;
        option.children = childrenOptions;
        this.setColumnsData(option, columnIndex);
      });
    } else {
      this.activatedOptions = dropRestItems(this.activatedOptions, columnIndex);
      this.closeOption();
    }

    if (performChange) {
      this.emitValue(
        this.activatedOptions.map(activatedOption => activatedOption.value),
      );
    }
  }

  private onClickSearchedOption(
    searchedOption: SearchedCascaderOption<T, T[]>,
  ) {
    if (this.checkSearchedOptionActivated(searchedOption)) {
      return;
    }
    this.activatedOptions = [...searchedOption.path];
    this.closeOption();
    this.emitValue(
      this.activatedOptions.map(activatedOption => activatedOption.value),
    );
  }

  private setColumnsData(option: CascaderOption<T>, columnIndex: number) {
    this.$$columns.update(columns => {
      columns[columnIndex + 1] = option.children;
      return dropRestItems(columns, columnIndex + 1);
    });
  }
}
