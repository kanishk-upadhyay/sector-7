import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Product, getProducts } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
    Shield,
    Truck,
    RotateCcw,
    ArrowLeft,
    Crosshair,
    Layers,
    Cpu,
    CheckCircle2,
    Sliders
} from "lucide-react"
import { useCart } from "@/context/CartContext"
import { FALLBACK_PRODUCT_IMAGE } from "@/components/ProductCard"
import { cn } from "@/lib/utils"

export function ProductPage() {
    const { addItem } = useCart()
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeView, setActiveView] = useState<'standard' | 'blueprint'>('standard')

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const products = await getProducts()
            const found = products.find((p) => p.id === id)
            setProduct(found || null)
            setLoading(false)
        }
        fetch()
    }, [id])

    if (loading) {
        return <ProductDetailSkeleton />
    }

    if (!product) {
        return (
            <div className="container py-20 px-4 text-center space-y-4">
                <h2 className="text-2xl font-bold text-neutral-100">Equipment Unit Not Found</h2>
                <p className="text-neutral-400 text-sm">The requested inventory item could not be retrieved from the armory.</p>
                <Link to="/">
                    <Button variant="outline" className="border-neutral-700 text-neutral-200 hover:bg-neutral-800">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Armory
                    </Button>
                </Link>
            </div>
        )
    }

    const blueprint = product.blueprint || {
        muzzleVelocity: "360 m/s (1,180 fps)",
        effectiveRange: "50 m (55 yd)",
        barrelLength: '4.5" (114mm)',
        twistRate: '1:10" Right Hand',
        action: "Semi-Automatic Operating Cycle",
        feedSystem: "Detachable Tactical Magazine",
        attachmentSlots: [
            "Tactical Accessory Rail (MIL-STD-1913)",
            "Threaded Muzzle Ready",
            "Modular Grip Texture",
            "Beveled Magazine Well"
        ]
    }

    return (
        <div className="container py-8 md:py-12 px-4 md:px-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Link to="/" className="hover:text-neutral-200 transition-colors flex items-center gap-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Armory
                </Link>
                <span className="text-neutral-600">/</span>
                <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-neutral-200 transition-colors uppercase">
                    {product.category}
                </Link>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300 truncate max-w-[160px] sm:max-w-md">{product.name}</span>
            </div>

            {/* View Mode Switcher Header */}
            <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveView('standard')}
                        className={cn(
                            "px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors",
                            activeView === 'standard'
                                ? "bg-neutral-800 text-neutral-100 font-bold border border-neutral-700"
                                : "text-neutral-400 hover:text-neutral-200"
                        )}
                    >
                        Standard Spec View
                    </button>
                    <button
                        onClick={() => setActiveView('blueprint')}
                        className={cn(
                            "px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5",
                            activeView === 'blueprint'
                                ? "bg-sky-950/70 text-sky-400 font-bold border border-sky-500/50 shadow-sm"
                                : "text-neutral-400 hover:text-neutral-200"
                        )}
                    >
                        <Crosshair className="w-3.5 h-3.5 text-sky-400" />
                        Technical Blueprint HUD
                    </button>
                </div>

                <div className="text-xs font-mono text-neutral-400 hidden sm:block">
                    Stock Code: {product.id.toUpperCase()}
                </div>
            </div>

            {/* View Content */}
            {activeView === 'standard' ? (
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                    <div className="aspect-square bg-white rounded-xl overflow-hidden border border-neutral-800 p-8 shadow-sm relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                                if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                                    e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                                }
                            }}
                        />
                        <div className="absolute bottom-3 right-3 text-xs font-mono text-neutral-600 bg-neutral-100/90 px-2 py-0.5 rounded">
                            MASS: {product.weightKg.toFixed(2)} kg
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 font-mono tracking-wider uppercase text-xs">
                                    {product.manufacturer}
                                </span>
                                {product.caliber && (
                                    <>
                                        <span className="text-neutral-700">•</span>
                                        <span className="text-xs font-mono font-bold text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                                            {product.caliber}
                                        </span>
                                    </>
                                )}
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white text-pretty">
                                {product.name}
                            </h1>
                            <div className="text-2xl sm:text-3xl font-mono font-semibold text-neutral-100">
                                ${product.price.toFixed(2)}
                            </div>
                        </div>

                        <p className="text-neutral-300 leading-relaxed text-base border-l-2 border-neutral-800 pl-4 text-pretty">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs font-mono">
                            <div>
                                <span className="text-neutral-500">Unit Mass:</span>
                                <div className="font-bold text-neutral-200">{product.weightKg.toFixed(2)} kg ({(product.weightKg * 2.20462).toFixed(1)} lbs)</div>
                            </div>
                            <div>
                                <span className="text-neutral-500">Inventory Status:</span>
                                <div className="font-bold text-emerald-400">MIL-SPEC ALLOCATION READY</div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-12 text-base font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 shadow-sm"
                            onClick={() => product && addItem(product)}
                        >
                            Add to Requisition
                        </Button>

                        <div className="grid grid-cols-3 gap-3 py-6 border-t border-b border-neutral-800">
                            <div className="flex flex-col items-center text-center space-y-1.5 p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
                                <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs">Mil-Spec</Badge>
                                <div className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1">
                                    <Shield className="w-3.5 h-3.5 text-neutral-400" /> Certified
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-1.5 p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
                                <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs">Fast Ship</Badge>
                                <div className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1">
                                    <Truck className="w-3.5 h-3.5 text-neutral-400" /> Ready
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-1.5 p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
                                <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs">Lifetime</Badge>
                                <div className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1">
                                    <RotateCcw className="w-3.5 h-3.5 text-neutral-400" /> Warranty
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Technical Blueprint HUD Mode */
                <div className="space-y-8 animate-in fade-in-50">
                    <div className="p-6 md:p-8 rounded-xl border border-sky-900/50 bg-[#070b14] relative overflow-hidden shadow-2xl">
                        {/* Cyan Blueprint Grid Background */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(14, 165, 233, 0.25) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(14, 165, 233, 0.25) 1px, transparent 1px)
                                `,
                                backgroundSize: '32px 32px'
                            }}
                        />

                        {/* Top HUD Telemetry Header */}
                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sky-800/40 gap-3">
                            <div>
                                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                                    TECHNICAL BLUEPRINT & BALLISTIC SPECIFICATIONS
                                </div>
                                <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-white mt-1">
                                    {product.name}
                                </h2>
                            </div>
                            <div className="text-xs font-mono text-sky-300/80 bg-sky-950/60 border border-sky-600/40 px-3 py-1.5 rounded self-start sm:self-auto">
                                STANAG 4694 COMPLIANT • SPEC REV 4.2
                            </div>
                        </div>

                        {/* Middle Blueprint Viewport & Ballistics Matrix */}
                        <div className="relative z-10 grid lg:grid-cols-12 gap-8 my-6 items-center">
                            {/* Visual Blueprint Schematic */}
                            <div className="lg:col-span-5 aspect-square rounded-lg border border-sky-700/40 bg-black/40 p-6 flex flex-col items-center justify-center relative">
                                <div className="absolute top-2 left-2 text-[11px] font-mono text-sky-400/70">
                                    [SCHEMATIC: ELEVATION VIEW]
                                </div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-64 max-w-full object-contain filter invert contrast-125 opacity-90 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                                    onError={(e) => {
                                        if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                                            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                                        }
                                    }}
                                />
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs font-mono text-sky-400/80 border-t border-sky-800/30 pt-1">
                                    <span>CALIBER: {product.caliber || 'N/A'}</span>
                                    <span>MASS: {product.weightKg.toFixed(2)} KG</span>
                                </div>
                            </div>

                            {/* Ballistics Spec Matrix */}
                            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                                <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/40 font-mono space-y-1">
                                    <div className="text-xs text-sky-400/70 flex items-center gap-1.5">
                                        <Cpu className="w-3.5 h-3.5 text-sky-400" />
                                        MUZZLE VELOCITY
                                    </div>
                                    <div className="text-base font-bold text-sky-100">{blueprint.muzzleVelocity}</div>
                                </div>

                                <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/40 font-mono space-y-1">
                                    <div className="text-xs text-sky-400/70 flex items-center gap-1.5">
                                        <Crosshair className="w-3.5 h-3.5 text-sky-400" />
                                        EFFECTIVE OPERATIONAL RANGE
                                    </div>
                                    <div className="text-base font-bold text-sky-100">{blueprint.effectiveRange}</div>
                                </div>

                                <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/40 font-mono space-y-1">
                                    <div className="text-xs text-sky-400/70 flex items-center gap-1.5">
                                        <Sliders className="w-3.5 h-3.5 text-sky-400" />
                                        BARREL LENGTH & TWIST
                                    </div>
                                    <div className="text-base font-bold text-sky-100">
                                        {blueprint.barrelLength} • {blueprint.twistRate}
                                    </div>
                                </div>

                                <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/40 font-mono space-y-1">
                                    <div className="text-xs text-sky-400/70 flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-sky-400" />
                                        ACTION CYCLE & FEED
                                    </div>
                                    <div className="text-sm font-bold text-sky-100 leading-tight">
                                        {blueprint.action}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modular Attachment Architecture */}
                        <div className="relative z-10 pt-4 border-t border-sky-800/40 space-y-3">
                            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                                MODULAR HARDWARE ATTACHMENT SLOTS
                            </div>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                                {blueprint.attachmentSlots.map((slot, idx) => (
                                    <div key={idx} className="p-2.5 rounded bg-sky-950/40 border border-sky-800/50 text-sky-200 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                        <span>{slot}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Requisition Bar from Blueprint */}
                        <div className="relative z-10 pt-6 mt-6 border-t border-sky-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="font-mono text-sm text-sky-200">
                                Requisition Unit Price: <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                            </div>
                            <Button
                                className="w-full sm:w-auto bg-sky-400 hover:bg-sky-300 text-sky-950 font-mono font-bold px-6 shadow-md"
                                onClick={() => product && addItem(product)}
                            >
                                Add Unit to Requisition
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function ProductDetailSkeleton() {
    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
                <Skeleton className="aspect-square w-full rounded-xl bg-neutral-900" />
                <div className="space-y-6">
                    <Skeleton className="h-4 w-24 bg-neutral-900" />
                    <Skeleton className="h-12 w-3/4 bg-neutral-900" />
                    <Skeleton className="h-8 w-32 bg-neutral-900" />
                    <Skeleton className="h-24 w-full bg-neutral-900" />
                    <Skeleton className="h-12 w-full bg-neutral-900" />
                </div>
            </div>
        </div>
    )
}
