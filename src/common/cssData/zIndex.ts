let globalCssZIndex = 0;

export function getZIndex() {
  globalCssZIndex = globalCssZIndex + 1;
  return globalCssZIndex;
}

export function resetZIndex() {
  globalCssZIndex = 0;
}
