'use client';

import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

export function Loader4({ className, fullscreen = true }: { className?: string, fullscreen?: boolean }) {
    // Path for the "L" shape of the 4
    const path1 = "M 30 10 L 10 50 L 60 50";
    // Path for the vertical line of the 4
    const path2 = "M 45 30 L 45 70";

    const commonProps = {
        strokeWidth: "6",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none"
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
            }
        }
    };

    const content = (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-3xl rounded-full animate-pulse" />

                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-2xl">
                    <motion.path
                        d={path1}
                        className="stroke-blue-600 dark:stroke-white"
                        variants={pathVariants}
                        {...commonProps}
                    />
                    <motion.path
                        d={path2}
                        className="stroke-zinc-900 dark:stroke-blue-500"
                        variants={pathVariants}
                        {...commonProps}
                    />
                </svg>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="text-sm font-medium text-zinc-400 dark:text-zinc-500 tracking-widest uppercase"
            >
                Loading...
            </motion.p>
        </div>
    );

    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md">
                {content}
            </div>
        );
    }

    return content;
}
