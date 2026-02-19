import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    CheckCircle2,
    Sprout,
    TrendingUp,
    IndianRupee,
    AlertCircle,
    Loader2,
    ScanLine,
    Leaf,
    MapPin,
    CloudSun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppStore } from "@/store/useAppStore";

interface SuitableCrop {
    name: string;
    match: string;
    yield: string;
    profit: string;
    duration: string;
}

interface Financials {
    estimatedCost: string;
    estimatedRevenue: string;
    projectedProfit: string;
    roi: string;
}

interface AnalysisResult {
    soilType: string;
    phLevel: string;
    organicCarbon: string;
    suitableCrops: SuitableCrop[];
    tricks: string[];
    financials: Financials;
}

const LandAnalysis = () => {
    const navigate = useNavigate();
    const { user } = useAppStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [location, setLocation] = useState<string>("Detecting location...");
    const [weather, setWeather] = useState<string>("Sunny, 28°C");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Display coordinates as we don't have a reverse geocoding API key
                    setLocation(`${position.coords.latitude.toFixed(4)}° N, ${position.coords.longitude.toFixed(4)}° E`);
                    setWeather("Partly Cloudy, 30°C");
                },
                (error) => {
                    console.error(error);
                    setLocation("Location Access Denied");
                }
            );
        } else {
            setLocation("Location Unavailable");
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setAnalysisResult(null); // Reset previous result
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        // Simulate analysis delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mock Result Data
        setAnalysisResult({
            soilType: "Alluvial / Loamy Soil",
            phLevel: "6.8 (Optimal)",
            organicCarbon: "High (0.75%)",
            suitableCrops: [
                { name: "Paddy (Rice)", match: "98%", yield: "2.5-3 tons/acre", profit: "High", duration: "120-150 days" },
                { name: "Sugarcane", match: "92%", yield: "40-50 tons/acre", profit: "High", duration: "10-12 months" },
                { name: "Groundnut", match: "85%", yield: "1.5-2 tons/acre", profit: "Medium", duration: "100-120 days" }
            ],
            tricks: [
                "Implement laser land leveling for water efficiency.",
                "Use Azospirillum bio-fertilizer for nitrogen fixation.",
                "Regular monitoring for stem borer pests is advised."
            ],
            financials: {
                estimatedCost: "₹28,000 / acre",
                estimatedRevenue: "₹75,000 / acre",
                projectedProfit: "₹47,000 / acre",
                roi: "168%"
            }
        });
        setIsAnalyzing(false);
        toast.success("Land analysis complete!");
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-slate-900">
            {/* Weather Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-58f26c07174b?q=80&w=1000&auto=format&fit=crop')",
                }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/80 to-slate-50/95" />

            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white/50 hover:bg-white/80">
                        <ArrowLeft className="w-5 h-5 text-slate-700" />
                    </Button>
                    <h1 className="text-xl font-bold text-slate-900">Land Analysis</h1>
                </div>
                <div className="flex flex-col items-end text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {location}
                    </div>
                    <div className="flex items-center gap-1">
                        <CloudSun className="w-3 h-3 text-amber-500" />
                        {weather}
                    </div>
                </div>
            </motion.header>

            <div className="max-w-2xl mx-auto p-4 space-y-6 relative z-10">

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg text-center space-y-4"
                >
                    <div className="border-2 border-dashed border-emerald-500/30 bg-emerald-50/30 rounded-2xl p-8 transition-all hover:bg-emerald-50/50 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                        {selectedImage ? (
                            <div className="relative">
                                <img src={selectedImage} alt="Land" className="w-full h-64 object-cover rounded-xl shadow-md transform group-hover:scale-[1.01] transition-transform" />
                                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Change Photo</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-6">
                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                                    <Upload className="w-10 h-10 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-lg mb-1">Upload Land Photo</p>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Take a clear picture of your soil/farm for AI-powered analysis.</p>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {selectedImage && !analysisResult && (
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full rounded-2xl py-6 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 text-white font-bold"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Analyzing Soil & Geography...
                                </>
                            ) : (
                                <>
                                    <ScanLine className="w-5 h-5 mr-2" />
                                    Generate Report
                                </>
                            )}
                        </Button>
                    )}
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {analysisResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 pb-20"
                        >
                            {/* Summary Card */}
                            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <p className="text-emerald-100 font-medium mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Analysis Complete</p>
                                            <h2 className="text-3xl font-bold tracking-tight">{analysisResult.soilType}</h2>
                                        </div>
                                        <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md shadow-sm border border-white/10">
                                            <Sprout className="w-8 h-8 text-emerald-100" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-md border border-white/10">
                                            <span>pH: <strong>{analysisResult.phLevel}</strong></span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-md border border-white/10">
                                            <span>Organic C: <strong>{analysisResult.organicCarbon}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Crop Recommendations */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 px-1">
                                    <Leaf className="w-5 h-5 text-emerald-600" /> Best Suitable Crops
                                </h3>
                                <div className="space-y-3">
                                    {analysisResult.suitableCrops.map((crop: SuitableCrop, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col gap-3"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 shadow-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-lg">{crop.name}</h4>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-slate-500">Match:</span>
                                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: crop.match }}></div>
                                                            </div>
                                                            <span className="text-emerald-600 font-bold">{crop.match}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                                                        {crop.profit} Profit
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                                                <div>
                                                    <span className="text-slate-400 block mb-0.5">Exp. Yield</span>
                                                    <span className="font-semibold text-slate-700">{crop.yield}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block mb-0.5">Duration</span>
                                                    <span className="font-semibold text-slate-700">{crop.duration}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Financial Analysis */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5 text-blue-600" /> Financial Projection
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-red-50/80 rounded-2xl border border-red-100">
                                        <p className="text-xs text-red-500 uppercase font-bold tracking-wider mb-1">Costs</p>
                                        <p className="text-lg font-bold text-red-700">{analysisResult.financials.estimatedCost}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                                        <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-1">Revenue</p>
                                        <p className="text-lg font-bold text-emerald-700">{analysisResult.financials.estimatedRevenue}</p>
                                    </div>
                                    <div className="col-span-2 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-1">Net Profit Potential</p>
                                            <p className="text-2xl font-bold text-blue-700">{analysisResult.financials.projectedProfit}</p>
                                            <p className="text-xs text-blue-400 mt-1">ROI: {analysisResult.financials.roi}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <TrendingUp className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Yield Tricks */}
                            <div className="bg-amber-50/90 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-sm">
                                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-600" /> Yield Maximization Tricks
                                </h3>
                                <ul className="space-y-4">
                                    {analysisResult.tricks.map((trick: string, i: number) => (
                                        <li key={i} className="flex gap-3 text-amber-900 text-sm">
                                            <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {i + 1}
                                            </span>
                                            <span className="pt-0.5">{trick}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default LandAnalysis;
