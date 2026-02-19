import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Leaf {
    id: number;
    x: number;
    delay: number;
    duration: number;
    symbol: string;
    scale: number;
    rotation: number;
}

const FallingLeaves = () => {
    const [leaves, setLeaves] = useState<Leaf[]>([]);

    useEffect(() => {
        const symbols = ["🍃", "🍂", "🌿"];
        const count = 15;
        const newLeaves = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random horizontal position
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            scale: 0.5 + Math.random() * 0.5,
            rotation: Math.random() * 360,
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    className="absolute top-[-10%]"
                    style={{
                        left: `${leaf.x}%`,
                        fontSize: `${leaf.scale * 2}rem`,
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, (Math.random() - 0.5) * 200], // Drift
                        rotate: [leaf.rotation, leaf.rotation + 360],
                    }}
                    transition={{
                        duration: leaf.duration,
                        delay: leaf.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {leaf.symbol}
                </motion.div>
            ))}
        </div>
    );
};

export default FallingLeaves;
