import 'jest-preset-angular/setup-jest';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } },
);

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(window, 'getComputedStyle', {
  value() {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});

Object.defineProperty(window, 'matchMedia', {
  value() {
    return {
      matches: 'light',
      addListener: () => undefined as void,
      addEventListener: () => undefined as void,
    };
  },
});

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value() {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
