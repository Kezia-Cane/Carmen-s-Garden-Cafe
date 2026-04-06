"use client";

import { useEffect, useState } from "react";

const PH_TIME_ZONE = "Asia/Manila";
const MONDAY_TO_SATURDAY_OPEN = 10 * 60;
const MONDAY_TO_SATURDAY_CLOSE = 24 * 60;
const SUNDAY_OPEN = 13 * 60;
const SUNDAY_CLOSE = 22 * 60;

function getStoreStatus(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: PH_TIME_ZONE,
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    }).formatToParts(now);

    const weekday = parts.find((part) => part.type === "weekday")?.value;
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
    const currentMinutes = hour * 60 + minute;

    const isOpen = weekday === "Sun"
        ? currentMinutes >= SUNDAY_OPEN && currentMinutes < SUNDAY_CLOSE
        : currentMinutes >= MONDAY_TO_SATURDAY_OPEN && currentMinutes < MONDAY_TO_SATURDAY_CLOSE;

    return { isOpen };
}

export function StoreStatusBadge() {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        const updateStatus = () => {
            setIsOpen(getStoreStatus().isOpen);
        };

        updateStatus();

        const intervalId = window.setInterval(updateStatus, 60_000);
        return () => window.clearInterval(intervalId);
    }, []);

    if (isOpen === null) {
        return (
            <div className="inline-flex items-center gap-2 bg-gold/5 text-gold/70 text-xs font-montserrat uppercase tracking-wider px-4 py-1.5 rounded-full border border-gold/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold/50" />
                Checking Hours
            </div>
        );
    }

    return (
        <div
            aria-live="polite"
            className={`inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider px-4 py-1.5 rounded-full border mb-6 ${isOpen
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
                : "bg-red-900/40 text-red-400 border-red-500/20"
                }`}
        >
            <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-300 animate-pulse" : "bg-red-400 animate-pulse"}`} />
            {isOpen ? "Open" : "Closed"}
        </div>
    );
}
