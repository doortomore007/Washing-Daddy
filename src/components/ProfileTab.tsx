import { currentUser, currentVehicles } from '../data';
import { motion } from 'motion/react';
import { Settings, CreditCard, Clock, ChevronRight, Car, Shield, LogOut, FileText } from 'lucide-react';
import { auth, signOut } from '../firebase';

export function ProfileTab({ showLegal }: { showLegal?: (title: string) => void }) {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-6 overflow-y-auto pb-32 h-full bg-[#fafcff]"
    >
      <div className="pt-6 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-md opacity-50"></div>
             <img src={currentUser.profilePic} alt="Profile" className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-xl relative z-10" />
             <div className="absolute -bottom-2 right-0 bg-white rounded-full p-1.5 shadow-md z-20">
               <div className="bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center">
                 <Shield className="w-3 h-3 text-white" />
               </div>
             </div>
          </div>
          <div>
             <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-2">{currentUser.name}</h1>
             <p className="text-sm font-bold text-slate-400 bg-slate-100 inline-block px-3 py-1 rounded-full">{currentUser.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] shadow-xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">My Garage</h3>
            <button className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Add New</button>
        </div>
        {currentVehicles.map(v => (
            <div key={v.id} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm relative z-10 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
               <div className="p-3 bg-white/20 rounded-xl"><Car className="w-6 h-6 text-white" /></div>
               <div className="flex-1">
                   <h4 className="text-lg font-black text-white">{v.make} {v.model}</h4>
                   <p className="text-sm text-slate-300 font-medium tracking-wide mt-1">{v.plate} <span className="opacity-50 mx-1">•</span> {v.color}</p>
               </div>
               <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
        ))}
      </div>

      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Account Options</h3>
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-2 mb-8">
         <motion.div whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors">
            <div className="bg-indigo-50 p-3 rounded-xl"><Clock className="w-5 h-5 text-indigo-500" /></div>
            <span className="flex-1 text-base font-bold text-slate-800">Wash History</span>
            <ChevronRight className="w-5 h-5 text-slate-300" />
         </motion.div>
         <motion.div whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors">
            <div className="bg-teal-50 p-3 rounded-xl"><CreditCard className="w-5 h-5 text-teal-500" /></div>
            <span className="flex-1 text-base font-bold text-slate-800">Payment Methods</span>
            <ChevronRight className="w-5 h-5 text-slate-300" />
         </motion.div>
         <motion.div whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors">
            <div className="bg-slate-100 p-3 rounded-xl"><Settings className="w-5 h-5 text-slate-600" /></div>
            <span className="flex-1 text-base font-bold text-slate-800">Settings</span>
            <ChevronRight className="w-5 h-5 text-slate-300" />
         </motion.div>
         <motion.div onClick={() => showLegal?.('Privacy Policy')} whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors">
            <div className="bg-rose-50 p-3 rounded-xl"><FileText className="w-5 h-5 text-rose-500" /></div>
            <span className="flex-1 text-base font-bold text-slate-800">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-slate-300" />
         </motion.div>
      </div>
      
      <div className="mt-8 mb-4">
         <motion.button onClick={handleSignOut} whileTap={{ scale: 0.98 }} className="w-full bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-center gap-2 text-rose-500 font-bold active:bg-rose-100 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
         </motion.button>
      </div>
    </motion.div>
  );
}
