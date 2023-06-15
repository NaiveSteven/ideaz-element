export const findDifferentItems = (array1: any[], array2: any[]) => {
  const differentItems = array1.filter(item => !array2.includes(item))
    .concat(array2.filter(item => !array1.includes(item)))
  return differentItems
}
