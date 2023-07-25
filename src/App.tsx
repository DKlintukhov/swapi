import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryFallback } from './components';
import './App.css';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    </ErrorBoundary>
  );
}

export default App;
