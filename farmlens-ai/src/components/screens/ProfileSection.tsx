import { motion } from "framer-motion";
import { User, MapPin, Award, Calendar, Camera, Edit2, History, Star, TrendingUp, Activity, Leaf, Shield, Heart, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/GlassCard";

export const ProfileSection = () => {
    const { user, updateUser, logout } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || "");
    const [newLocation, setNewLocation] = useState(user?.location || "");
    const [activeSection, setActiveSection] = useState<"overview" | "history" | "achievements">("overview");

    const handleSave = () => {
        updateUser({ name: newName, location: newLocation });
        setIsEditing(false);
    };

    if (!user) return null;

    // Mock data for scan history
    const scanHistory = [
        { id: 1, disease: "Late Blight", crop: "Tomato", date: "2 days ago", severity: "high" },
        { id: 2, disease: "Powdery Mildew", crop: "Cucumber", date: "5 days ago", severity: "medium" },
        { id: 3, disease: "Healthy Plant", crop: "Rice", date: "1 week ago", severity: "low" },
    ];

    // Mock achievements
    const achievements = [
        { id: 1, title: "First Scan", description: "Complete your first crop scan", unlocked: true, icon: "🎯" },
        { id: 2, title: "Disease Detective", description: "Identify 10 diseases", unlocked: user.scans >= 10, icon: "🔍" },
        { id: 3, title: "Healthy Farmer", description: "50+ scans completed", unlocked: user.scans >= 50, icon: "🌱" },
        { id: 4, title: "Expert Level", description: "Reach 1000 points", unlocked: user.score >= 1000, icon: "⭐" },
    ];

    return (
        <div className="p-6 pb-24 space-y-6">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <GlassCard variant="elevated" className="overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10" />

                    <div className="relative p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xl relative overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12" />
                                )}
                                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-lg bg-white text-emerald-600 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {user.location || "Unknown Location"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                                        Active Member
                                    </span>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-200 flex items-center gap-1">
                                        <Star className="w-3 h-3" /> Level {Math.floor(user.score / 500) + 1}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">{user.scans}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Scans</div>
                            </div>
                            <div className="text-center border-x border-gray-200">
                                <div className="text-2xl font-bold text-blue-600">{user.score}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Points</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{achievements.filter(a => a.unlocked).length}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Badges</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Section Tabs */}
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button
                    onClick={() => setActiveSection("overview")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeSection === "overview"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveSection("history")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeSection === "history"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    History
                </button>
                <button
                    onClick={() => setActiveSection("achievements")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeSection === "achievements"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    Badges
                </button>
            </div>

            {/* Section Content */}
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                {activeSection === "overview" && (
                    <>
                        {/* Insights */}
                        <GlassCard>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                    Your Insights
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">Scan Streak</div>
                                                <div className="text-xs text-gray-600">Active for 7 days</div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-emerald-600">7🔥</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <Leaf className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">Most Scanned</div>
                                                <div className="text-xs text-gray-600">Tomato crops</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Edit Profile Form */}
                        {isEditing ? (
                            <GlassCard>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-4 space-y-4"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Edit2 className="w-5 h-5 text-emerald-600" />
                                        Edit Profile
                                    </h3>
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Farm Location</Label>
                                        <Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                                        <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">Cancel</Button>
                                    </div>
                                </motion.div>
                            </GlassCard>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full flex items-center justify-center gap-2 h-12 rounded-xl">
                                <Edit2 className="w-4 h-4" /> Edit Profile Details
                            </Button>
                        )}

                        {/* Account Info */}
                        <GlassCard>
                            <div className="divide-y divide-gray-100">
                                <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700 font-medium">Member Since</span>
                                    </div>
                                    <span className="text-gray-900 font-semibold">{new Date(user.joinedDate).toLocaleDateString()}</span>
                                </div>
                                <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700 font-medium">Account Status</span>
                                    </div>
                                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full text-xs">Active</span>
                                </div>
                                <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700 font-medium">Settings</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </GlassCard>
                    </>
                )}

                {activeSection === "history" && (
                    <div className="space-y-3">
                        {scanHistory.map((scan, index) => (
                            <motion.div
                                key={scan.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard>
                                    <div className="p-4 flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scan.severity === "high" ? "bg-red-100" :
                                                scan.severity === "medium" ? "bg-amber-100" : "bg-green-100"
                                            }`}>
                                            <Leaf className={`w-6 h-6 ${scan.severity === "high" ? "text-red-600" :
                                                    scan.severity === "medium" ? "text-amber-600" : "text-green-600"
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{scan.disease}</h4>
                                            <p className="text-sm text-gray-600">{scan.crop} • {scan.date}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeSection === "achievements" && (
                    <div className="space-y-3">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className={achievement.unlocked ? "" : "opacity-60"}>
                                    <div className="p-4 flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${achievement.unlocked
                                                ? "bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-200"
                                                : "bg-gray-100 filter grayscale"
                                            }`}>
                                            {achievement.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                {achievement.title}
                                                {achievement.unlocked && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                                            </h4>
                                            <p className="text-sm text-gray-600">{achievement.description}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            <Button onClick={logout} variant="destructive" className="w-full h-12 rounded-xl font-medium">
                Log Out
            </Button>
        </div>
    );
};
