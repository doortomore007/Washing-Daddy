import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

export function PlansTab() {
  const plans = [
    {
      name: 'Hatchback',
      price: '₹899',
      features: ['25 exterior washes', '2 interior washes', 'Standard products', 'Before & after snaps'],
      recommended: false,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Sedan',
      price: '₹1,199',
      features: ['25 exterior washes', '2 interior washes', 'Premium products', 'Before & after snaps'],
      recommended: true,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Mid-SUVs',
      price: '₹1,199',
      features: ['25 exterior washes', '2 interior washes', 'Premium products', 'Before & after snaps'],
      recommended: false,
      color: 'from-rose-400 to-orange-400'
    },
    {
      name: 'Full SUVs',
      price: '₹1,499',
      features: ['25 exterior washes', '2 interior washes', 'Premium products', 'Before & after snaps'],
      recommended: false,
      color: 'from-teal-400 to-emerald-400'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 overflow-y-auto pb-32 h-full"
    >
      <div className="pt-6 mb-8">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-3">Flex your ride. 🚗</h1>
        <p className="text-base text-slate-500 font-medium">Select a plan tailored for your garage.</p>
      </div>

      <div className="space-y-5">
        {plans.map((plan, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={plan.name} 
            className={`relative p-6 rounded-[2rem] border transition-all cursor-pointer overflow-hidden ${plan.recommended ? 'border-transparent shadow-xl shadow-indigo-200/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            {plan.recommended && (
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${plan.color}`} />
            )}
            {plan.recommended && (
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.color} rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3`} />
            )}
            
            {plan.recommended && (
              <div className="inline-flex flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-md shadow-indigo-200">
                <Sparkles className="w-3 h-3 fill-current" /> Hot Pick
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6 relative z-10">
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">{plan.name}</h3>
               <div className="text-right">
                  <span className={`text-3xl font-black tracking-tighter ${plan.recommended ? 'text-transparent bg-clip-text bg-gradient-to-r ' + plan.color : 'text-slate-800'}`}>
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider mt-1">/ month</span>
               </div>
            </div>
            
            <ul className="space-y-3 mb-8 relative z-10">
               {plan.features.map(f => (
                   <li key={f} className="flex gap-3 items-center text-sm text-slate-600 font-bold tracking-wide">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.recommended ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                         <Check className="w-3 h-3 stroke-[3]" />
                       </div>
                       {f}
                   </li>
               ))}
            </ul>

            <motion.button 
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg relative z-10 ${plan.recommended ? 'bg-gradient-to-r ' + plan.color + ' text-white shadow-indigo-300' : 'bg-slate-900 text-white shadow-slate-900/20'}`}>
                Grab IT
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
