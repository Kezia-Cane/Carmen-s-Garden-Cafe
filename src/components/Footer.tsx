"use client";
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Globe,
    ArrowRight,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export function Footer() {
    const footerLinks = [
        {
            title: "Navigation",
            links: [
                { label: "Origins", href: "#origins" },
                { label: "The Craft", href: "#the-craft" },
                { label: "Menu", href: "#menu" },
                { label: "Experience", href: "#experience" },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={16} className="text-gold" />,
            text: "sanctuary@carmens.cafe",
            href: "mailto:sanctuary@carmens.cafe",
        },
        {
            icon: <Phone size={16} className="text-gold" />,
            text: "+1 (555) GARDEN-01",
            href: "tel:+15554273360",
        },
        {
            icon: <MapPin size={16} className="text-gold" />,
            text: "123 Botanical Lane, Glasshaven",
        },
    ];

    return (
        <footer className="bg-forest-green relative overflow-x-clip mt-0">
            <div className="max-w-7xl mx-auto p-12 md:p-24 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12 pb-24 border-b border-gold/10">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-8">
                        <div className="flex items-center space-x-3">
                            <span className="text-gold text-4xl font-cinzel">C</span>
                            <span className="text-white text-3xl font-cinzel tracking-tighter">Carmen’s</span>
                        </div>
                        <p className="font-montserrat text-sm leading-relaxed text-muted-gold opacity-80 max-w-xs">
                            Cultivated in nature, perfected in glass. A sanctuary where the soul finds its garden.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-cinzel text-white text-lg font-bold mb-8 uppercase tracking-widest">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative group w-fit">
                                        <a
                                            href={link.href}
                                            className="font-montserrat text-sm text-muted-gold hover:text-gold transition-colors tracking-wide"
                                        >
                                            {link.label}
                                        </a>
                                        {((link as { label: string; href: string; pulse?: boolean }).pulse) && (
                                            <span className="absolute top-0 right-[-14px] w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                                        )}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300 opacity-50" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="font-cinzel text-white text-lg font-bold mb-8 uppercase tracking-widest">
                            Visit Us
                        </h4>
                        <ul className="space-y-6 text-sm">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-start space-x-4">
                                    <div className="mt-1">{item.icon}</div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="font-montserrat text-muted-gold hover:text-gold transition-colors leading-relaxed"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="font-montserrat text-muted-gold leading-relaxed">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs space-y-6 md:space-y-0 pt-12 text-gold/40 font-montserrat tracking-[0.2em] uppercase">
                    {/* Social icons */}
                    <div className="flex space-x-8">
                        <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors"><Instagram size={18} /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-gold transition-colors"><Twitter size={18} /></a>
                        <a href="#" aria-label="Globe" className="hover:text-gold transition-colors"><Globe size={18} /></a>
                    </div>

                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} CARMEN GARDEN CAFE. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>

            {/* Text hover effect - Large Brand Tag */}

            <FooterBackgroundGradient />
        </footer>
    );
}
