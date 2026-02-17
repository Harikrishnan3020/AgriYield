
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    Eye, EyeOff, Lock, User, ArrowRight,
    Leaf, ShieldCheck,
    Globe, TrendingUp, Smartphone, UploadCloud, Hexagon,
    Star, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

// --- Premium 3D & Holographic Scenes ---

const HolographicScan = () => {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center perspective-1000">
            {/* 3D Scanning Base */}
            <motion.div
                className="absolute inset-x-0 bottom-10 h-32 bg-gradient-to-t from-emerald-500/20 to-transparent blur-2xl transform-gpu rotate-x-60"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* DNA Helix Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-40 h-40 border border-emerald-500/30 rounded-full"
                        style={{ rotateX: 60, rotateY: i * 22.5 }}
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                    />
                ))}
            </div>

            {/* Central Leaf Hologram */}
            <motion.div
                className="relative z-10 text-emerald-400 filter drop-shadow-[0_0_25px_rgba(52,211,153,0.6)]"
                animate={{
                    y: [0, -15, 0],
                    rotateY: [0, 10, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <Leaf className="w-40 h-40 opacity-90 stroke-[0.5]" />
                <Leaf className="w-40 h-40 absolute inset-0 opacity-40 blur-md text-emerald-200" strokeWidth={0.5} />

                {/* Glitch Effect */}
                <motion.div
                    className="absolute inset-0 bg-emerald-400/20 mix-blend-overlay"
                    animate={{ clipPath: ["inset(0 0 0 0)", "inset(10% 0 80% 0)", "inset(0 0 0 0)"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
            </motion.div>

            {/* Scanning Laser Beam */}
            <motion.div
                className="absolute w-full h-2 bg-emerald-400/80 shadow-[0_0_30px_rgba(52,211,153,1)] z-20"
                initial={{ top: "0%", scaleX: 1.2, opacity: 0 }}
                animate={{ top: ["10%", "90%", "10%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Analysis Data */}
            <div className="absolute top-0 right-0 space-y-2">
                {[98, 99, 95].map((val, i) => (
                    <motion.div
                        key={i}
                        className="bg-black/60 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded text-[10px] text-emerald-400 font-mono flex items-center gap-2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        SCAN_0{i + 1}: {val}% MATCH
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const GlobalMarket = () => {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Digital Globe Skeleton */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent blur-3xl animate-pulse" />

            <motion.div
                className="relative z-10 w-48 h-48 rounded-full border border-amber-500/20 grid grid-cols-6 grid-rows-6 overflow-hidden perspective-1000"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(36)].map((_, i) => (
                    <div key={i} className="border border-amber-500/10 bg-amber-500/5" />
                ))}

                {/* Simulated Continents */}
                <Globe className="absolute inset-0 w-full h-full text-amber-500/40 p-2" strokeWidth={0.5} />
            </motion.div>

            {/* Orbital Trade Routes */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 border border-dashed border-amber-500/30 rounded-full"
                    style={{ rotateX: 70 + i * 10, scale: 1.2 + i * 0.3 }}
                    animate={{ rotateZ: [0, 360] }}
                    transition={{ duration: 20 - i * 5, repeat: Infinity, ease: "linear" }}
                />
            ))}

            {/* Floating Market Tickers */}
            {[
                { label: "WHEAT", val: "+2.4%", x: -80, y: -60 },
                { label: "RICE", val: "+1.2%", x: 80, y: 40 },
                { label: "CORN", val: "-0.5%", x: -60, y: 70 },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-black/80 border border-amber-500/40 px-3 py-1.5 rounded-lg flex flex-col items-center shadow-lg backdrop-blur-sm"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: item.x, y: item.y, opacity: 1 }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                >
                    <span className="text-[10px] text-amber-500/70 font-bold tracking-wider">{item.label}</span>
                    <span className={`text-xs font-mono font-bold ${item.val.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {item.val}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

const ConnectedCommunity = () => {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center perspective-1000">
            {/* Rippling Hex Grid */}
            <div className="absolute inset-0 grid grid-cols-4 gap-2 opacity-30">
                {[...Array(16)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-500/10"
                        animate={{
                            scale: [1, 0.9, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Central Hub */}
            <div className="relative z-20">
                <motion.div
                    className="w-28 h-28 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.6)] border border-white/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Hexagon className="w-16 h-16 text-white/90" strokeWidth={1} />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <Star className="w-10 h-10 text-white fill-white" />
                </div>
            </div>

            {/* Connecting User Nodes */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
                <motion.div
                    key={i}
                    className="absolute w-36 h-1 bg-gradient-to-r from-purple-500 to-transparent origin-left z-10"
                    style={{ rotate: deg, left: "50%", top: "50%" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-900 border border-purple-400 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-4 h-4 text-purple-200" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const SecurityShield = () => {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Active Force Fields */}
            {[1.2, 1.5, 1.8].map((scale, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-blue-500/20 rounded-full"
                    animate={{
                        scale: [scale, scale + 0.1, scale],
                        opacity: [0.3, 0, 0.3],
                        rotate: i % 2 === 0 ? 360 : -360
                    }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full blur-sm" />
                </motion.div>
            ))}

            {/* Main Shield Hologram */}
            <motion.div
                className="relative z-10 w-48 h-48"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <svg viewBox="0 0 24 24" className="w-full h-full text-blue-500/30 fill-blue-500/10 stroke-[0.5]" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Lock className="w-16 h-16 text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.8)]" />
                    </motion.div>
                </div>

                {/* Scanning Light sweep */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/20 to-transparent"
                    animate={{ left: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ clipPath: "path('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z')" }}
                />
            </motion.div>

            {/* Blockchain verification particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                >
                    <div className="absolute top-0 w-1 h-8 bg-blue-400/50 rounded-full blur-[1px]" />
                </motion.div>
            ))}
        </div>
    );
};

// --- Spotlight Card Effect ---
const SpotlightToogle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-gray-900/5 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
}


// --- Main Page Component ---

const PortfolioItem = ({
    Scene,
    title,
    desc,
    color
}: {
    Scene: React.ComponentType,
    title: string,
    desc: string,
    color: string
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
    >
        <div className="mb-12 relative">
            <div className={`absolute inset-0 ${color} opacity-20 blur-[60px] rounded-full transition-colors duration-1000`}></div>
            <Scene />
        </div>

        <div className="space-y-4 max-w-lg relative z-10">
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight"
            >
                {title}
            </motion.h3>
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100px", opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className={`h-1 ${color} mx-auto rounded-full transition-colors duration-1000`}
            />
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="text-lg text-white/70 leading-relaxed font-light"
            >
                {desc}
            </motion.p>
        </div>
    </motion.div>
);

const PORTFOLIO_ITEMS = [
    {
        id: 1,
        Scene: HolographicScan,
        title: "Bio-Scanning AI",
        desc: "Instant pathogen detection using our proprietary Neural-Agri™ engine. Diagnoses crops with 99.8% accuracy in partial lighting.",
        color: "bg-emerald-500",
    },
    {
        id: 2,
        Scene: GlobalMarket,
        title: "Global Trade Network",
        desc: "Connect directly with verified industrial buyers. Real-time futures pricing and automated logistics handling.",
        color: "bg-amber-500",
    },
    {
        id: 3,
        Scene: ConnectedCommunity,
        title: "Elite Farmer's League",
        desc: "Join the top 1% of cultivators. Compete in regional yield leaderboards and unlock exclusive government grants.",
        color: "bg-purple-500",
    },
    {
        id: 4,
        Scene: SecurityShield,
        title: "CropShield™ Protection",
        desc: "Blockchain-verified insurance coverage. Parametric payouts triggered automatically by satellite weather data.",
        color: "bg-blue-500",
    }
];

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAppStore();
    const [showPassword, setShowPassword] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    // Form State
    const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
    const [contact, setContact] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateContact = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Simple international phone regex
        // or stricter: /^\d{10}$/ for 10 digit

        return emailRegex.test(value) || phoneRegex.test(value);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contact || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!validateContact(contact)) {
            toast.error("Please enter a valid email or phone number");
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            toast.success(`OTP sent to ${contact}`);
            // In a real app, you would trigger the backend to send the OTP here
        }, 1500);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setIsLoading(true);

        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);
            if (otp === "123456") { // Mock check
                login(contact);
                toast.success("Login successful!");
                navigate("/dashboard");
            } else {
                toast.error("Invalid OTP. Please try again.");
                setOtp("");
            }
        }, 1500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full flex bg-background overflow-hidden relative font-sans selection:bg-emerald-500/30">

            {/* Left: Login Form (Glassmorphism + Spotlight) */}
            <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-6 lg:p-12">
                <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <SpotlightToogle className="rounded-3xl border border-white/20 shadow-2xl backdrop-blur-3xl bg-white/60 dark:bg-black/40 p-8 md:p-12">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">AgriYield</span>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
                                {step === 'credentials' ? "Welcome Back" : "Verify Identity"}
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                {step === 'credentials'
                                    ? "Secure access to your agricultural command center."
                                    : "Enter the code sent to your device to continue."}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 'credentials' ? (
                                <motion.form
                                    key="credentials-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSendOtp}
                                    className="space-y-6 relative z-20"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Email or Phone</Label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-emerald-600 transition-colors" />
                                            <Input
                                                id="contact"
                                                placeholder="name@example.com / +1234567890"
                                                className="pl-10 h-12 bg-white/50 border-gray-200/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300"
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                to="/forgot-password"
                                                className="text-xs font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-emerald-600 transition-colors" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 h-12 bg-white/50 border-gray-200/50 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3.5 text-muted-foreground hover:text-emerald-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <Button
                                            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/20 rounded-xl transition-all"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Sending OTP..." : "Continue"} <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </motion.div>

                                    <div className="relative my-8">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                            <span className="bg-white px-4 text-muted-foreground font-medium">
                                                Alternative Access
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button type="button" variant="outline" className="h-11 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors">
                                            <Smartphone className="w-4 h-4 mr-2 text-emerald-600" /> Mobile OTP
                                        </Button>
                                        <Button type="button" variant="outline" className="h-11 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors">
                                            <UploadCloud className="w-4 h-4 mr-2 text-emerald-600" /> Passkey
                                        </Button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="otp-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleVerifyOtp}
                                    className="space-y-6 relative z-20 flex flex-col items-center"
                                >
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            We've sent a 6-digit code to <br />
                                            <span className="font-semibold text-gray-900">{contact}</span>
                                        </p>
                                    </div>

                                    <div className="space-y-2 flex flex-col items-center">
                                        <Label htmlFor="otp" className="sr-only">One-Time Password</Label>
                                        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Enter the code 123456 to continue
                                        </p>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                                        <Button
                                            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/20 rounded-xl transition-all"
                                            type="submit"
                                            disabled={isLoading || otp.length < 6}
                                        >
                                            {isLoading ? "Verifying..." : "Verify & Login"}
                                        </Button>
                                    </motion.div>

                                    <button
                                        type="button"
                                        onClick={() => setStep('credentials')}
                                        className="text-sm text-emerald-600 hover:underline mt-4"
                                    >
                                        Back to login
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </SpotlightToogle>

                    <p className="text-center mt-8 text-sm text-muted-foreground">
                        Don't have an account? <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Apply for Access</Link>
                    </p>
                </motion.div>
            </div>

            {/* Right: Premium Animation Portfolio */}
            <div className="hidden lg:block lg:w-1/2 relative bg-[#050505] overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0">
                    {/* Gradient Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.4, 0.3],
                            left: ["10%", "20%", "10%"]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[60px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            opacity: [0.3, 0.4, 0.3],
                            right: ["10%", "20%", "10%"]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[60px]"
                    />

                    {/* Noise Overlay for Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                </div>

                {/* Content Container */}
                <div className="relative h-full flex items-center justify-center p-12 z-10">
                    <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">

                        {/* Main Carousel */}
                        <div className="w-full h-full flex items-center justify-center perspective-1000">
                            <AnimatePresence>
                                <PortfolioItem
                                    key={PORTFOLIO_ITEMS[activeSlide].id}
                                    {...PORTFOLIO_ITEMS[activeSlide]}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Progress / Navigation */}
                        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center space-x-4 z-20">
                            {PORTFOLIO_ITEMS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className="group relative py-4"
                                >
                                    <div className={`h-1 rounded-full transition-all duration-500 ease-out ${index === activeSlide ? "w-12 bg-white" : "w-2 bg-white/20 group-hover:bg-white/40"
                                        }`} />
                                    {index === activeSlide && (
                                        <motion.div layoutId="activeGlow" className="absolute inset-0 bg-white/30 blur-md -z-10" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
