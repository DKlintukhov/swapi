import { FormActionBtns } from '..';
import './Form.css';

interface FormProps {
  onReset: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function Form({ onDelete, onReset, onSubmit, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} aria-label="form" className="form__container">
      {children}
      <FormActionBtns onReset={onReset} onDelete={onDelete}></FormActionBtns>
    </form>
  )
}
