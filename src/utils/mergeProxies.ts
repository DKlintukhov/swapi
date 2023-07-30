import { ChildProxy } from '../data-models';
import { Entity } from '../data-models/Entity';

export const mergeProxies = <T extends Entity>(arr: ChildProxy<T>[], other: ChildProxy<T>): ChildProxy<T>[] => {
  const merged = arr.map((proxy) => {
    if (other.url === proxy.url) {
      return other;
    }
    return proxy;
  });
  return merged;
}
