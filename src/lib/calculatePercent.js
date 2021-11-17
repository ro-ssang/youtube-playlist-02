export function calculatePercent(x, contElem) {
  const SIDE_BAR_WIDTH = 260;

  const position = x - contElem.offsetLeft - SIDE_BAR_WIDTH;

  let percent = (position / contElem.clientWidth) * 100;

  if (percent < 0) {
    percent = 0;
  }
  if (percent > 100) {
    percent = 100;
  }

  return percent;
}
