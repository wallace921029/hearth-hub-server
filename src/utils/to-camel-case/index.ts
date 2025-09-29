// utils/camelCase.ts

export type AnyObject = Record<string, any>;

/**
 * 将对象或数组的下划线字段转换为驼峰字段
 * @param obj 需要转换的对象或数组
 */
export function toCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    const result: AnyObject = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        result[camelKey] = toCamelCase((obj as AnyObject)[key]);
      }
    }
    return result as T;
  }
  return obj;
}
