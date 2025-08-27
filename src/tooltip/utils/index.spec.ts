import {
  getOriginPosition,
  getOverlayPosition,
  invertHorizontal,
  invertPosition,
  invertVertical,
} from '.';

describe('Tooltip utils', () => {
  it('should invertHorizontal return correct value', () => {
    expect(invertHorizontal('start')).toBe('end');
    expect(invertHorizontal('end')).toBe('start');
    expect(invertHorizontal('center')).toBe('center');
  });

  it('should invertVertical return correct value', () => {
    expect(invertVertical('top')).toBe('bottom');
    expect(invertVertical('bottom')).toBe('top');
    expect(invertVertical('center')).toBe('center');
  });

  it('should invertPosition return correct value', () => {
    expect(invertPosition('start', 'top')).toEqual({ x: 'end', y: 'bottom' });
    expect(invertPosition('start', 'center')).toEqual({
      x: 'end',
      y: 'center',
    });
    expect(invertPosition('end', 'bottom')).toEqual({
      x: 'start',
      y: 'top',
    });
    expect(invertPosition('center', 'bottom')).toEqual({
      x: 'center',
      y: 'top',
    });
  });

  it('should getOriginPosition return correct value', () => {
    expect(getOriginPosition('top')).toEqual({
      main: { originX: 'center', originY: 'top' },
      fallback: { originX: 'center', originY: 'bottom' },
    });
    expect(getOriginPosition('start')).toEqual({
      main: { originX: 'start', originY: 'center' },
      fallback: { originX: 'end', originY: 'center' },
    });
    expect(getOriginPosition('end center')).toEqual({
      main: { originX: 'end', originY: 'center' },
      fallback: { originX: 'start', originY: 'center' },
    });
    expect(getOriginPosition('top end')).toEqual({
      main: { originX: 'end', originY: 'top' },
      fallback: { originX: 'end', originY: 'bottom' },
    });
    expect(getOriginPosition('start bottom')).toEqual({
      main: { originX: 'start', originY: 'bottom' },
      fallback: { originX: 'end', originY: 'bottom' },
    });
  });

  it('should getOverlayPosition return correct value', () => {
    expect(getOverlayPosition('top')).toEqual({
      main: { overlayX: 'center', overlayY: 'bottom' },
      fallback: { overlayX: 'center', overlayY: 'top' },
    });
    expect(getOverlayPosition('start')).toEqual({
      main: { overlayX: 'end', overlayY: 'center' },
      fallback: { overlayX: 'start', overlayY: 'center' },
    });
    expect(getOverlayPosition('end center')).toEqual({
      main: { overlayX: 'start', overlayY: 'center' },
      fallback: { overlayX: 'end', overlayY: 'center' },
    });
    expect(getOverlayPosition('top end')).toEqual({
      main: { overlayX: 'end', overlayY: 'bottom' },
      fallback: { overlayX: 'end', overlayY: 'top' },
    });
    expect(getOverlayPosition('start bottom')).toEqual({
      main: { overlayX: 'end', overlayY: 'bottom' },
      fallback: { overlayX: 'start', overlayY: 'bottom' },
    });
  });
});
