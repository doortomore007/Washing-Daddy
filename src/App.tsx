import { useState, useEffect } from 'react';
import { Home, MapPin, Zap, User } from 'lucide-react';
import { HomeTab } from './components/HomeTab';
import { TrackingTab } from './components/TrackingTab';
import { PlansTab } from './components/PlansTab';
import { ProfileTab } from './components/ProfileTab';
import { LoginScreen } from './components/LoginScreen';
import { LegalScreen } from './components/LegalScreen';
import { motion, AnimatePresence } from 'motion/react';
import { auth, onAuthStateChanged } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [legalView, setLegalView] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'plans', label: 'Plans', icon: Zap },
    { id: 'tracking', label: 'Live', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderTab = () => {
    if (legalView) {
      return <LegalScreen key="legal" title={legalView} onBack={() => setLegalView(null)} />;
    }
    switch (activeTab) {
      case 'home': return <HomeTab key="home" onNavigate={setActiveTab} />;
      case 'tracking': return <TrackingTab key="tracking" />;
      case 'plans': return <PlansTab key="plans" />;
      case 'profile': return <ProfileTab key="profile" showLegal={setLegalView} />;
      default: return <HomeTab key="home" onNavigate={setActiveTab} />;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
       <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-[#f0f4f8] min-h-screen flex justify-center w-full font-sans antialiased text-slate-900 selection:bg-indigo-200">
        <div className="w-full max-w-[400px] bg-[#fafcff] h-screen relative flex flex-col shadow-2xl ring-1 ring-slate-200 lg:rounded-[3rem] lg:my-6 lg:h-[calc(100vh-48px)] overflow-hidden">
          <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} onGoLegal={setLegalView} />
          <AnimatePresence>
            {legalView && (
              <motion.div 
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                className="absolute inset-0 bg-[#fafcff] z-50"
              >
                <LegalScreen title={legalView} onBack={() => setLegalView(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f8] min-h-screen flex justify-center w-full font-sans antialiased text-slate-900 selection:bg-indigo-200">
      <div className="w-full max-w-[400px] bg-[#fafcff] h-screen relative flex flex-col overflow-hidden shadow-2xl ring-1 ring-slate-200 lg:rounded-[3rem] lg:my-6 lg:h-[calc(100vh-48px)]">
        
        {/* Dynamic Content */}
        <div className="flex-1 px-1 overflow-x-hidden relative bg-[#fafcff]">
          <AnimatePresence mode="wait">
            {renderTab()}
          </AnimatePresence>
        </div>

        {/* Floating Bottom Navigation */}
        {!legalView && (
          <div className="absolute bottom-6 left-6 right-6 h-20 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-around px-2 z-50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-200" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-6 h-6 z-10 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className={`text-[10px] uppercase font-bold z-10 mt-1 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
