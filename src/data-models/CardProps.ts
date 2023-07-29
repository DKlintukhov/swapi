import { ChildProxy } from './ChidProxy';

export interface CardProps<T> {
  proxy: ChildProxy<T>;
  onSave: (data: T) => void;
}
