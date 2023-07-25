
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryFallback } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, InfoPage } from './pages';
import './App.css';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/info' element={<InfoPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
