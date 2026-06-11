import { UpcomingWashCard } from './UpcomingWashCard';
import { currentUser } from '../data';
import { Droplets, Plus, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeTab({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-6 overflow-y-auto pb-32 h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-rose-100 text-rose-600 text-xs font-bold mb-2 uppercase tracking-widest"
          >
            ☀️ Morning Routine
          </motion.div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">Sup, {currentUser.name.split(' ')[0]}! 🤙</h1>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur opacity-40"></div>
          <img src={currentUser.profilePic} alt="Profile" className="w-14 h-14 rounded-full border-2 border-white relative z-10" />
        </div>
      </div>

      <UpcomingWashCard onNavigate={onNavigate} />

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('plans')} 
          className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100/50 shadow-sm"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 text-indigo-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Wash Now</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl border border-teal-100/50 shadow-sm"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 text-teal-500">
            <Droplets className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Interior</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl border border-rose-100/50 shadow-sm"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 text-rose-500">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Add-ons</span>
        </motion.button>
      </div>

      {/* Monthly Progress */}
      <div className="bg-slate-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="flex justify-between items-end mb-4 relative z-10">
          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-1">Flex Level</h3>
            <p className="text-2xl font-black text-white">Squeaky Clean ✨</p>
          </div>
          <span className="text-indigo-300 font-bold text-sm bg-indigo-900/50 px-3 py-1 rounded-full">18/25 Washes</span>
        </div>
        
        <div className="w-full bg-slate-800 rounded-full h-3 mb-2 relative z-10 border border-slate-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full relative"
          >
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 rounded-full blur-[2px]"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
