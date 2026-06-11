import { upcomingJob } from '../data';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function UpcomingWashCard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 mb-6 relative overflow-hidden border border-slate-100"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">Up Next</span>
            <span className="text-slate-400 text-xs font-bold">{upcomingJob.date}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{upcomingJob.time}</h2>
          <p className="text-sm text-indigo-600 font-bold mt-1 tracking-wide">{upcomingJob.type}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur opacity-40"></div>
          <img src={upcomingJob.washer.photo} alt={upcomingJob.washer.name} className="w-14 h-14 rounded-2xl object-cover bg-slate-200 relative z-10 border-2 border-white" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-black text-slate-800">{upcomingJob.washer.name}</h3>
          <p className="text-xs text-slate-500 font-bold mt-0.5"><span className="text-amber-500 text-sm">★</span> {upcomingJob.washer.rating} <span className="mx-1">•</span> {upcomingJob.washer.reviews} washes</p>
        </div>
        <div className="flex gap-2">
           <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Phone className="w-5 h-5 fill-current" /></motion.button>
           <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><MessageCircle className="w-5 h-5 fill-current" /></motion.button>
        </div>
      </div>

      <div className="flex gap-3 relative z-10">
        <motion.button whileTap={{ scale: 0.95 }} className="w-1/3 py-3 rounded-2xl bg-slate-100 text-slate-600 text-sm font-bold tracking-wide">Skip</motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('tracking')} 
          className="w-2/3 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 tracking-wide flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4" /> Track Live
        </motion.button>
      </div>
    </motion.div>
  );
}
