import { Button } from '@mui/material';

interface FormActionBtnsProps {
  handleCancel: () => void,
  handleReset: () => void,
}

export const FormActionBtns = ({ handleCancel, handleReset }: FormActionBtnsProps) => {
  return (
    <>
      <Button size="small" variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
      <Button size="small" variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
      <Button type="submit" size="small" variant="outlined" color="success">Save</Button>
    </>
  )
}
