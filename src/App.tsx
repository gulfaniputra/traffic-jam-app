import { useState } from 'react';
import GoogleMap from './components/GoogleMap';
import CongestionInsights from './components/CongestionInsights';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Balikpapan Traffic Watch</h1>
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Hide Insights' : 'Show Insights'}
        </button>
      </header>
      <main className="app-main">
        <div className="main-content">
          <GoogleMap />
        </div>
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <CongestionInsights />
        </div>
      </main>
      <footer className="app-footer">
        <p>A calm look at the city's traffic.</p>
      </footer>
    </div>
  );
}

export default App;
