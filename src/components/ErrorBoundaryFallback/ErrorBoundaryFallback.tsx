import { Alert, AlertTitle, IconButton } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import CloseIcon from '@mui/icons-material/Close';

export function ErrorBoundaryFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Alert severity="error" action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => resetErrorBoundary()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      <AlertTitle>Error</AlertTitle>
      Something went wrong...
    </Alert>
  )
}
