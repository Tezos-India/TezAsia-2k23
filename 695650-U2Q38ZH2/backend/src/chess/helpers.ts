function generateId(l: number = 10): string {
  const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return new Array(l).fill('_').map(() => {
    let e = s[Math.floor(Math.random() * s.length)];
    if (Math.random() < 0.5) {
      return e.toUpperCase();
    }
    return e;
  }).join('');
}

export { generateId };
