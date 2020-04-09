import { AutocompleteModule, InputModule } from '@alauda/ui';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

storiesOf('Autocomplete', module).add('autocomplete', () => {
  const value = 'ab';

  return {
    moduleMetadata: {
      imports: [FormsModule, AutocompleteModule, InputModule],
    },
    template: /* HTML */ `
      <input aui-input [(ngModel)]="value" [auiAutocomplete]="suggestions" />

      <aui-autocomplete #suggestions>
        <aui-suggestion-group>
          <div auiSuggestionGroupTitle>group 1</div>
          <aui-suggestion value="a">a</aui-suggestion>
          <aui-suggestion value="ab">ab</aui-suggestion>
          <aui-suggestion value="ac" [disabled]="true">ac</aui-suggestion>
        </aui-suggestion-group>
        <aui-suggestion-group>
          <div auiSuggestionGroupTitle>group 2</div>
          <aui-suggestion value="abcde">abcde</aui-suggestion>
          <aui-suggestion value="abc">abc</aui-suggestion>
          <aui-suggestion value="abcd">abcd</aui-suggestion>
        </aui-suggestion-group>
        <aui-autocomplete-placeholder>
          no suggestions
        </aui-autocomplete-placeholder>
      </aui-autocomplete>
    `,
    props: {
      value,
    },
  };
});
