import { ChildProxy } from './ChidProxy';

export interface CardProps<T> {
  proxy: ChildProxy<T>;
  onSave: (data: ChildProxy<T>) => void;
}
