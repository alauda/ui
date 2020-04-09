Features:

- Active link and content when content visible in scroll container.
- Smooth scroll to content when click link.
- Support programmable scroll to content.
- Support nested content.

Limit:

- container must scrollable.
- link active or fix position styles not included.
- if scroll to then end, scrollHeight - scrollTop === clientHeight, set last content active.

Simplest usage:

```html
<!-- links -->
<aside>
  <a auiTocLink="content1" [for]="toc">content1</a>
  <a auiTocLink="content2" [for]="toc">content2</a>
  <a auiTocLink="content3" [for]="toc">content3</a>
</aside>
<!-- scroll container -->
<article auiTocContainer #toc="auiTocContainer">
  <section auiTocContent="content1">...</section>
  <section auiTocContent="content2">...</section>
  <section auiTocContent="content3">...</section>
</article>
```

Directives:

- `auiTocContainer`

  ```ts
  @Output() activedChange: EventEmitter<string>;
  ```

  emit when actived change, use this for self define links active.

  ```ts
  scrollTo(content: string): void;
  ```

  programmable scroll to content.

- `auiTocContent`

  ```ts
  @Input('auiTocContent') auiTocContent: string;
  ```

  set content name, must unique in same container.

  ```ts
  @HostBinding('class.isActive') active: boolean;
  ```

  you need define content `isActive` class for content styling when active.

- (Optional) `auiTocLink`

  ```ts
  @Input() for: TocContainerDirective;
  ```

  scroll container template reference variable

  ```ts
  @Input('auiTocLink') auiTocLink: string;
  ```

  link target content name.

  ```ts
  @HostBinding('class.isActive') active: boolean;
  ```

  you need define link `isActive` class for link styling when active.
