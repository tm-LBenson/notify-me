// timeUtils.js
export function formatTime(timeInSeconds) {
  const days = Math.floor(timeInSeconds / (24 * 60 * 60));
  const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return { days, hours, minutes, seconds };
}
