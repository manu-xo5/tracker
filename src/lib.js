export function sortDate(a, b) {
  let year = new Date().getFullYear();
  return new Date(`${year}T${a}`) - new Date(`${year}T${b}`);
}
