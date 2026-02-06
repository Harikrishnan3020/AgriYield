import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "interactive" | "success" | "warning";
  blur?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", blur = "xl", children, ...props }, ref) => {
    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    const variantClasses = {
      default: "bg-card/80 border-white/50",
      elevated: "bg-card/90 border-white/60 shadow-glass-hover",
      interactive: "bg-card/80 border-white/50 hover:bg-card/90 hover:border-white/60 cursor-pointer",
      success: "bg-emerald-50/80 border-emerald-200/50",
      warning: "bg-amber-50/80 border-amber-200/50",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-3xl border p-6 shadow-glass transition-all duration-300",
          blurClasses[blur],
          variantClasses[variant],
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={
          variant === "interactive"
            ? { scale: 1.02, y: -4, boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)" }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
