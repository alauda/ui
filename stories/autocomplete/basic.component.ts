import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <input
      aui-input
      [auiAutocomplete]="suggestions"
      placeholder="爱好"
    />
    <aui-autocomplete #suggestions>
      <aui-suggestion value="basketball">basketball</aui-suggestion>
      <aui-suggestion value="swimming">swimming</aui-suggestion>
      <aui-suggestion value="reading">reading</aui-suggestion>
      <aui-suggestion value="baking">baking</aui-suggestion>
      <aui-autocomplete-placeholder>
        no suggestions
      </aui-autocomplete-placeholder>
    </aui-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteBasicComponent {}
