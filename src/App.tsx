import TrafficDataList from './components/GoogleMap';
import Insights from './components/Insights';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Balikpapan Traffic Watch</h1>
        <p className="app-subtitle">
          Development Mode: Displaying Mock Data
        </p>
      </header>
      <main className="app-main-grid">
        <div className="main-column">
          <TrafficDataList />
        </div>
        <div className="main-column">
          <Insights />
        </div>
      </main>
      <footer className="app-footer">
        <p>A calm look at the city's traffic.</p>
      </footer>
    </div>
  );
}

export default App;