export interface CardProps<T> {
  id: string;
  onSave: (data: T) => void;
}
