// 清除对象空属性
export function cleanEmptyObj(obj: { [key: string]: any }) {
  const newObj: { [key: string]: any } = {};
  for (const item of Object.keys(obj)) {
    if (obj[item] !== undefined && obj[item] !== null) {
      newObj[item] = obj[item];
    }
  }

  return newObj;
}
