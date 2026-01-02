import React from 'react';
import NetworkBackground from './components/NetworkBackground';
import CountdownDisplay from './components/CountdownDisplay';

const App: React.FC = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#020205] text-blue-400">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <CountdownDisplay />
      </div>
    </main>
  );
};

export default App;