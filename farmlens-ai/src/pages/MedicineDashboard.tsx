import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ShoppingCart,
    Heart,
    Info,
    AlertTriangle,
    CheckCircle2,
    Droplet,
    Leaf,
    Clock,
    Shield,
    TrendingUp,
    MapPin,
    Star,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";
import {
    plantMedicinesDatabase,
    PlantMedicine,
    getMedicinesByDisease,
    getInStockMedicines
} from "@/data/plant-medicines";

const MedicineDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { activeTab } = useAppStore();

    // Get disease info from navigation state (passed from ResultsCard)
    const disease = location.state?.disease || "Late Blight";
    const treatment = location.state?.treatment || "";

    const [selectedMedicine, setSelectedMedicine] = useState<PlantMedicine | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Filter medicines based on disease if provided, otherwise show all
    const medicines = useMemo(() => {
        if (disease && disease !== "Unknown") {
            const filtered = getMedicinesByDisease(disease);
            // If we found disease-specific medicines, return them
            if (filtered.length > 0) {
                return filtered.filter(m => m.inStock || filtered.length < 3);
            }
        }
        // Otherwise return all stock medicines, limit to 8
        return getInStockMedicines().slice(0, 8);
    }, [disease]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const getMedicineTypeColor = (type: PlantMedicine["category"]) => {
        switch (type) {
            case "fungicide":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "pesticide":
                return "bg-red-100 text-red-700 border-red-200";
            case "herbicide":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "organic":
            case "bio-pesticide":
                return "bg-green-100 text-green-700 border-green-200";
            case "fertilizer":
                return "bg-purple-100 text-purple-700 border-purple-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
                        <h1 className="text-lg font-bold text-gray-900">Medicine Dashboard</h1>
                        <p className="text-xs text-gray-500">Treatment for {disease}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-lg">💊</span>
                    </div>
                </div>
            </motion.header>

            {/* Disease Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 pt-4 pb-2"
            >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">Recommended Medicines</h3>
                            <p className="text-sm text-emerald-50 opacity-90">
                                Based on your diagnosis of <span className="font-semibold">{disease}</span>, we've curated the best treatment options available near you.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Medicine Grid */}
            <div className="px-4 py-4 pb-24 space-y-4">
                {medicines.map((medicine, index) => (
                    <motion.div
                        key={medicine.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard
                            variant="default"
                            className="overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Medicine Header */}
                            <div className="p-4 pb-3 border-b border-gray-100">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {medicine.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium border ${getMedicineTypeColor(
                                                    medicine.category
                                                )}`}
                                            >
                                                {medicine.category.toUpperCase()}
                                            </span>
                                            {medicine.inStock ? (
                                                <span className="text-xs px-2 py-1 rounded-full font-medium border bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" /> In Stock
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-1 rounded-full font-medium border bg-red-50 text-red-700 border-red-200">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(medicine.id)}
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${favorites.includes(medicine.id)
                                                ? "fill-red-500 text-red-500"
                                                : "text-gray-400"
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Rating and Seller Info */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="font-semibold text-gray-900">
                                            {medicine.rating}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin className="w-3 h-3" />
                                        <span className="text-xs">{medicine.distance}</span>
                                        <span className="text-xs">•</span>
                                        <span className="text-xs">{medicine.seller}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Medicine Details */}
                            <div className="p-4 space-y-3">
                                <p className="text-sm text-gray-600">{medicine.description}</p>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Droplet className="w-4 h-4 text-blue-600" />
                                            <span className="text-xs font-semibold text-blue-900">
                                                Dosage
                                            </span>
                                        </div>
                                        <p className="text-xs text-blue-700">{medicine.dosage}</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="w-4 h-4 text-amber-600" />
                                            <span className="text-xs font-semibold text-amber-900">
                                                Safety Period
                                            </span>
                                        </div>
                                        <p className="text-xs text-amber-700">
                                            {medicine.safetyPeriod}
                                        </p>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-between"
                                    onClick={() => setSelectedMedicine(medicine)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        View Full Details
                                    </span>
                                    <TrendingUp className="w-4 h-4" />
                                </Button>

                                {/* Price and Action */}
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-0.5">Price</div>
                                        <div className="text-2xl font-bold text-emerald-600">
                                            ₹{medicine.price}
                                            <span className="text-sm text-gray-500 font-normal">
                                                /{medicine.packaging}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200"
                                        disabled={!medicine.inStock}
                                    >
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Medicine Detail Modal */}
            <AnimatePresence>
                {selectedMedicine && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedMedicine(null)}
                    >
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {selectedMedicine.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Complete Product Information
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMedicine(null)}
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="px-6 py-6 space-y-6">
                                {/* Active Ingredient */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-5 h-5 text-purple-600" />
                                        <h3 className="font-semibold text-gray-900">Active Ingredient</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 bg-purple-50 rounded-lg p-3 border border-purple-100">
                                        {selectedMedicine.activeIngredient}
                                    </p>
                                </div>

                                {/* Application Method */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplet className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-semibold text-gray-900">Application Method</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border border-blue-100">
                                        {selectedMedicine.applicationMethod}
                                    </p>
                                </div>

                                {/* Effective Against */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                        <h3 className="font-semibold text-gray-900">Effective Against</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMedicine.targetDiseases.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <h3 className="font-semibold text-gray-900">Key Benefits</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {selectedMedicine.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Precautions */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                        <h3 className="font-semibold text-gray-900">Precautions</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {selectedMedicine.precautions.map((precaution, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                                {precaution}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500">Total Price</div>
                                        <div className="text-2xl font-bold text-emerald-600">
                                            ₹{selectedMedicine.price}
                                            <span className="text-sm text-gray-500 font-normal">
                                                /{selectedMedicine.packaging}
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MedicineDashboard;
