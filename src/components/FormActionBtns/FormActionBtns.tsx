import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import './FormActionBtns.css';

interface FormActionBtnsProps {
  onDelete: () => void,
  onReset: () => void,
}

export function FormActionBtns({ onDelete, onReset }: FormActionBtnsProps) {
  return (
    <div className="form-action-btns">
      <Button size="small" variant="outlined" color="secondary" role="reset" onClick={onReset}><RestartAltIcon/></Button>
      <Button type="submit" size="small" variant="outlined" role="submit" color="success"><SaveIcon/></Button>
      <Button size="small" variant="outlined" color="error" role="delete" onClick={onDelete}><DeleteIcon/></Button>
    </div>
  )
}
