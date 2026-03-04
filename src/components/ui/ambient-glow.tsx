"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
    className?: string;
    variant?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "left" | "right";
    size?: number;
}

export function AmbientGlow({ className, variant = "center", size = 1200 }: AmbientGlowProps) {
    const variantClasses = {
        "top-left": "-top-[20%] -left-[10%]",
        "top-right": "-top-[20%] -right-[10%]",
        "bottom-left": "-bottom-[20%] -left-[10%]",
        "bottom-right": "-bottom-[20%] -right-[10%]",
        "left": "top-1/2 -left-[20%] -translate-y-1/2",
        "right": "top-1/2 -right-[20%] -translate-y-1/2",
        "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    };

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-visible select-none z-0", className)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={cn(
                    "absolute rounded-full",
                    "bg-[radial-gradient(circle,rgba(242,224,148,0.35)_0%,rgba(242,224,148,0)_60%)]",
                    "blur-[80px]",
                    variantClasses[variant]
                )}
                style={{ width: size, height: size }}
            />
        </div>
    );
}
