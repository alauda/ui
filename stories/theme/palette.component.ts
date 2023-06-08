import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  template: `<div #ref>
    <div class="container">
      <div class="panel">
        <div class="indicator b-0">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-0"
              >p-0</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-0"
              >b-0</span
            >
          </span>
        </div>
        <div class="indicator blue">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="primary"
              >primary</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="blue"
              >blue</span
            >
          </span>
        </div>
        <div class="indicator b-1">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-1"
              >p-1</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-1"
              >b-1</span
            >
          </span>
        </div>
        <div class="indicator b-2">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-2"
              >p-2</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-2"
              >b-2</span
            >
          </span>
        </div>
        <div class="indicator b-3">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-3"
              >p-3</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-3"
              >b-3</span
            >
          </span>
        </div>
        <div class="indicator b-4">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-4"
              >p-4</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-4"
              >b-4</span
            >
          </span>
        </div>
        <div class="indicator b-5">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-5"
              >p-5</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-5"
              >b-5</span
            >
          </span>
        </div>
        <div class="indicator b-6">
          <span class="value"></span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-6"
              >p-6</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-6"
              >b-6</span
            >
          </span>
        </div>
        <div class="indicator b-7">
          <span class="value">#f2f8fe</span>
          <span>
            <span
              class="name"
              auiTooltipCopy="p-7"
              >p-7</span
            >
            <span>, </span>
            <span
              class="name"
              auiTooltipCopy="b-7"
              >b-7</span
            >
          </span>
        </div>
      </div>
      <div class="panel">
        <div class="indicator n-1">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-1"
            >n-1</span
          >
        </div>
        <div class="indicator n-2">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-2"
            >n-2</span
          >
        </div>
        <div class="indicator n-3">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-3"
            >n-3</span
          >
        </div>
        <div class="indicator n-4">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-4"
            >n-4</span
          >
        </div>
        <div class="indicator n-5">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-5"
            >n-5</span
          >
        </div>
        <div class="indicator n-6">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-6"
            >n-6</span
          >
        </div>
        <div class="indicator n-7">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-7"
            >n-7</span
          >
        </div>
        <div class="indicator n-8">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-8"
            >n-8</span
          >
        </div>
        <div class="indicator n-9">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-9"
            >n-9</span
          >
        </div>
        <div class="indicator n-10">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="n-10"
            >n-10</span
          >
        </div>
      </div>
    </div>

    <div class="container">
      <div class="panel">
        <div class="indicator g-0">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-0"
            >g-0</span
          >
        </div>
        <div class="indicator green">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="green"
            >green</span
          >
        </div>
        <div class="indicator g-1">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-1"
            >g-1</span
          >
        </div>
        <div class="indicator g-2">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-2"
            >g-2</span
          >
        </div>
        <div class="indicator g-3">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-3"
          ></span>
        </div>
        <div class="indicator g-4">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-4"
            >g-4</span
          >
        </div>
        <div class="indicator g-5">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-5"
          ></span>
        </div>
        <div class="indicator g-6">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-6"
            >g-6</span
          >
        </div>
        <div class="indicator g-7">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="g-7"
            >g-7</span
          >
        </div>
      </div>
      <div class="panel">
        <div class="indicator y-0">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-0"
            >y-0</span
          >
        </div>
        <div class="indicator yellow">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="yellow"
            >yellow</span
          >
        </div>
        <div class="indicator y-1">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-1"
            >y-1</span
          >
        </div>
        <div class="indicator y-2">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-2"
            >y-2</span
          >
        </div>
        <div class="indicator y-3">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-3"
          ></span>
        </div>
        <div class="indicator y-4">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-4"
            >y-4</span
          >
        </div>
        <div class="indicator y-5">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-5"
          ></span>
        </div>
        <div class="indicator y-6">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-6"
            >y-6</span
          >
        </div>
        <div class="indicator y-7">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="y-7"
            >y-7</span
          >
        </div>
      </div>
      <div class="panel">
        <div class="indicator r-0">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-0"
            >r-0</span
          >
        </div>
        <div class="indicator red">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="red"
            >red</span
          >
        </div>
        <div class="indicator r-1">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-1"
            >r-1</span
          >
        </div>
        <div class="indicator r-2">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-2"
            >r-2</span
          >
        </div>
        <div class="indicator r-3">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-3"
          ></span>
        </div>
        <div class="indicator r-4">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-4"
            >r-4</span
          >
        </div>
        <div class="indicator r-5">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-5"
          ></span>
        </div>
        <div class="indicator r-6">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-6"
            >r-6</span
          >
        </div>
        <div class="indicator r-7">
          <span class="value"></span>
          <span
            class="name"
            auiTooltipCopy="r-7"
            >r-7</span
          >
        </div>
      </div>
    </div>
  </div> `,
  styleUrls: ['./palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteComponent implements AfterViewInit {
  @ViewChild('ref')
  private readonly ref: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    Array.from(this.ref.nativeElement.querySelectorAll('.indicator'))
      .map(el => {
        const bgColor = getComputedStyle(el).backgroundColor;
        if (bgColor === 'rgba(0, 0, 0, 0)') {
          return () => {
            // do nothing
          };
        }
        const color =
          bgColor +
          ', #' +
          bgColor
            .slice(4, -1)
            .split(',')
            .map(v => parseInt(v.trim()).toString(16).padStart(2, '0'))
            .join('');
        const slot = el.querySelector('.value');
        return () => {
          slot.innerHTML = color;
        };
      })
      .forEach(fn => fn());
  }
}
