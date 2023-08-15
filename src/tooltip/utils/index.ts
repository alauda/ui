import {
  HorizontalConnectionPos,
  OriginConnectionPosition,
  OverlayConnectionPosition,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';

export function getOriginPosition(position: string): {
  main: OriginConnectionPosition;
  fallback: OriginConnectionPosition;
} {
  const pos = position.split(' ');
  let isXDir;
  if (pos[0] === 'start' || pos[0] === 'end') {
    isXDir = true;
  }
  const main = {
    originX: (pos[isXDir ? 0 : 1] as HorizontalConnectionPos) || 'center',
    originY: (pos[isXDir ? 1 : 0] as VerticalConnectionPos) || 'center',
  };
  const { x, y } = invertPosition(main.originX, main.originY);
  const fallback = {
    originX: isXDir ? x : main.originX,
    originY: isXDir ? main.originY : y,
  };
  return { main, fallback };
}

export function getOverlayPosition(position: string): {
  main: OverlayConnectionPosition;
  fallback: OverlayConnectionPosition;
} {
  const pos = position.split(' ');
  let isXDir;
  if (pos[0] === 'start' || pos[0] === 'end') {
    isXDir = true;
  }
  const horizontal =
    (pos[isXDir ? 0 : 1] as HorizontalConnectionPos) || 'center';
  const vertical = (pos[isXDir ? 1 : 0] as VerticalConnectionPos) || 'center';
  const main = {
    overlayX: isXDir ? invertHorizontal(horizontal) : horizontal,
    overlayY: isXDir ? vertical : invertVertical(vertical),
  };
  const { x, y } = invertPosition(main.overlayX, main.overlayY);
  const fallback = {
    overlayX: isXDir ? x : main.overlayX,
    overlayY: isXDir ? main.overlayY : y,
  };
  return { main, fallback };
}

export function invertHorizontal(dir: HorizontalConnectionPos) {
  if (dir === 'start') {
    dir = 'end';
  } else if (dir === 'end') {
    dir = 'start';
  }
  return dir;
}

export function invertVertical(dir: VerticalConnectionPos) {
  if (dir === 'top') {
    dir = 'bottom';
  } else if (dir === 'bottom') {
    dir = 'top';
  }
  return dir;
}

export function invertPosition(
  x: HorizontalConnectionPos,
  y: VerticalConnectionPos,
): { x: HorizontalConnectionPos; y: VerticalConnectionPos } {
  return { x: invertHorizontal(x), y: invertVertical(y) };
}
