export interface ChildProxy<T> {
    url: string;
    child: T | null;
}
