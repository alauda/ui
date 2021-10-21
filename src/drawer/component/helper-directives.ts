/**
 * @packageDocumentation
 * @module page-guard
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[auiDrawerHeader]',
})
export class DrawerHeaderDirective {}

@Directive({
  selector: '[auiDrawerContent]',
})
export class DrawerContentDirective {}

@Directive({
  selector: '[auiDrawerFooter]',
})
export class DrawerFooterDirective {}
