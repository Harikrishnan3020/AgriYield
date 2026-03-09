import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickEffect {
    id: string;
    x: number;
    y: number;
}

const LeafClickAnimation = () => {
    const [clicks, setClicks] = useState<ClickEffect[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newClick: ClickEffect = {
                id: Math.random().toString(36).substring(2, 9),
                x: e.clientX,
                y: e.clientY
            };
            setClicks((prev) => [...prev, newClick]);

            // Remove after animation completes
            setTimeout(() => {
                setClicks((prev) => prev.filter(click => click.id !== newClick.id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {clicks.map((click) => (
                    <motion.div
                        key={click.id}
                        initial={{ opacity: 1, scale: 0.5, x: click.x - 12, y: click.y - 12, rotate: 0 }}
                        animate={{ opacity: 0, scale: 1.5, y: click.y - 60, x: click.x + (Math.random() > 0.5 ? 20 : -20), rotate: 45 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute text-2xl"
                        style={{ position: 'absolute' }}
                    >
                        🌿
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LeafClickAnimation;
