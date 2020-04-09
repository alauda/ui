import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[auiPageHeader]',
})
export class PageHeaderDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[auiPageContent]',
})
export class PageContentDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[auiPageSider]',
})
export class PageSiderDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[auiPageToolbar]',
})
export class PageToolbarDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[auiPageSnackbar]',
})
export class PageSnackbarDirective {
  constructor(public template: TemplateRef<any>) {}
}
