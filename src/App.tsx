import { useState } from 'react';
import GoogleMap from './components/GoogleMap';
import TrafficDataList from './components/TrafficDataList';
import CongestionInsights from './components/CongestionInsights';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Balikpapan Traffic Watch</h1>
        <nav className="app-nav">
          <button
            className={`nav-button ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            Map
          </button>
          <button
            className={`nav-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
        </nav>
      </header>
      <main className="app-main">
        {activeTab === 'map' && (
          <div className="tab-content">
            <div className="main-column">
              <GoogleMap />
            </div>
            <div className="main-column">
              <TrafficDataList />
            </div>
          </div>
        )}
        {activeTab === 'insights' && (
          <div className="tab-content single-column">
            <div className="main-column">
              <CongestionInsights />
            </div>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>A calm look at the city's traffic.</p>
      </footer>
    </div>
  );
}

export default App;