import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button (click)="disabled = !disabled">
      {{ disabled ? 'Enable' : 'Disable' }}
    </button>
    <br />
    <br />
    <form #form="ngForm">
      <aui-tags-input
        name="fruit"
        [(ngModel)]="value"
        [auiAutocomplete]="suggestions"
        placeholder="水果"
        [disabled]="disabled"
      ></aui-tags-input>
    </form>
    <aui-autocomplete #suggestions>
      <aui-suggestion value="apple">apple</aui-suggestion>
      <aui-suggestion value="banana">banana</aui-suggestion>
      <aui-suggestion value="peach">peach</aui-suggestion>
      <aui-suggestion value="grapes">grapes</aui-suggestion>
      <aui-suggestion value="orange">orange</aui-suggestion>
      <aui-autocomplete-placeholder>
        no suggestions
      </aui-autocomplete-placeholder>
    </aui-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDisabledComponent {
  disabled: true;
  value: [];
}
