import { useState } from 'react';
import {Navbar} from './components/Navbar';
import DashboardGrid from './components/DashboardGrid';
import PuzzleView from './components/PuzzleView';
import { generateDays } from './types';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const days = generateDays();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <Navbar />
      <main className="container relative z-1">
        {selectedDay === null ? (
          <div className="fadein animation-duration-500">
              <div className="text-center mb-6 pb-4 border-bottom-1 border-white-alpha-10">
                <h1 className="text-4xl md:text-5xl font-bold m-0 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Advent Calendar
                </h1>
                <p className="text-gray-400 m-0">Select a day to access the Rust solution workspace.</p>
              </div>
              <DashboardGrid days={days} onSelectDay={setSelectedDay} />
          </div>
        ) : (
          <div className="fadein animation-duration-500">
              <PuzzleView
                  dayNumber={selectedDay}
                  onBack={() => setSelectedDay(null)}
              />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;