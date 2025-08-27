let hiddenTextarea: HTMLTextAreaElement;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

function calculateNodeStyling(targetElement: HTMLTextAreaElement) {
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));

  const contextStyle = CONTEXT_STYLE.map(
    name => `${name}:${style.getPropertyValue(name)}`,
  ).join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

export function calcTextareaHeight(
  targetElement: HTMLTextAreaElement,
  minRows = 1,
  maxRows: number = null,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.append(hiddenTextarea);
  }

  const { paddingSize, borderSize, contextStyle } =
    calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = hiddenTextarea.scrollHeight + borderSize;

  hiddenTextarea.value = '';
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  const result: {
    minHeight?: string;
    maxHeight?: string;
    height?: string;
  } = {};

  if (minRows !== null) {
    const minHeight = singleRowHeight * minRows + paddingSize + borderSize;
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (maxRows !== null) {
    const maxHeight = singleRowHeight * maxRows + paddingSize + borderSize;
    height = Math.min(maxHeight, height);
    result.maxHeight = `${maxHeight}px`;
  }
  result.height = `${height}px`;

  if (hiddenTextarea.parentNode) {
    hiddenTextarea.remove();
  }
  hiddenTextarea = null;

  return result;
}
