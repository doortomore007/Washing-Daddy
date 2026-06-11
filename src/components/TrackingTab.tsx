import { liveJob } from '../data';
import { Phone, MessageCircle, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'motion/react';

export function TrackingTab() {
  const steps = [
    { name: 'Pre-rinse', status: 'completed' },
    { name: 'Soap applied', status: 'completed' },
    { name: 'Washing', status: 'in_progress' },
    { name: 'Rinse', status: 'pending' },
    { name: 'Drying', status: 'pending' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#fafcff] overflow-y-auto pb-32"
    >
      {/* Fancy Map Section */}
      <div className="relative h-72 bg-slate-100 overflow-hidden shrink-0">
        <img 
          src="https://maps.googleapis.com/maps/api/staticmap?center=12.9716,77.5946&zoom=15&size=600x400&maptype=roadmap&style=feature:landscape.man_made|element:geometry|color:0xf3f4f6&style=feature:water|element:geometry|color:0xdbeafe&sensor=false" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40" 
          alt="Map"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fafcff]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center -mt-10">
            {/* Pulsing rings */}
            <div className="w-64 h-64 border border-indigo-500/20 rounded-full animate-ping flex items-center justify-center opacity-50 absolute"></div>
            <div className="w-32 h-32 border-2 border-indigo-500/40 rounded-full animate-pulse flex items-center justify-center absolute bg-indigo-500/5"></div>
            
            {/* Center dot */}
            <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-10 border-4 border-indigo-100">
               <div className="w-5 h-5 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            </div>
            
            {/* Washer moving */}
            <motion.div 
               animate={{ x: [40, 20, 0], y: [-40, -20, 0] }}
               transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
               className="absolute z-20"
            >
               <div className="bg-white p-1 rounded-2xl shadow-xl border-2 border-slate-100 mb-2 transform -translate-x-1/2 -translate-y-full">
                 <img src={liveJob.washer.photo} className="w-10 h-10 rounded-xl" />
               </div>
            </motion.div>
        </div>

        <div className="absolute top-12 left-6 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          <span className="text-xs font-bold text-white tracking-widest uppercase">Live</span>
        </div>
      </div>

      <div className="px-6 flex-1 relative -mt-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-6 border border-slate-100 relative">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight mb-2">
              {liveJob.washer.name.split(' ')[0]} has arrived! 🎉
            </h2>
            <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
              <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center animate-spin">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Started 8 mins ago</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-100 text-slate-700 font-bold active:bg-slate-100">
                 <Phone className="w-6 h-6 text-slate-400 fill-current" />
                 <span className="text-xs">Call</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-100 text-slate-700 font-bold active:bg-slate-100">
                 <MessageCircle className="w-6 h-6 text-slate-400 fill-current" />
                 <span className="text-xs">Chat</span>
              </motion.button>
          </div>

          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Wash Progress</h3>
             <div className="space-y-6 relative">
                 <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 z-0 rounded-full" />
                 
                 {steps.map((step, idx) => (
                     <div key={idx} className="flex gap-5 relative z-10">
                         <div className="bg-slate-50 py-1">
                             {step.status === 'completed' ? (
                                 <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-200">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                 </div>
                             ) : step.status === 'in_progress' ? (
                                 <div className="w-6 h-6 rounded-full border-[4px] border-indigo-100 p-0.5 flex items-center justify-center overflow-hidden bg-white">
                                     <div className="w-full h-full bg-indigo-500 rounded-full animate-ping" />
                                     <div className="w-2 h-2 bg-indigo-500 rounded-full absolute" />
                                 </div>
                             ) : (
                                 <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white" />
                             )}
                         </div>
                         <div className="pt-1">
                            <h3 className={`text-base font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>
                                {step.name}
                            </h3>
                            {step.status === 'in_progress' && (
                                <motion.p 
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="text-xs text-indigo-500 font-bold tracking-wide mt-1 uppercase"
                                >
                                  Working on it...
                                </motion.p>
                            )}
                         </div>
                     </div>
                 ))}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
