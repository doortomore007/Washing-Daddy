import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '../firebase';
import { Phone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export function LoginScreen({ onLoginSuccess, onGoLegal }: { onLoginSuccess: () => void, onGoLegal: (title: string) => void }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved
        }
      });
    }
  }, []);

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`; // Defaulting to +91
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setStep('OTP');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    if (!confirmationResult) return;
    setIsLoading(true);
    setError('');
    try {
      await confirmationResult.confirm(otp);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#fafcff] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center mb-2">Welcome Back</h1>
        <p className="text-slate-500 text-center mb-8 font-medium">Log in to manage your daily car care.</p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm font-bold mb-6 text-center border border-rose-100">
            {error}
          </div>
        )}

        <div id="recaptcha-container"></div>

        {step === 'PHONE' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 font-bold transition-all shadow-sm font-sans"
                />
              </div>
            </div>
            
            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black tracking-widest uppercase text-sm shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get OTP'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Enter OTP</label>
              <div className="relative">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 font-bold tracking-widest text-center text-xl transition-all shadow-sm font-sans"
                />
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-widest uppercase text-sm shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Log In'}
            </button>

            <button
              onClick={() => setStep('PHONE')}
              className="w-full py-3 text-slate-500 font-bold text-sm"
            >
              Back to Phone Number
            </button>
          </motion.div>
        )}

        {/* Developer Bypass */}
        <div className="mt-6 pt-6 border-t border-slate-100 mb-2">
          <button
            onClick={onLoginSuccess}
            className="w-full py-3 bg-slate-100 text-slate-500 rounded-2xl font-bold tracking-widest uppercase text-xs active:scale-95 transition-all"
          >
            Skip Login (Dev Mode)
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 font-medium">
          By continuing, you agree to our <br />
          <button onClick={() => onGoLegal('Terms of Service')} className="font-bold text-indigo-500">Terms of Service</button> & <button onClick={() => onGoLegal('Privacy Policy')} className="font-bold text-indigo-500">Privacy Policy</button>
        </div>
      </motion.div>
    </div>
  );
}

// Add declaration for window.recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
