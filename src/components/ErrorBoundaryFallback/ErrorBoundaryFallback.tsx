import { Alert, AlertTitle, IconButton } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export function ErrorBoundaryFallback({ resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  return (
    <Alert severity="error" action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          navigate('/');
          return resetErrorBoundary();
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      <AlertTitle>Error</AlertTitle>
      Something went wrong...
    </Alert>
  )
}
