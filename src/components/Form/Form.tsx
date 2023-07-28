import { FormActionBtns } from '..';
import './Form.css';

interface FormProps {
  onReset: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function Form({ onCancel, onReset, onSubmit, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="form__container">
      {children}
      <FormActionBtns onReset={onReset} onCancel={onCancel}></FormActionBtns>
    </form>
  )
}
