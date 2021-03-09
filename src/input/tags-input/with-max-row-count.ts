import { ComponentSize } from '../../types';

function getRowHeight(size: ComponentSize) {
  switch (size) {
    case ComponentSize.Large:
      return 33;
    case ComponentSize.Small:
      return 23;
    case ComponentSize.Mini:
      return 21;
    default:
      return 25;
  }
}

function getContainerPaddingPatch(size: ComponentSize) {
  switch (size) {
    case ComponentSize.Mini:
      return 3;
    case ComponentSize.Small:
      return 5;
    default:
      return 7;
  }
}

export function createWithMaxRowCount<
  T extends {
    maxRowCount: number;
    customRowHeight?: number;
    size: ComponentSize;
  }
>(component: T) {
  const hostPosition = () => (component.maxRowCount > 0 ? 'relative' : 'unset');
  const hostDisplay = () => (component.maxRowCount ? 'block' : 'unset');
  const maxHeight = () => {
    if (component.maxRowCount <= 0) {
      return 'unset';
    }

    const paddingPatch = getContainerPaddingPatch(component.size);

    const rowHeight =
      isNaN(component.customRowHeight) || component.customRowHeight <= 0
        ? getRowHeight(component.size)
        : component.customRowHeight;

    return `${rowHeight * component.maxRowCount + paddingPatch}px`;
  };

  return {
    hostPosition,
    hostDisplay,
    maxHeight,
  };
}
