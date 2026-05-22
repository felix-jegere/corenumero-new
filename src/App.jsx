import { useState } from 'react';
import { RefreshCw, Plus, Minus, TrendingUp, Users, Target, Award } from 'lucide-react';

function App() {
  const [currentNumber, setCurrentNumber] = useState(4247);
  const [history, setHistory] = useState([3921, 4189, 4247]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const generateNewNumber = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newNum = Math.floor(Math.random() * 9000) + 1000;
      setCurrentNumber(newNum);
      setHistory(prev => [newNum, ...prev].slice(0, 5));
      setIsGenerating(false);
    }, 600);
  };

  const increment = () => setCurrentNumber(prev => prev + 1);
  const decrement = () => setCurrentNumber(prev => Math.max(1000, prev - 1));

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-bold">♾️</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">CoreNumero</h1>
              <p className="text-xs text-zinc-500 -mt-1">Intelligence Engine</p>
            </div>
          </div>

          <div className="flex gap-8 text-sm">
            {['dashboard', 'generator', 'analytics', 'history'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize transition-colors hover:text-white ${activeTab === tab ? 'text-white font-medium' : 'text-zinc-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={generateNewNumber}
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-2xl font-medium hover:bg-zinc-200 transition-all active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            New Core
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        {/* Hero Number */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-3xl px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">LIVE CORE</span>
          </div>

          <div className="text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-500 leading-none mb-2">
            {currentNumber}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={decrement}
              className="glass p-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
            >
              <Minus className="w-6 h-6" />
            </button>
            <button
              onClick={increment}
              className="glass p-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Generated", value: "48,291", icon: Target },
            { label: "This Month", value: "3,284", icon: TrendingUp },
            { label: "Active Users", value: "1,294", icon: Users },
            { label: "Avg Core", value: "4,872", icon: Award },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-3xl p-6">
              <stat.icon className="w-8 h-8 text-violet-400 mb-4" />
              <div className="text-4xl font-semibold mb-1">{stat.value}</div>
              <div className="text-zinc-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent History */}
        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            Recent Cores
            <span className="text-xs px-3 py-1 bg-zinc-800 rounded-full text-zinc-400">Last 5</span>
          </h2>
          <div className="space-y-4">
            {history.map((num, index) => (
              <div key={index} className="flex items-center justify-between bg-zinc-900/50 rounded-2xl px-6 py-4 group hover:bg-zinc-900 transition-colors">
                <div className="text-3xl font-mono tabular-nums">{num}</div>
                <div className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {new Date(Date.now() - index * 3600000).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;