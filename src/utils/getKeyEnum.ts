export const getKeyEnum = (enumObj: any, key: number) =>
  Object.keys(enumObj).filter((key) => isNaN(Number(key)))[key];
