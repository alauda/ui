export function getAuiIconNoHttpProviderError(): Error {
  return new Error(
    'Could not find HttpClient provider for use with Alauda UI icons. Please include the HttpClientModule from @angular/common/http in your app imports.',
  );
}

export function getAuiIconFailedToLoadCustomIconFile(url: string) {
  return new Error(`AuiIcon failed to load custom icon file: ${url}.`);
}
