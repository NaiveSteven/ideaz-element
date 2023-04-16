export const toCamelCase = (str: string) => {
  return str
    .replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    })
    .replace(/^([a-z])/, function (g) {
      return g[0].toUpperCase();
    });
};
