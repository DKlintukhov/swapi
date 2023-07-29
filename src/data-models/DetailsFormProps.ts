export interface DetailesFormProps<T> {
  data: T;
  onSubmit: (p: T) => void;
  onDelete: () => void;
}
