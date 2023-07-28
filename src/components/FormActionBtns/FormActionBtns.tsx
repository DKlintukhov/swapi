import { Button } from '@mui/material';
import './FormActionBtns.css';

interface FormActionBtnsProps {
  handleCancel: () => void,
  handleReset: () => void,
}

export function FormActionBtns({ handleCancel, handleReset }: FormActionBtnsProps) {
  return (
    <div className="form-action-btns">
      <Button size="small" variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
      <Button size="small" variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
      <Button type="submit" size="small" variant="outlined" color="success">Save</Button>
    </div>
  )
}
