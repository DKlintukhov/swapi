import { Button } from '@mui/material';
import './FormActionBtns.css';

interface FormActionBtnsProps {
  onCancel: () => void,
  onReset: () => void,
}

export function FormActionBtns({ onCancel, onReset }: FormActionBtnsProps) {
  return (
    <div className="form-action-btns">
      <Button size="small" variant="outlined" color="error" onClick={onCancel}>Cancel</Button>
      <Button size="small" variant="outlined" color="secondary" onClick={onReset}>Reset</Button>
      <Button type="submit" size="small" variant="outlined" color="success">Save</Button>
    </div>
  )
}
