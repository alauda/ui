export function scrollIntoView(container: HTMLElement, selected: HTMLElement) {
  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const top = selected.offsetTop;
  const bottom = selected.offsetTop + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (viewRectTop > top) {
    container.scrollTop = top;
  } else if (viewRectBottom < bottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
