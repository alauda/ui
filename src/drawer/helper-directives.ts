/**
 * @packageDocumentation
 * @module page-guard
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[auiDrawerHeader]',
  standalone: true,
})
export class DrawerHeaderDirective {}

@Directive({
  selector: '[auiDrawerContent]',
  standalone: true,
})
export class DrawerContentDirective {}

@Directive({
  selector: '[auiDrawerFooter]',
  standalone: true,
})
export class DrawerFooterDirective {}
