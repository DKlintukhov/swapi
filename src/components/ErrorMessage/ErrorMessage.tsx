import { Button, Typography } from '@mui/material';

interface ErrorMessageProps {
  msg?: string;
  onRetry: () => void;
}

export function ErrorMessage({ msg, onRetry }: ErrorMessageProps) {
  const text = msg ?? 'Something went wrong...';

  return (
    <>
      <Typography variant="h5" color="error"> {text}</Typography>
      <Button variant="outlined" role="retry" onClick={onRetry}>Retry</Button>
    </>
  )
}
