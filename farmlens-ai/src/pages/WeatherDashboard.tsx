import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Cloud,
    CloudRain,
    Sun,
    Wind,
    Droplets,
    Eye,
    Gauge,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle2,
    Leaf,
    Sprout,
    Calendar,
    MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";

interface WeatherData {
    current: {
        temp: number;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
        pressure: number;
        visibility: number;
        condition: string;
        icon: any;
    };
    forecast: Array<{
        day: string;
        temp: { high: number; low: number };
        condition: string;
        rainChance: number;
        icon: any;
    }>;
    farmingAdvice: Array<{
        title: string;
        status: "safe" | "warning" | "danger";
        description: string;
        icon: any;
    }>;
}

const WeatherDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAppStore();

    // Mock weather data (in production, this would come from a weather API)
    const [weatherData] = useState<WeatherData>({
        current: {
            temp: 28,
            feelsLike: 31,
            humidity: 70,
            windSpeed: 12,
            pressure: 1013,
            visibility: 10,
            condition: "Partly Cloudy",
            icon: Cloud,
        },
        forecast: [
            { day: "Today", temp: { high: 32, low: 24 }, condition: "Sunny", rainChance: 10, icon: Sun },
            {
                day: "Tomorrow",
                temp: { high: 30, low: 23 },
                condition: "Cloudy",
                rainChance: 40,
                icon: Cloud,
            },
            {
                day: "Wed",
                temp: { high: 28, low: 22 },
                condition: "Rainy",
                rainChance: 80,
                icon: CloudRain,
            },
            { day: "Thu", temp: { high: 29, low: 23 }, condition: "Cloudy", rainChance: 50, icon: Cloud },
            { day: "Fri", temp: { high: 31, low: 24 }, condition: "Sunny", rainChance: 20, icon: Sun },
            { day: "Sat", temp: { high: 32, low: 25 }, condition: "Sunny", rainChance: 10, icon: Sun },
            { day: "Sun", temp: { high: 30, low: 24 }, condition: "Cloudy", rainChance: 30, icon: Cloud },
        ],
        farmingAdvice: [
            {
                title: "Irrigation",
                status: "warning",
                description: "Reduce watering today. Rain expected in 2 days.",
                icon: Droplets,
            },
            {
                title: "Pesticide Application",
                status: "safe",
                description: "Good conditions for spraying. Low wind, no rain expected.",
                icon: Sprout,
            },
            {
                title: "Fertilizer",
                status: "warning",
                description: "Wait 2-3 days. Heavy rain may wash away nutrients.",
                icon: Leaf,
            },
            {
                title: "Fungal Disease Risk",
                status: "danger",
                description: "High humidity increases blight risk. Monitor crops closely.",
                icon: AlertTriangle,
            },
        ],
    });

    const getStatusColor = (status: "safe" | "warning" | "danger") => {
        switch (status) {
            case "safe":
                return "bg-green-100 text-green-700 border-green-200";
            case "warning":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "danger":
                return "bg-red-100 text-red-700 border-red-200";
        }
    };

    const getStatusIcon = (status: "safe" | "warning" | "danger") => {
        switch (status) {
            case "safe":
                return CheckCircle2;
            case "warning":
            case "danger":
                return AlertTriangle;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
            >
                <div className="px-4 py-4 flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/dashboard")}
                        className="rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-gray-900">Weather Dashboard</h1>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {user?.location || "Your Location"}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Cloud className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
            </motion.header>

            <div className="px-4 py-6 space-y-6 pb-24">
                {/* Current Weather */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <GlassCard className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white overflow-hidden relative">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
                        </div>

                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <p className="text-sm opacity-90 mb-1">Now</p>
                                    <h2 className="text-5xl font-bold mb-2">{weatherData.current.temp}°</h2>
                                    <p className="text-lg opacity-90">{weatherData.current.condition}</p>
                                    <p className="text-sm opacity-75 mt-1">
                                        Feels like {weatherData.current.feelsLike}°
                                    </p>
                                </div>
                                <weatherData.current.icon className="w-20 h-20 opacity-80" />
                            </div>

                            {/* Weather Metrics Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Droplets className="w-4 h-4" />
                                        <span className="text-xs opacity-80">Humidity</span>
                                    </div>
                                    <p className="text-lg font-bold">{weatherData.current.humidity}%</p>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Wind className="w-4 h-4" />
                                        <span className="text-xs opacity-80">Wind</span>
                                    </div>
                                    <p className="text-lg font-bold">{weatherData.current.windSpeed} km/h</p>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Gauge className="w-4 h-4" />
                                        <span className="text-xs opacity-80">Pressure</span>
                                    </div>
                                    <p className="text-lg font-bold">{weatherData.current.pressure} mb</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* 7-Day Forecast */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        7-Day Forecast
                    </h3>
                    <GlassCard>
                        <div className="divide-y divide-gray-100">
                            {weatherData.forecast.map((day, index) => (
                                <motion.div
                                    key={day.day}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                            <day.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{day.day}</p>
                                            <p className="text-xs text-gray-500">{day.condition}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-sm">
                                            <CloudRain className="w-4 h-4 text-blue-500" />
                                            <span className="text-blue-600 font-medium">{day.rainChance}%</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4 text-red-500" />
                                            <span className="font-bold text-gray-900">{day.temp.high}°</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingDown className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium text-gray-600">{day.temp.low}°</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Farming Advice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        Smart Farming Advice
                    </h3>
                    <div className="space-y-3">
                        {weatherData.farmingAdvice.map((advice, index) => {
                            const StatusIcon = getStatusIcon(advice.status);
                            const IconComponent = advice.icon;

                            return (
                                <motion.div
                                    key={advice.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + 0.1 * index }}
                                >
                                    <GlassCard className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getStatusColor(
                                                    advice.status
                                                )}`}
                                            >
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900">{advice.title}</h4>
                                                    <span
                                                        className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                                                            advice.status
                                                        )}`}
                                                    >
                                                        <StatusIcon className="w-3 h-3" />
                                                        {advice.status === "safe"
                                                            ? "Safe"
                                                            : advice.status === "warning"
                                                                ? "Caution"
                                                                : "Alert"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{advice.description}</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <GlassCard className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <Eye className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">💡 Pro Tip</h4>
                                <p className="text-sm text-gray-700">
                                    Enable weather notifications to get alerts about sudden changes that may affect
                                    your crops. Check back daily for updated farming recommendations!
                                </p>
                                <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9">
                                    Enable Notifications
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
};

export default WeatherDashboard;
