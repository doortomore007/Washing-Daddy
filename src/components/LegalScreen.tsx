import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function LegalScreen({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-[#fafcff]"
    >
      <div className="flex items-center gap-4 p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 pt-8">
        <button onClick={onBack} className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100">
           <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-black text-slate-800">{title}</h1>
      </div>

      <div className="p-6 overflow-y-auto pb-32 text-slate-600 font-medium space-y-4 text-sm leading-relaxed">
        <p><strong>Last Updated: January 2025</strong></p>
        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-2">1. Introduction</h2>
        <p>Welcome to Washing Daddy. These terms cover your usage of our daily car wash and tracking services. By using the app, you agree to these legal terms.</p>
        
        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-2">2. Subscriptions</h2>
        <p>Subscriptions are billed monthly and renew automatically unless canceled. You must cancel at least 24 hours before the billing cycle to avoid the next charge.</p>
        
        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-2">3. Service Limitations</h2>
        <p>Washes are subject to weather conditions and washer availability. Washers may refuse service if your vehicle presents unsafe conditions.</p>

        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-2">4. Privacy & Data</h2>
        <p>We use GPS to track your car's location only when you schedule a service or during an active wash session to guide our washers.</p>
        
        <h2 className="text-lg font-bold text-slate-800 mt-6 mb-2">5. Liability</h2>
        <p>Our washer partners are trained professionals, but in the rare event of incidental damage, contact support within 24 hours of the wash completion.</p>

        <p className="mt-8 text-center text-slate-400">Questions? Contact support@washingdaddy.com</p>
      </div>
    </motion.div>
  );
}
