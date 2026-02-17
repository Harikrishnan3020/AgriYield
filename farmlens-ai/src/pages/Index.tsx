
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/ui/Header";
import { BottomNav } from "@/components/ui/BottomNav";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { ConfettiCanvas } from "@/components/ui/ConfettiCanvas";
import { HeroSection } from "@/components/screens/HeroSection";
import { ResultsCard, DiagnosisResult } from "@/components/screens/ResultsCard";
import { MarketplaceSection, MarketplaceListing } from "@/components/screens/Marketplace";
import { Leaderboard, LeaderboardEntry } from "@/components/screens/Leaderboard";

import { PremiumPaywall } from "@/components/screens/PremiumPaywall";
import { ProfileSection } from "@/components/screens/ProfileSection";
import { useAppStore } from "@/store/useAppStore";
import { analyzeCropImage } from "@/services/groq";
import heroImage from "@/assets/hero-farm.jpg";
import { translations, LanguageCode } from "@/data/translations";

// Sample data
const sampleDiagnosis: DiagnosisResult = {
  disease: "Late Blight",
  confidence: 98,
  severity: "high",
  treatment: "Spray Mancozeb 75% WP @ 2.5g/L immediately. Repeat after 7 days if symptoms persist.",
  preventiveMeasures: [
    "Remove and destroy infected plant parts",
    "Improve field drainage to reduce humidity",
    "Apply copper-based fungicide preventively",
  ],
  weather: {
    humidity: 85,
    temperature: 28,
    condition: "Humid",
  },
  videoUrl: "https://www.youtube.com/embed/gE47Vd9gW1Y", // Sustainable Farming - America's Heartland
};

const sampleListings: MarketplaceListing[] = [
  {
    id: "1",
    title: "Premium Rice Seedlings",
    seller: "Ravi Ji Nursery",
    price: 10,
    unit: "bundle",
    distance: "2km",
    rating: 4.8,
    isVerified: true,
    deliveryAvailable: true,
    category: "seeds",
  },
  {
    id: "2",
    title: "Mancozeb 75% WP",
    seller: "Agro Chemicals Ltd",
    price: 180,
    unit: "kg",
    distance: "5km",
    rating: 4.6,
    isVerified: true,
    deliveryAvailable: true,
    category: "pesticide",
  },
  {
    id: "3",
    title: "Organic Vermicompost",
    seller: "Green Earth Farm",
    price: 25,
    unit: "kg",
    distance: "3km",
    rating: 4.9,
    isVerified: false,
    deliveryAvailable: false,
    category: "fertilizer",
  },
];





const Index = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, showPremiumPaywall, setShowPremiumPaywall, isPremium, selectedLanguage, isAuthenticated, leaderboard } = useAppStore();
  const t = translations[selectedLanguage as LanguageCode] || translations.en;

  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult>(sampleDiagnosis); // Default to sample

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [autoStartCamera, setAutoStartCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const handleScanClick = async (file?: File) => {
    // Check for API key before starting
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey || apiKey.includes("YOUR_")) {
      alert("⚠️ Configuration Missing\n\nPlease add your VITE_GROQ_API_KEY to the .env file.");
      return;
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setScannedImage(imageUrl);

      setIsAnalyzing(true);

      try {
        // Attempt to analyze with Groq
        const result = await analyzeCropImage(file);

        if (result) {
          setDiagnosisResult(result);
        } else {
          // No result returned
          console.error("Analysis failed");
          alert("Analysis failed. Please try again.");
          setIsAnalyzing(false);
          return;
        }
      } catch (error) {
        console.error("Analysis failed:", error);
        // Show specific error message if available
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        alert(`Analysis failed: ${errorMessage}\n\nPlease check your API key and connection.`);
        setIsAnalyzing(false);
        return;
      }

      setIsAnalyzing(false);
      setShowResults(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

    } else {
      // No file uploaded - do nothing (wait for user action in HeroSection)
      console.log("No file selected for scan");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <HeroSection
                  onScanClick={handleScanClick}
                  autoStartCamera={autoStartCamera}
                  onCameraStarted={() => setAutoStartCamera(false)}
                />

                {/* Quick Access Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 pb-6 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide px-1">Quick Access</h3>

                  <div className="grid grid-cols-2 gap-3">
                    {/* AI Assistant Card */}
                    <motion.button
                      onClick={() => navigate("/ai-assistant")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/30">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <h4 className="font-bold mb-1">AI Assistant</h4>
                        <p className="text-xs opacity-90">Get instant farming advice</p>
                      </div>
                    </motion.button>

                    {/* Weather Card */}
                    <motion.button
                      onClick={() => navigate("/weather")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/30">
                          <span className="text-2xl">🌤️</span>
                        </div>
                        <h4 className="font-bold mb-1">Weather</h4>
                        <p className="text-xs opacity-90">7-day forecast & tips</p>
                      </div>
                    </motion.button>

                    {/* Analytics Card */}
                    <motion.button
                      onClick={() => navigate("/analytics")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/30">
                          <span className="text-2xl">📊</span>
                        </div>
                        <h4 className="font-bold mb-1">Analytics</h4>
                        <p className="text-xs opacity-90">Track your progress</p>
                      </div>
                    </motion.button>

                    {/* Medicines Card */}
                    <motion.button
                      onClick={() => navigate("/medicine")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/30">
                          <span className="text-2xl">💊</span>
                        </div>
                        <h4 className="font-bold mb-1">Medicines</h4>
                        <p className="text-xs opacity-90">Browse treatments</p>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Hero background image */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <motion.img
                    src={heroImage}
                    alt="Farm landscape"
                    className="w-full h-full object-cover opacity-20"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-hero-gradient" />
                </div>

                {/* Analysis Loading Overlay */}
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
                    >
                      <div className="w-24 h-24 relative">
                        {/* Show the uploaded image if available */}
                        {scannedImage && (
                          <motion.img
                            src={scannedImage}
                            className="absolute inset-0 w-full h-full object-cover rounded-full opacity-50"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                          />
                        )}
                        <motion.div
                          className="absolute inset-0 border-4 border-emerald-500/30 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 border-t-4 border-emerald-500 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-xl font-bold text-white tracking-wide"
                      >
                        Analyzing Crop Health...
                      </motion.h3>
                      <p className="text-emerald-400 mt-2 text-sm font-mono">Running Neural-Agri™ Diagnosis</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-4 py-6 space-y-6"
              >
                <ResultsCard
                  result={diagnosisResult}
                  imageUrl={scannedImage}
                  onTreatmentClick={() => navigate("/medicine", {
                    state: {
                      disease: diagnosisResult.disease,
                      treatment: diagnosisResult.treatment
                    }
                  })}
                />

                <motion.button
                  onClick={() => setShowResults(false)}
                  className="w-full text-center text-primary font-medium py-3"
                  whileTap={{ scale: 0.98 }}
                >
                  {t.scanAnother}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        );

      case "market": {
        // Filter to show ONLY relevant products based on diagnosis
        const relevantListings = diagnosisResult
          ? sampleListings.filter((listing) => {
            const treatment = diagnosisResult.treatment.toLowerCase();
            const disease = diagnosisResult.disease.toLowerCase();
            const title = listing.title.toLowerCase();
            const category = listing.category.toLowerCase();

            // Check if product is mentioned in treatment or matches disease type
            return (
              treatment.includes(title) ||
              treatment.includes(category) ||
              disease.includes(category) ||
              title.includes(category)
            );
          })
          : sampleListings; // Show all if no diagnosis

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {diagnosisResult && (
              <div className="px-4 pt-4 pb-2">
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💊</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-800">Recommended for Your Crop</h4>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Based on your diagnosis of <strong>{diagnosisResult.disease}</strong>, we found these supplies for you.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <MarketplaceSection listings={relevantListings} />
          </motion.div>
        );
      }

      case "ranks":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Leaderboard entries={leaderboard} />
          </motion.div>
        );

      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProfileSection />
          </motion.div>
        );

      case "scan":
        // Trigger scan (camera) when tab is selected
        setShowResults(false);
        setScannedImage(null);
        setAutoStartCamera(true);
        setActiveTab("home");
        return null;

      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-[60vh] px-4"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-3xl">🚧</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{t.comingSoon}</h2>
              <p className="text-muted-foreground">{t.featureDev}</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-hero-gradient overflow-x-hidden">
      {/* Floating particles background */}
      <FloatingParticles count={10} />

      {/* Confetti effect */}
      <ConfettiCanvas isActive={showConfetti} />

      {/* Header */}
      <Header
        userName="Ravi"
        isPremium={isPremium}
        onSettingsClick={() => setShowPremiumPaywall(true)}
      />

      {/* Main Content */}
      <main className="pb-safe min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* WhatsApp FAB */}
      <WhatsAppFAB />

      {/* Premium Paywall Modal */}
      <PremiumPaywall
        isOpen={showPremiumPaywall}
        onClose={() => setShowPremiumPaywall(false)}
        onSubscribe={(plan) => {
          console.log(`Subscribing to ${plan} plan`);
          setShowPremiumPaywall(false);
        }}
      />
    </div>
  );
};

export default Index;
