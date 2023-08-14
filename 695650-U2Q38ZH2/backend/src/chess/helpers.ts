function generateId(l: number = 10): string {
  const s = "abcdefghijklmnopqrstuvwxyz0123456789";
  return new Array(l).fill('_').map(() => {
    let e = s[Math.floor(Math.random() * s.length)];
    if (Math.random() < 0.5) {
      return e.toUpperCase();
    }
    return e;
  }).join('');
}

export { generateId };


// function generateId(l = 10) {
//   const s = "abcdefghijklmnopqrstuvwxyz0123456789"
//   return new Array(l).fill('_').map(_ => {
//     let e = s[Math.floor(Math.random() * s.length)]
//     if (Math.random() < 0.5) {
//       return e.toUpperCase()
//     }
//     return e
//   }).join('')
// }


// module.exports = { generateId }