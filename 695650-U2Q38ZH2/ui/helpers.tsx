export function generateId(l: number = 10): string {
  const s = '1234567890qwertyuiopasdfghjklzxcvbnm';
  return new Array(l).fill('_').map(_ => {
    let d = s[Math.floor(Math.random() * s.length)];
    if (Math.random() < 0.5) {
      d = d.toUpperCase();
    }
    return d;
  }).join('');
}

export function copyToClipboard(text: string): void {
  window.navigator.clipboard.writeText(text).then(() => {
    console.log("Copied to clipboard");
  }).catch(err => {
    console.log("Failed to copy");
  });
}

export function parseTime(millis: number, tenths?: boolean): string {
  let seconds = Math.floor(millis / 1000);
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = padZero(seconds % 60);
  return `${minutes}:${extraSeconds}${tenths ? '.' + Math.floor(millis / 100) % 10 : ''}`;
}

function padZero(num: number): string {
  return num < 10 ? "0" + num : num.toString();
}
