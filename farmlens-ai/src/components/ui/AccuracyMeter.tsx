import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccuracyMeterProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const AccuracyMeter = ({
  value,
  size = "md",
  showLabel = true,
  label = "Confidence",
  className,
}: AccuracyMeterProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const getGradientColor = () => {
    if (clampedValue >= 90) return "from-emerald-400 to-emerald-600";
    if (clampedValue >= 70) return "from-teal-400 to-teal-600";
    if (clampedValue >= 50) return "from-amber-400 to-amber-600";
    return "from-red-400 to-red-600";
  };

  const getTextColor = () => {
    if (clampedValue >= 90) return "text-emerald-600";
    if (clampedValue >= 70) return "text-teal-600";
    if (clampedValue >= 50) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <motion.span
            className={cn("text-sm font-bold", getTextColor())}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {clampedValue}%
          </motion.span>
        </div>
      )}
      
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", getGradientColor())}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Animated pulse for high confidence */}
      {clampedValue >= 95 && (
        <motion.div
          className="mt-2 flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-600">High confidence detection</span>
        </motion.div>
      )}
    </div>
  );
};

export { AccuracyMeter };
