import { useState } from 'react';
import GoogleMapComponent from './components/GoogleMap';
import Insights from './components/Insights';
import './App.css';

type View = 'map' | 'insights';

function App() {
  const [view, setView] = useState<View>('map');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Balikpapan Traffic Watch</h1>
        <nav>
          <button
            onClick={() => setView('map')}
            className={view === 'map' ? 'active' : ''}
          >
            Live Map
          </button>
          <button
            onClick={() => setView('insights')}
            className={view === 'insights' ? 'active' : ''}
          >
            Insights
          </button>
        </nav>
      </header>
      <main className="app-main">
        {view === 'map' ? <GoogleMapComponent /> : <Insights />}
      </main>
      <footer className="app-footer">
        <p>A calm look at the city's traffic.</p>
      </footer>
    </div>
  );
}

export default App;