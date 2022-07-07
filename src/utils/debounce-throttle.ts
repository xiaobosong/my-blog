/* eslint-disable unicorn/no-this-assignment */
export type AnyFunction = (...args: any[]) => void;

/**
 * 函数防抖
 * @param {*} 执行函数
 * @param {*} 等待时间
 * @param {*} 立即执行标识
 */
export function debounce(fn: AnyFunction, wait = 300, immediate?: boolean) {
  let timeout: any;
  let args: any;
  let context: any;
  let timestamp: number;
  let result: any;

  const later = function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = fn.apply(context, args);
        if (!timeout) {
          args = null;
          context = null;
        }
      }
    }
  };

  return function debounced(this: any, ...rest: any) {
    context = this;
    args = rest;
    timestamp = Date.now();

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = Reflect.apply(fn, this, args);
      args = null;
      context = null;
    }

    return result;
  };
}

/**
 * 函数节流
 * @param {*} 执行函数
 * @param {*} 等待时间
 * @param {*} 作用域
 */
export function throttle(
  fn: { apply: (arg0: any, arg1: IArguments) => void },
  wait: number | undefined = 250,
  scope: any,
) {
  let last: number;
  let deferTimer: NodeJS.Timeout;
  return function (this: any, ...rest: any): void {
    const context = scope || this;

    const now = Date.now();
    const args = rest;
    if (last && now < last + wait) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, wait);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export default {
  debounce,
  throttle,
};
