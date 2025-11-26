import GoogleMap from './components/GoogleMap';
import CongestionInsights from './components/CongestionInsights';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Balikpapan Traffic Watch</h1>
      </header>
      <main className="app-main-grid">
        <div className="main-column">
          <GoogleMap />
        </div>
        <div className="main-column">
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