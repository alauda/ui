import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <input
      aui-input
      [auiAutocomplete]="suggestions"
      placeholder="雇员"
    />
    <aui-autocomplete #suggestions>
      <aui-suggestion-group>
        <div auiSuggestionGroupTitle>女性</div>
        <aui-suggestion value="susan">susan</aui-suggestion>
        <aui-suggestion value="mary">mary</aui-suggestion>
        <aui-suggestion value="avril">avril</aui-suggestion>
      </aui-suggestion-group>
      <aui-suggestion-group>
        <div auiSuggestionGroupTitle>男性</div>
        <aui-suggestion value="john">john</aui-suggestion>
        <aui-suggestion value="bob">bob</aui-suggestion>
        <aui-suggestion
          value="david"
          [disabled]="true"
        >
          david
        </aui-suggestion>
      </aui-suggestion-group>
      <aui-autocomplete-placeholder>
        no suggestions
      </aui-autocomplete-placeholder>
    </aui-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AutoCompleteSuggestionsGroupComponent {}
