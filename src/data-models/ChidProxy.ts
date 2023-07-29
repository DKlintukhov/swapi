export interface ChildProxy<T> {
  url: string;
  id: string;
  child: T | null;
}

export const makeChildProxy = <T>(url: string): ChildProxy<T> => {
  const id = url.split('/').reverse()[1];
  return { url, id, child: null };
}
