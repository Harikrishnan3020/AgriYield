import { motion } from "framer-motion";
import { Bell, Settings, Sparkles, Leaf, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

import { useAppStore } from "@/store/useAppStore";

interface HeaderProps {
  userName?: string;
  isPremium?: boolean;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  className?: string;
}

const Header = ({
  userName = "Farmer",
  isPremium = false,
  onSettingsClick,
  onNotificationsClick,
  className,
}: HeaderProps) => {
  const { selectedLanguage, setLanguage } = useAppStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "sticky top-0 z-30 px-4 py-3 backdrop-blur-xl border-b border-emerald-500/10",
        className
      )}
      style={{ background: "rgba(7,21,10,0.85)" }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Logo & Welcome */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary-glow"
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-white">AgriYield</h1>
              {isPremium && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-2xs text-white font-medium"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  PRO
                </motion.span>
              )}
            </div>
            <p className="text-2xs text-emerald-400/70">Hello, {userName} 👋</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher
            value={selectedLanguage}
            onChange={setLanguage}
          />

          <Link to="/login">
            <motion.button
              className="w-10 h-10 rounded-xl backdrop-blur-lg border border-emerald-500/20 flex items-center justify-center text-emerald-300/60 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
              style={{ background: "rgba(16,185,129,0.08)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Login Page"
            >
              <User className="w-4 h-4" />
            </motion.button>
          </Link>

          <motion.button
            onClick={onNotificationsClick}
            className="relative w-10 h-10 rounded-xl backdrop-blur-lg border border-emerald-500/20 flex items-center justify-center text-emerald-300/60 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            style={{ background: "rgba(16,185,129,0.08)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-4 h-4" />
            <motion.span
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>

          <motion.button
            onClick={onSettingsClick}
            className="w-10 h-10 rounded-xl backdrop-blur-lg border border-emerald-500/20 flex items-center justify-center text-emerald-300/60 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            style={{ background: "rgba(16,185,129,0.08)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export { Header };
