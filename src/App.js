import './App.css';
import ErrorBoundary from './wrappers/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import LocationMonitor from './wrappers/LocationMonitor';
import UnderRootContent from './components/UnderRootContent';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LocationMonitor>
          <UnderRootContent />
        </LocationMonitor>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
