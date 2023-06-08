import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <input
      aui-input
      [auiAutocomplete]="suggestions"
      auiAutocompleteTrigger="input"
      placeholder="国家"
    />
    <aui-autocomplete #suggestions>
      <aui-suggestion value="china">china</aui-suggestion>
      <aui-suggestion value="america">america</aui-suggestion>
      <aui-suggestion value="austria">austria</aui-suggestion>
      <aui-suggestion value="english">english</aui-suggestion>
      <aui-suggestion value="singapore">singapore</aui-suggestion>
      <aui-autocomplete-placeholder>
        no suggestions
      </aui-autocomplete-placeholder>
    </aui-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteNoTriggerComponent {}
