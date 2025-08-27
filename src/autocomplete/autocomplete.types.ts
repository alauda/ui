export interface AutoCompleteContext {
  width: string;
}

export type SuggestionFilterFn = (
  inputValue: string,
  suggestion: string,
) => boolean;
