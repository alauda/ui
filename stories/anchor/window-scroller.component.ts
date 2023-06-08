import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div auiAnchor>
      <ul class="d-block">
        <li>
          <label
            auiAnchorLabel
            id="abc"
            >Label 1</label
          >
          <div style="height: 100px">Content 1</div>
          <ul
            class="d-block"
            style="margin-left: 20px"
          >
            <li>
              <label
                auiAnchorLabel
                level
                >SubLabel 1-1</label
              >
              <div style="height: 100px">SubContent 1-1</div>
            </li>
            <li>
              <label
                auiAnchorLabel
                level
                >SubLabel 1-2</label
              >
              <div style="height: 100px">SubContent 1-2</div>
            </li>
          </ul>
        </li>
        <li>
          <label auiAnchorLabel>Label 2</label>
          <div style="height: 200px">Content 2</div>
          <ul
            class="d-block"
            style="margin-left: 20px"
          >
            <li>
              <label
                auiAnchorLabel
                level
                >SubLabel 2-1</label
              >
              <div style="height: 100px">SubContent 2-1</div>
            </li>
            <li>
              <label
                auiAnchorLabel
                level
                >SubLabel 2-2</label
              >
              <div style="height: 100px">SubContent 2-2</div>
            </li>
          </ul>
        </li>
        <li>
          <label auiAnchorLabel>Label 3</label>
          <div style="height: 300px">Content 3</div>
        </li>
        <li>
          <label auiAnchorLabel>Label 4</label>
          <div style="height: 400px">Content 4</div>
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WindowScrollerComponent {}
