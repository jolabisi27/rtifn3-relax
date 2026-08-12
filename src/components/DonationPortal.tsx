import React, { useState } from 'react';
import {
  Heart,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Download,
  Share2,
  Globe,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  Smartphone,
  ExternalLink,
  Award,
  AlertCircle,
  QrCode,
  DollarSign
} from 'lucide-react';

interface DonationPortalProps {
  onGoHome?: () => void;
}

export const DonationPortal: React.FC<DonationPortalProps> = ({ onGoHome }) => {
  // Currency & Amounts State
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP' | 'EUR'>('NGN');
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('10000');
  const [donationFrequency, setDonationFrequency] = useState<'one-time' | 'monthly'>('one-time');

  // Gateway Selector: 'paystack' | 'card' | 'paypal' | 'bank_transfer'
  const [paymentGateway, setPaymentGateway] = useState<'paystack' | 'card' | 'paypal' | 'bank_transfer'>('paystack');

  // Donor Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateOrCountry, setStateOrCountry] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [campaignCategory, setCampaignCategory] = useState('General Grassroots Campaign Fund');
  const [donorMessage, setDonorMessage] = useState('');

  // Card Form State (for direct card entry option)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Transfer & USSD Bank Selector
  const [selectedBank, setSelectedBank] = useState('GTBank');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);

  // Flow & Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [completedReceipt, setCompletedReceipt] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Presets config
  const NGN_PRESETS = [5000, 10000, 25000, 50000, 100000, 500000, 1000000];
  const FOREIGN_PRESETS = [25, 50, 100, 250, 500, 1000, 5000];

  const presets = currency === 'NGN' ? NGN_PRESETS : FOREIGN_PRESETS;

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'NGN': return '₦';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '₦';
    }
  };

  const getActiveAmount = (): number => {
    if (customAmount && !isNaN(Number(customAmount)) && Number(customAmount) > 0) {
      return Number(customAmount);
    }
    return selectedPreset;
  };

  const formattedAmount = (): string => {
    const amt = getActiveAmount();
    return `${getCurrencySymbol(currency)}${amt.toLocaleString()}`;
  };

  // Mock Paystack, Card & PayPal Payment Trigger
  const handleInitiateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName && !isAnonymous) {
      setErrorMessage('Please enter your full name or check "Donate anonymously".');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address to receive your official donation receipt.');
      return;
    }

    const finalAmount = getActiveAmount();
    if (!finalAmount || finalAmount <= 0) {
      setErrorMessage('Please select or enter a valid donation amount.');
      return;
    }

    if (paymentGateway === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
        setErrorMessage('Please enter a valid 16-digit credit/debit card number.');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        setErrorMessage('Please provide card expiration date and CVV security code.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate Payment Gateway Network Call
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentGateway === 'card' || paymentGateway === 'paystack') {
        // Show 3D Secure / Paystack Verification OTP
        setShowOtpVerification(true);
      } else {
        // Direct complete for PayPal or Bank Transfer confirmation
        finalizeTransaction();
      }
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (!otpCode || otpCode.trim().length < 4) {
      setErrorMessage('Please enter the 6-digit OTP code sent to your phone/email (Use demo code: 123456).');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpVerification(false);
      finalizeTransaction();
    }, 1500);
  };

  const finalizeTransaction = () => {
    const refCode = `RTIFN-DON-${Math.floor(100000 + Math.random() * 900000)}`;
    const receipt = {
      reference: refCode,
      gateway: paymentGateway.toUpperCase(),
      amount: formattedAmount(),
      currency,
      donorName: isAnonymous ? 'Anonymous Campaign Benefactor' : fullName,
      email,
      phone: phone || 'N/A',
      category: campaignCategory,
      frequency: donationFrequency,
      date: new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium'
      }),
      message: donorMessage || 'Thank you for standing with RTIFN 2027!'
    };
    setCompletedReceipt(receipt);
  };

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleCopyUssd = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedUssd(true);
    setTimeout(() => setCopiedUssd(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top Campaign Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-lime-300">
            <Heart className="w-80 h-80" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/50 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official RTIFN 2027 Campaign Fund</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Power The Movement — Donate Today
              </h1>
              <p className="text-emerald-200 text-sm sm:text-base leading-relaxed">
                Your financial contribution fuels grassroots mobilization, voter registration drives, polling unit defense, and national campaign logistics across all 36 States & FCT.
              </p>
            </div>

            <div className="bg-emerald-950/80 border border-emerald-700/80 p-5 rounded-2xl space-y-3 shrink-0 text-center md:text-right">
              <div className="text-xs text-emerald-300 font-semibold uppercase">Total Campaign Goal</div>
              <div className="text-2xl sm:text-3xl font-black text-lime-300">₦342,850,000</div>
              <div className="text-xs text-emerald-400 font-mono">Raised of ₦500,000,000 Target (68.5%)</div>
              <div className="w-full bg-emerald-900 h-2.5 rounded-full overflow-hidden border border-emerald-700">
                <div className="bg-gradient-to-r from-lime-400 to-emerald-400 h-full w-[68.5%] rounded-full animate-pulse"></div>
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">12,480+ Global Citizens Donated</div>
            </div>
          </div>
        </div>

        {/* Main Donation Gateway Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left / Primary Form Column */}
          <div className="lg:col-span-8 bg-emerald-950/80 border border-emerald-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">

            {errorMessage && (
              <div className="p-4 bg-rose-900/60 border border-rose-500/80 rounded-2xl text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Currency & Amount Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-lime-400 text-emerald-950 font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                    Donation Amount
                  </h2>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center bg-emerald-900 p-1 rounded-xl border border-emerald-700">
                  {(['NGN', 'USD', 'GBP', 'EUR'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        setCurrency(curr);
                        setCustomAmount(curr === 'NGN' ? '10000' : '50');
                        setSelectedPreset(0);
                      }}
                      className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        currency === curr
                          ? 'bg-lime-400 text-emerald-950 shadow-md'
                          : 'text-emerald-300 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* One-time vs Monthly Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDonationFrequency('one-time')}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    donationFrequency === 'one-time'
                      ? 'bg-lime-400/20 text-lime-300 border-lime-400 shadow-md'
                      : 'bg-emerald-900/50 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>One-Time Donation</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDonationFrequency('monthly')}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    donationFrequency === 'monthly'
                      ? 'bg-lime-400/20 text-lime-300 border-lime-400 shadow-md'
                      : 'bg-emerald-900/50 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Monthly Sustaining Partner</span>
                </button>
              </div>

              {/* Amount Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-emerald-300">
                  Enter Donation Amount ({getCurrencySymbol(currency)})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-lime-400">
                    {getCurrencySymbol(currency)}
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPreset(0);
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white font-bold text-lg placeholder-emerald-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                  />
                </div>
              </div>

              {/* Target Fund Allocation */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-emerald-300">
                  Allocate Your Fund To:
                </label>
                <select
                  value={campaignCategory}
                  onChange={(e) => setCampaignCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-lime-400"
                >
                  <option value="General Grassroots Campaign Fund">General Grassroots Campaign Fund</option>
                  <option value="Polling Unit Agents & Election Defense">Polling Unit Agents & Election Defense</option>
                  <option value="National Media, Radio & Billboard Publicity">National Media, Radio & Billboard Publicity</option>
                  <option value="Volunteer Field Kits & T-Shirts">Volunteer Field Kits & Logistics</option>
                  <option value="Legal Defense & Electoral Compliance">Legal Defense & Electoral Compliance</option>
                </select>
              </div>
            </div>

            {/* STEP 2: Donor Personal Details */}
            <div className="space-y-4 pt-4 border-t border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-lime-400 text-emerald-950 font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                    Donor Details
                  </h2>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-emerald-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-lime-400 border-emerald-700 focus:ring-lime-400 bg-emerald-900"
                  />
                  <span>Donate Anonymously</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1">
                    Full Name {!isAnonymous && <span className="text-rose-400">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={isAnonymous ? 'Anonymous Supporter' : fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Chief / Dr. / Alhaji / Mr. / Mrs."
                    className="w-full px-4 py-2.5 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs sm:text-sm placeholder-emerald-500 focus:outline-none focus:border-lime-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1">
                    Email Address (For Official E-Receipt) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-2.5 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs sm:text-sm placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 123 4567 or +1 202 555 0199"
                    className="w-full px-4 py-2.5 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs sm:text-sm placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1">
                    State / Country of Residence
                  </label>
                  <input
                    type="text"
                    value={stateOrCountry}
                    onChange={(e) => setStateOrCountry(e.target.value)}
                    placeholder="e.g. Lagos, Abuja, London, Houston"
                    className="w-full px-4 py-2.5 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs sm:text-sm placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1">
                  Optional Campaign Note / Message
                </label>
                <textarea
                  rows={2}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="Words of encouragement for RTIFN 2027..."
                  className="w-full px-4 py-2 bg-emerald-900/90 border border-emerald-700 rounded-xl text-white text-xs placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>
            </div>

            {/* STEP 3: Payment Gateway Selector */}
            <div className="space-y-4 pt-4 border-t border-emerald-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-lime-400 text-emerald-950 font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                  Select Payment Gateway
                </h2>
              </div>

              {/* Gateway Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Paystack */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('paystack')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                    paymentGateway === 'paystack'
                      ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-lime-400 ring-2 ring-lime-400/30'
                      : 'bg-emerald-900/40 border-emerald-800 hover:bg-emerald-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-lime-300 uppercase">Paystack</span>
                    {paymentGateway === 'paystack' && <CheckCircle2 className="w-4 h-4 text-lime-400" />}
                  </div>
                  <div className="text-[10px] text-emerald-300 leading-tight">
                    Cards, Bank Transfer, USSD, Apple Pay
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 bg-lime-400/20 text-lime-300 rounded font-bold w-fit">
                    NGN / GHS / KES
                  </span>
                </button>

                {/* Direct Card */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('card')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                    paymentGateway === 'card'
                      ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-lime-400 ring-2 ring-lime-400/30'
                      : 'bg-emerald-900/40 border-emerald-800 hover:bg-emerald-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase">Credit/Debit Card</span>
                    {paymentGateway === 'card' && <CheckCircle2 className="w-4 h-4 text-lime-400" />}
                  </div>
                  <div className="text-[10px] text-emerald-300 leading-tight">
                    Visa, Mastercard, Verve, Amex
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 bg-emerald-800 text-emerald-200 rounded font-bold w-fit">
                    Global 3D-Secure
                  </span>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('paypal')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                    paymentGateway === 'paypal'
                      ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-lime-400 ring-2 ring-lime-400/30'
                      : 'bg-emerald-900/40 border-emerald-800 hover:bg-emerald-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-300 uppercase">PayPal</span>
                    {paymentGateway === 'paypal' && <CheckCircle2 className="w-4 h-4 text-lime-400" />}
                  </div>
                  <div className="text-[10px] text-emerald-300 leading-tight">
                    PayPal Express & Overseas Cards
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 bg-sky-900/60 text-sky-300 rounded font-bold w-fit">
                    USD / GBP / EUR
                  </span>
                </button>

                {/* Bank Direct / USSD */}
                <button
                  type="button"
                  onClick={() => setPaymentGateway('bank_transfer')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                    paymentGateway === 'bank_transfer'
                      ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-lime-400 ring-2 ring-lime-400/30'
                      : 'bg-emerald-900/40 border-emerald-800 hover:bg-emerald-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300 uppercase">Bank / USSD</span>
                    {paymentGateway === 'bank_transfer' && <CheckCircle2 className="w-4 h-4 text-lime-400" />}
                  </div>
                  <div className="text-[10px] text-emerald-300 leading-tight">
                    Instant Bank Transfer & Quick USSD
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-900/60 text-amber-300 rounded font-bold w-fit">
                    Nigeria Banks
                  </span>
                </button>
              </div>

              {/* Dynamic Gateway Form Details */}
              {paymentGateway === 'paystack' && (
                <div className="p-4 bg-emerald-900/50 border border-emerald-700/80 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-lime-400" />
                      <span className="text-xs font-bold text-white">Paystack Inline Gateway</span>
                    </div>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                      SSL Certified 256-Bit
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Clicking "Pay with Paystack" will launch Paystack's secure checkout. Supports Nigerian Debit Cards, Bank Transfers, USSD (*737*, *919*), and Apple Pay.
                  </p>
                </div>
              )}

              {paymentGateway === 'card' && (
                <div className="p-4 bg-emerald-900/50 border border-emerald-700/80 rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Direct Credit / Debit Card Entry</span>
                    <span className="text-[10px] font-mono text-lime-300">PCI-DSS Compliant</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="As shown on card"
                        className="w-full px-3 py-2 bg-emerald-950 border border-emerald-700 rounded-lg text-white text-xs focus:border-lime-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          setCardNumber(val.replace(/(.{4})/g, '$1 ').trim());
                        }}
                        placeholder="5399 0000 0000 0000"
                        className="w-full px-3 py-2 bg-emerald-950 border border-emerald-700 rounded-lg text-white font-mono text-xs focus:border-lime-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                        Expiration (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/28"
                        className="w-full px-3 py-2 bg-emerald-950 border border-emerald-700 rounded-lg text-white text-xs font-mono focus:border-lime-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                        CVV Security Code
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-emerald-950 border border-emerald-700 rounded-lg text-white text-xs font-mono focus:border-lime-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentGateway === 'paypal' && (
                <div className="p-4 bg-emerald-900/50 border border-emerald-700/80 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-bold text-white">PayPal International Gateway</span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Designed for overseas diaspora and international supporters in USD, GBP, and EUR. You will be redirected to PayPal's encrypted One-Touch portal.
                  </p>
                </div>
              )}

              {paymentGateway === 'bank_transfer' && (
                <div className="p-4 bg-emerald-900/50 border border-emerald-700/80 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                    <span className="text-xs font-bold text-white">Official Campaign Account Details</span>
                    <span className="text-[10px] text-lime-300 font-mono">Central Campaign Custodian</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-800 space-y-1">
                      <div className="text-[10px] text-emerald-400 uppercase font-bold">Bank Name</div>
                      <div className="font-bold text-white">Zenith Bank Plc</div>
                      <div className="text-[10px] text-emerald-400 uppercase font-bold mt-2">Account Name</div>
                      <div className="font-bold text-lime-300">RTIFN 2027 CAMPAIGN ORGANISATION</div>
                      <div className="text-[10px] text-emerald-400 uppercase font-bold mt-2">Account Number</div>
                      <div className="flex items-center justify-between font-mono font-black text-sm text-white bg-emerald-900/80 p-2 rounded border border-emerald-700">
                        <span>1019882741</span>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount('1019882741')}
                          className="px-2 py-1 bg-lime-400 text-emerald-950 text-[10px] font-bold rounded hover:bg-lime-300"
                        >
                          {copiedAccount ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-800 space-y-2">
                      <div className="text-[10px] text-emerald-400 uppercase font-bold">Instant USSD Code</div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-emerald-300">Select Bank for Code:</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full p-1.5 bg-emerald-900 border border-emerald-700 text-white text-xs rounded"
                        >
                          <option value="GTBank">GTBank (*737*)</option>
                          <option value="Zenith">Zenith Bank (*966*)</option>
                          <option value="Access">Access Bank (*901*)</option>
                          <option value="FirstBank">First Bank (*894*)</option>
                          <option value="UBA">UBA (*919*)</option>
                        </select>
                      </div>

                      <div className="p-2 bg-emerald-900/80 rounded border border-emerald-700 font-mono text-xs text-lime-300 flex items-center justify-between">
                        <span>
                          {selectedBank === 'GTBank' && `*737*000*1019882741*${getActiveAmount()}#`}
                          {selectedBank === 'Zenith' && `*966*000*1019882741*${getActiveAmount()}#`}
                          {selectedBank === 'Access' && `*901*000*1019882741*${getActiveAmount()}#`}
                          {selectedBank === 'FirstBank' && `*894*000*1019882741*${getActiveAmount()}#`}
                          {selectedBank === 'UBA' && `*919*000*1019882741*${getActiveAmount()}#`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyUssd(`*737*000*1019882741*${getActiveAmount()}#`)}
                          className="px-2 py-0.5 bg-lime-400 text-emerald-950 text-[10px] font-bold rounded"
                        >
                          {copiedUssd ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleInitiateDonation}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 text-emerald-950 font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-lime-400/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting to {paymentGateway.toUpperCase()} Security Server...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-emerald-950" />
                    <span>Contribute {formattedAmount()} via {paymentGateway.toUpperCase()}</span>
                    <ArrowRight className="w-5 h-5 text-emerald-950" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-emerald-400 pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-lime-400" /> PCI-DSS Level 1 Gateway</span>
                <span>•</span>
                <span>Instant Official E-Receipt</span>
              </div>
            </div>

          </div>

          {/* Right Column / Live Campaign Impact & Transparency */}
          <div className="lg:col-span-4 space-y-6">

            {/* Campaign Transparency Card */}
            <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-800 pb-3">
                <Award className="w-5 h-5 text-lime-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Campaign Impact Breakdown
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-1">
                  <div className="font-bold text-lime-300">₦10,000 / $20 Donation</div>
                  <div className="text-emerald-200 text-[11px]">Funds 1 Volunteer Campaign Field Kit (Cap, T-Shirt & Handbook).</div>
                </div>

                <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-1">
                  <div className="font-bold text-lime-300">₦50,000 / $100 Donation</div>
                  <div className="text-emerald-200 text-[11px]">Sponsors 2 Polling Unit Agents for Election Day Security & Live Monitoring.</div>
                </div>

                <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-1">
                  <div className="font-bold text-lime-300">₦500,000 / $1,000 Donation</div>
                  <div className="text-emerald-200 text-[11px]">Sponsors Ward Mobilization Campaign Audio Speakers & Community Townhall.</div>
                </div>
              </div>
            </div>

            {/* Recent Supporters Live Ticker */}
            <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Donors
                  </h3>
                </div>
                <span className="text-[10px] text-lime-300 bg-emerald-900 px-2 py-0.5 rounded font-mono">Live</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-emerald-900/30 rounded-xl border border-emerald-800/60 text-xs">
                  <div>
                    <div className="font-bold text-white">Chief O. Adebayo</div>
                    <div className="text-[10px] text-emerald-400">Lagos State • Paystack Card</div>
                  </div>
                  <div className="font-black text-lime-300 text-sm">₦100,000</div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-emerald-900/30 rounded-xl border border-emerald-800/60 text-xs">
                  <div>
                    <div className="font-bold text-white">Anonymous Supporter</div>
                    <div className="text-[10px] text-emerald-400">Houston, USA • PayPal</div>
                  </div>
                  <div className="font-black text-sky-300 text-sm">$500</div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-emerald-900/30 rounded-xl border border-emerald-800/60 text-xs">
                  <div>
                    <div className="font-bold text-white">Hajia Aisha Bello</div>
                    <div className="text-[10px] text-emerald-400">Kano State • Zenith Bank</div>
                  </div>
                  <div className="font-black text-lime-300 text-sm">₦250,000</div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-emerald-900/30 rounded-xl border border-emerald-800/60 text-xs">
                  <div>
                    <div className="font-bold text-white">Dr. Emmanuel N.</div>
                    <div className="text-[10px] text-emerald-400">London, UK • Card</div>
                  </div>
                  <div className="font-black text-lime-300 text-sm">£250</div>
                </div>
              </div>
            </div>

            {/* Financial Integrity Note */}
            <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800 text-[11px] text-emerald-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Audited Campaign Custodianship</span>
              </div>
              <p className="leading-relaxed text-emerald-200">
                All campaign contributions are deposited directly into audited dedicated escrow accounts overseen by certified electoral compliance officers in full accordance with electoral laws.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* OTP Verification Modal */}
      {showOtpVerification && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-emerald-950 border-2 border-lime-400 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-lime-400/20 text-lime-300 rounded-full flex items-center justify-center mx-auto border border-lime-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase">
                3D Secure Gateway Verification
              </h3>
              <p className="text-xs text-emerald-200">
                A 6-digit authorization code has been dispatched to your registered phone/email via {paymentGateway.toUpperCase()}.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-emerald-300 text-center">
                Enter 6-Digit OTP Code (Demo Code: 123456)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest font-mono text-2xl py-3 bg-emerald-900 border-2 border-lime-400 rounded-xl text-white font-black focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowOtpVerification(false)}
                className="w-1/2 py-3 bg-emerald-900 border border-emerald-700 text-emerald-200 text-xs font-bold rounded-xl hover:bg-emerald-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isProcessing}
                className="w-1/2 py-3 bg-lime-400 text-emerald-950 text-xs font-black rounded-xl hover:bg-lime-300"
              >
                {isProcessing ? 'Verifying...' : 'Authorize Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Printable Receipt Modal */}
      {completedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            {/* Header */}
            <div className="text-center space-y-2 border-b border-emerald-800 pb-4">
              <div className="w-14 h-14 bg-lime-400 text-emerald-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Donation Confirmed!
              </h3>
              <p className="text-xs text-lime-300 font-bold">
                Official Campaign Electronic Receipt
              </p>
            </div>

            {/* Receipt Payload */}
            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-700/80 space-y-4 font-sans text-xs">
              <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
                <span className="text-emerald-300 font-semibold">Transaction Reference:</span>
                <span className="font-mono font-bold text-lime-300">{completedReceipt.reference}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-emerald-800 pb-3">
                <div>
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">Contributor</div>
                  <div className="font-bold text-white text-sm">{completedReceipt.donorName}</div>
                  <div className="text-[10px] text-emerald-300">{completedReceipt.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">Amount Paid</div>
                  <div className="font-black text-lime-300 text-lg">{completedReceipt.amount}</div>
                  <div className="text-[10px] text-emerald-300 font-mono">Gateway: {completedReceipt.gateway}</div>
                </div>
              </div>

              <div className="space-y-1 border-b border-emerald-800 pb-3">
                <div className="text-[10px] text-emerald-400 uppercase font-bold">Allocated Fund Category</div>
                <div className="font-bold text-white">{completedReceipt.category}</div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-emerald-400">Date & Time Stamp</span>
                <span className="font-mono text-emerald-200">{completedReceipt.date}</span>
              </div>
            </div>

            {/* Print & Share Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-emerald-900 border border-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCompletedReceipt(null);
                  if (onGoHome) onGoHome();
                }}
                className="flex-1 py-3 bg-lime-400 text-emerald-950 font-black text-xs rounded-xl hover:bg-lime-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Return to Campaign Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
