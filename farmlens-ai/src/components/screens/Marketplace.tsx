import { motion } from "framer-motion";
import { MapPin, MessageCircle, Star, Truck, Verified, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { translations, LanguageCode } from "@/data/translations";

interface MarketplaceListing {
  id: string;
  title: string;
  seller: string;
  price: number;
  unit: string;
  distance: string;
  rating: number;
  image?: string;
  isVerified?: boolean;
  deliveryAvailable?: boolean;
  category: "seeds" | "fertilizer" | "pesticide" | "equipment" | "produce";
}

interface MarketplaceCardProps {
  listing: MarketplaceListing;
  onChatClick?: () => void;
  onBuyClick?: () => void;
  className?: string;
}

const categoryColors: Record<string, string> = {
  seeds: "from-emerald-400 to-emerald-600",
  fertilizer: "from-teal-400 to-teal-600",
  pesticide: "from-amber-400 to-amber-600",
  equipment: "from-slate-400 to-slate-600",
  produce: "from-orange-400 to-orange-600",
};

const categoryIcons: Record<string, string> = {
  seeds: "🌱",
  fertilizer: "🧪",
  pesticide: "💧",
  equipment: "🔧",
  produce: "🌾",
};

const MarketplaceCard = ({ listing, onChatClick, onBuyClick, className }: MarketplaceCardProps) => {
  const { selectedLanguage } = useAppStore();
  const t = translations[selectedLanguage as LanguageCode] || translations.en;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "rounded-2xl border border-white/10 p-4 flex gap-4",
        className
      )}
      style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
    >
      {/* Product Image/Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "w-20 h-20 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br flex-shrink-0",
          categoryColors[listing.category]
        )}
      >
        {listing.image ? (
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          categoryIcons[listing.category]
        )}
      </motion.div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{listing.title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm text-white/50 truncate">{listing.seller}</span>
              {listing.isVerified && (
                <Verified className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              )}
            </div>
          </div>
          {/* Price */}
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-white">₹{listing.price}</div>
            <div className="text-xs text-white/40">/{listing.unit}</div>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.distance}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white/60">{listing.rating.toFixed(1)}</span>
          </div>
          {listing.deliveryAvailable && (
            <div className="flex items-center gap-1 text-emerald-400">
              <Truck className="w-3 h-3" />
              Delivery
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <Button
            onClick={onBuyClick}
            size="sm"
            className="flex-1 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold border-0"
          >
            {t.buyNow}
          </Button>
          <Button
            onClick={onChatClick}
            size="sm"
            className="h-8 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Marketplace Section
interface MarketplaceSectionProps {
  listings: MarketplaceListing[];
  className?: string;
}

const MarketplaceSection = ({ listings, className }: MarketplaceSectionProps) => {
  const { selectedLanguage } = useAppStore();
  const t = translations[selectedLanguage as LanguageCode] || translations.en;

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(160deg, #0a1a0f 0%, #0d2318 40%, #071510 100%)" }}
    >
      {/* Real-time Market Ticker */}
      <div className="bg-emerald-900/30 border-b border-white/5 backdrop-blur-md overflow-hidden py-2">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[
            { name: "Wheat", price: "₹2,150", change: "+1.2%", up: true },
            { name: "Rice", price: "₹3,200", change: "-0.5%", up: false },
            { name: "Cotton", price: "₹6,400", change: "+2.8%", up: true },
            { name: "Maize", price: "₹1,850", change: "+0.3%", up: true },
            { name: "Potato", price: "₹850", change: "-1.5%", up: false },
            { name: "Soybean", price: "₹4,100", change: "+1.8%", up: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-white/70 font-medium">{item.name}</span>
              <span className="text-white font-bold">{item.price}</span>
              <span className={`text-xs ${item.up ? "text-emerald-400" : "text-red-400"}`}>
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <section className={cn("px-4 py-6", className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">{t.marketplaceTitle}</h2>
            </div>
            <p className="text-sm text-white/50">{t.marketplaceSubtitle}</p>
          </div>
          <Button
            variant="ghost"
            className="text-emerald-400 text-sm hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            {t.viewAll}
          </Button>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="space-y-3"
        >
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            >
              <MarketplaceCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export { MarketplaceCard, MarketplaceSection };
export type { MarketplaceListing };
