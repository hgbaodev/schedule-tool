export function refactorData(data) {
  const result = Object.groupBy(data, ({ maMh, nhom }) => [maMh, nhom]);
  return result;
}
