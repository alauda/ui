import { Component, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '.palette__card',
})
export class PaletteCardDirective implements OnInit {
  constructor(private readonly el: ElementRef) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    const styleString = this.rgbToHex(
      getComputedStyle(element, null).backgroundColor,
    );
    element.innerHTML = `<div>${element.innerHTML}<br />${styleString}</div>`;
  }

  componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  rgbToHex(rgb: string) {
    const arr = /(\d+), (\d+), (\d+)/g.exec(rgb);
    if (arr.length === 4) {
      return (
        '#' +
        this.componentToHex(parseInt(arr[1], 10)) +
        this.componentToHex(parseInt(arr[2], 10)) +
        this.componentToHex(parseInt(arr[3], 10))
      );
    }
    return '';
  }
}

@Component({
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
})
export class PaletteComponent {}
