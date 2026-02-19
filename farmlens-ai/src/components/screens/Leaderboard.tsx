import { motion } from "framer-motion";
import { Award, Crown, Medal, TrendingUp, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { translations, LanguageCode } from "@/data/translations";

interface LeaderboardEntry {
  rank: number;
  name: string;
  location: string;
  score: number;
  avatar?: string;
  change?: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const rankStyles: Record<number, { bg: string; icon: React.ComponentType<{ className?: string }>; iconColor: string; scoreColor: string; border: string }> = {
  1: {
    bg: "bg-gradient-to-br from-amber-400 to-amber-600",
    icon: Crown,
    iconColor: "text-amber-100",
    scoreColor: "text-amber-400",
    border: "border-amber-500/30",
  },
  2: {
    bg: "bg-gradient-to-br from-slate-300 to-slate-500",
    icon: Medal,
    iconColor: "text-slate-100",
    scoreColor: "text-slate-300",
    border: "border-slate-500/30",
  },
  3: {
    bg: "bg-gradient-to-br from-orange-400 to-orange-600",
    icon: Medal,
    iconColor: "text-orange-100",
    scoreColor: "text-orange-400",
    border: "border-orange-500/30",
  },
};

const Leaderboard = ({ entries, title, subtitle, className }: LeaderboardProps) => {
  const { selectedLanguage } = useAppStore();
  const t = translations[selectedLanguage as LanguageCode] || translations.en;

  const displayTitle = title || t.leaderboardTitle;
  const displaySubtitle = subtitle || t.leaderboardSubtitle;

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0a1a0f 0%, #0d2318 40%, #071510 100%)" }}
    >
      <section className={cn("px-4 py-6 pb-24", className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-400" />
              {displayTitle}
            </h2>
            <p className="text-sm text-white/50">{displaySubtitle}</p>
          </div>
        </div>

        {/* Top 3 Podium */}
        {entries.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-6">
            {/* 2nd */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="rounded-t-2xl pt-4 pb-3 px-2" style={{ background: "rgba(148,163,184,0.15)", border: "1px solid rgba(148,163,184,0.2)" }}>
                <div className="text-xs font-bold text-slate-300 truncate">{entries[1].name}</div>
                <div className="text-lg font-black text-slate-300 mt-1">🥈</div>
                <div className="text-xs text-white/50 mt-1">{entries[1].score.toLocaleString()} pts</div>
              </div>
            </motion.div>

            {/* 1st */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="flex-1 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-900/40 ring-2 ring-amber-400/50">
                <Crown className="w-8 h-8 text-amber-100" />
              </div>
              <div className="rounded-t-2xl pt-4 pb-3 px-2" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}>
                <div className="text-xs font-bold text-amber-300 truncate">{entries[0].name}</div>
                <div className="text-xl font-black text-amber-300 mt-1">🥇</div>
                <div className="text-xs text-white/50 mt-1">{entries[0].score.toLocaleString()} pts</div>
              </div>
            </motion.div>

            {/* 3rd */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="rounded-t-2xl pt-4 pb-3 px-2" style={{ background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.2)" }}>
                <div className="text-xs font-bold text-orange-300 truncate">{entries[2].name}</div>
                <div className="text-lg font-black text-orange-300 mt-1">🥉</div>
                <div className="text-xs text-white/50 mt-1">{entries[2].score.toLocaleString()} pts</div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Full List */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
          className="space-y-2"
        >
          {entries.map((entry) => {
            const rankStyle = rankStyles[entry.rank];
            const RankIcon = rankStyle?.icon || User;

            return (
              <motion.div
                key={entry.rank}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              >
                <div
                  className={cn(
                    "rounded-2xl border p-3 flex items-center gap-3 transition-all",
                    entry.isCurrentUser
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : rankStyle
                        ? `border-${rankStyle.border} bg-white/5`
                        : "border-white/10 bg-white/5"
                  )}
                  style={entry.isCurrentUser ? { boxShadow: "0 0 20px rgba(16,185,129,0.15)" } : {}}
                >
                  {/* Rank Badge */}
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0",
                      rankStyle?.bg || "bg-white/10"
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {entry.rank <= 3 ? (
                      <RankIcon className={cn("w-5 h-5", rankStyle?.iconColor || "text-white")} />
                    ) : (
                      <span className="text-white/70 font-bold">{entry.rank}</span>
                    )}
                  </motion.div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {entry.avatar ? (
                      <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white/40" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-semibold truncate text-sm",
                        entry.isCurrentUser ? "text-emerald-400" : "text-white"
                      )}>
                        {entry.name}
                      </span>
                      {entry.isCurrentUser && (
                        <span className="text-2xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30 flex-shrink-0">
                          {t.rankYou}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 truncate">{entry.location}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <div className={cn("font-bold text-sm", rankStyle?.scoreColor || "text-white")}>
                      {entry.score.toLocaleString()}
                    </div>
                    {entry.change && (
                      <div className={cn(
                        "flex items-center justify-end gap-0.5 text-xs",
                        entry.change === "up" ? "text-emerald-400" :
                          entry.change === "down" ? "text-red-400" : "text-white/30"
                      )}>
                        {entry.change === "up" && <TrendingUp className="w-3 h-3" />}
                        {entry.change === "up" ? "+2" : entry.change === "down" ? "-1" : "—"}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export { Leaderboard };
export type { LeaderboardEntry };
