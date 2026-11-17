import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { Link } from "react-router-dom"
import { ArrowRight, Crosshair, ShieldCheck } from "lucide-react"
import heroBannerImg from "@/assets/hero-banner.jpg"

const TELEMETRY_FEED = [
    { code: "STANAG 4694", text: "NATO Accessory Rail & Weapon Architecture Certified" },
    { code: "MIL-STD-810H", text: "Environmental & Shock Tolerance Benchmarks Passed" },
    { code: "CRYPTO AES-256", text: "Encrypted Requisition & Escrow Dispatch Active" },
    { code: "LOGISTICS TIER-1", text: "Direct Flight-Line Armory Fulfillment within 24-48 Hours" },
    { code: "ORDNANCE QC", text: "Caliber Headspace & Chamber Pressure Verification Passed" },
]

export function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Tactical Telemetry Infinite Marquee */}
            <div className="h-9 border-b border-neutral-800 bg-neutral-950/95 text-neutral-400 overflow-hidden flex items-center select-none">
                <div className="animate-marquee flex items-center gap-8 px-4 text-xs font-mono">
                    {[...TELEMETRY_FEED, ...TELEMETRY_FEED].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 shrink-0">
                            <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {item.code}
                            </span>
                            <span className="text-neutral-500">—</span>
                            <span className="text-neutral-300">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cinematic Tactical Hero with High-Quality Armory Banner */}
            <section className="relative min-h-[560px] md:min-h-[620px] flex items-center justify-center overflow-hidden bg-neutral-950 border-b border-neutral-800">
                {/* High-Resolution Hero Banner Image with Multi-Stop Vignette */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBannerImg}
                        alt="Sector 7 Armory Workshop"
                        className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/80" />
                    <div className="absolute inset-0 bg-radial-vignette opacity-80" />
                </div>

                <div className="relative z-10 container px-4 md:px-6 py-20 text-center space-y-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase [text-wrap:balance]">
                        Mission-Ready <span className="text-neutral-400">Tactical Hardware</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-neutral-300 text-base md:text-lg leading-relaxed [text-wrap:pretty]">
                        Engineered for tactical superiority and zero-failure mission operations.
                        Direct-procurement small arms, precision match-grade ammunition, and field-tested combat loadouts.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                        <Link to="/category/guns">
                            <Button size="lg" className="bg-neutral-100 text-neutral-950 hover:bg-white font-bold px-7 shadow-lg transition-transform active:scale-95">
                                Browse Armory
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/category/gear">
                            <Button size="lg" variant="outline" className="text-neutral-200 border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 hover:text-white font-semibold px-7 backdrop-blur-sm">
                                <Crosshair className="w-4 h-4 mr-2 text-neutral-400" />
                                View Loadout Systems
                            </Button>
                        </Link>
                    </div>

                    {/* Grounded Military Logistics Standards */}
                    <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            MIL-SPEC QUALITY CONTROL
                        </span>
                        <span className="hidden sm:inline text-neutral-700">•</span>
                        <span>ITAR & FFL COMPLIANT LOGISTICS</span>
                        <span className="hidden sm:inline text-neutral-700">•</span>
                        <span>CHAIN OF CUSTODY VERIFIED</span>
                    </div>
                </div>
            </section>

            <div className="flex-1 bg-neutral-950">
                <ProductGrid />
            </div>
        </div>
    )
}
