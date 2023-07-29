import { ChildProxy } from '../data-models';
import { Entity } from '../data-models/Entity';

export const mergeProxies = <T extends Entity>(arr: ChildProxy<T>[], data: T): ChildProxy<T>[] => {
  const merged = arr.map((proxy) => {
    if (data.url === proxy.url) {
      return { ...proxy, child: data };
    }
    return proxy;
  });
  return merged;
}
