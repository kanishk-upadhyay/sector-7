import { useCart, CartItem } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import {
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    ShieldCheck,
    CheckCircle2,
    Scale,
    AlertTriangle,
    Crosshair,
    Printer,
    X,
    FileText
} from "lucide-react"
import { FALLBACK_PRODUCT_IMAGE } from "@/components/ProductCard"
import { toast } from "sonner"

interface ManifestData {
    orderId: string;
    timestamp: string;
    items: CartItem[];
    totalWeightKg: number;
    totalWeightLbs: number;
    subtotal: number;
    clearanceLevel: string;
}

export function CartPage() {
    const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart()
    const [manifest, setManifest] = useState<ManifestData | null>(null)

    // Calculate Payload Weight Metrics
    const totalWeightKg = items.reduce((acc, item) => acc + (item.weightKg || 0.8) * item.quantity, 0)
    const totalWeightLbs = totalWeightKg * 2.20462

    // Weight class tiering
    let weightTier = {
        label: "Light Reconnaissance (High Mobility)",
        color: "text-emerald-400",
        barColor: "bg-emerald-500",
        description: "Optimal agility loadout. Minimal fatigue penalty for rapid-response deployment.",
        pct: Math.min(100, Math.round((totalWeightKg / 25) * 100))
    }
    if (totalWeightKg > 8 && totalWeightKg <= 18) {
        weightTier = {
            label: "Combat Patrol (Standard Infantry Spec)",
            color: "text-amber-400",
            barColor: "bg-amber-500",
            description: "Standard infantry patrol spec. Balanced ballistic armor, ammunition, and mobility.",
            pct: Math.min(100, Math.round((totalWeightKg / 25) * 100))
        }
    } else if (totalWeightKg > 18) {
        weightTier = {
            label: "Heavy Sustainment (Specialist Loadout)",
            color: "text-rose-400",
            barColor: "bg-rose-500",
            description: "Extended expeditionary loadout. Heavy ordnance payload; consider tactical transport.",
            pct: Math.min(100, Math.round((totalWeightKg / 25) * 100))
        }
    }

    // Caliber Compatibility Analysis
    const weaponPlatforms = items.filter(
        i => (i.category === "Handguns" || i.category === "Rifles") && i.caliber
    )
    const weaponCalibers = new Set(weaponPlatforms.map(w => w.caliber))

    const munitionsAndMags = items.filter(
        i => (i.category === "Ammo" || i.category === "Accessories") && i.caliber
    )

    const unhostedMunitions = munitionsAndMags.filter(m => !weaponCalibers.has(m.caliber))
    const uniqueUnhostedCalibers = Array.from(new Set(unhostedMunitions.map(m => m.caliber)))

    const handleGenerateManifest = () => {
        const orderId = `SEC7-${Math.floor(100000 + Math.random() * 900000)}`
        const newManifest: ManifestData = {
            orderId,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            items: [...items],
            totalWeightKg,
            totalWeightLbs,
            subtotal: cartTotal,
            clearanceLevel: "LEVEL 4 // TOP SECRET RESTRICTED"
        }
        setManifest(newManifest)
        toast.success(`Tactical Requisition Manifest generated: #${orderId}`)
    }

    const handleCompleteCheckout = () => {
        toast.success(`Requisition manifest dispatched to flightline logistics.`)
        setManifest(null)
        clearCart()
    }

    if (items.length === 0) {
        return (
            <div className="container py-20 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 text-pretty">Requisition List Empty</h2>
                <p className="text-neutral-400 max-w-md text-sm sm:text-base text-pretty">
                    Your tactical loadout is currently empty. Visit the armory to select equipment and munitions.
                </p>
                <Link to="/">
                    <Button variant="outline" className="mt-4 border-neutral-700 bg-neutral-900/60 text-neutral-100 hover:bg-neutral-800 hover:text-white font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Armory
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <section className="container py-8 md:py-12 px-4 md:px-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Link to="/" className="hover:text-neutral-200 transition-colors flex items-center gap-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Armory
                </Link>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300 uppercase">Requisition Loadout</span>
            </div>

            <div className="mb-8 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 text-pretty">
                    Tactical Loadout & Requisition
                </h1>
                <p className="text-neutral-400 text-sm md:text-base text-pretty">
                    Review equipment payload, verify ballistic caliber compatibility, and generate procurement manifests.
                </p>
            </div>

            {/* Tactical Loadout Weight & Caliber HUD */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                {/* 1. Payload Weight Gauge */}
                <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/70 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                            <Scale className="w-4 h-4 text-neutral-400" />
                            <span>LOADOUT PAYLOAD WEIGHT GAUGE</span>
                        </div>
                        <span className={`text-xs font-mono font-bold ${weightTier.color}`}>
                            {weightTier.label}
                        </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                        <div className="text-2xl font-mono font-bold text-neutral-100">
                            {totalWeightKg.toFixed(2)} <span className="text-sm font-normal text-neutral-400">kg</span>
                            <span className="text-neutral-600 mx-2">/</span>
                            <span className="text-lg text-neutral-300">{totalWeightLbs.toFixed(1)} lbs</span>
                        </div>
                        <div className="text-xs font-mono text-neutral-500">
                            CAPACITY: 25.0 kg
                        </div>
                    </div>

                    {/* Telemetry Progress Bar */}
                    <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800">
                        <div
                            className={`h-full ${weightTier.barColor} transition-all duration-500`}
                            style={{ width: `${weightTier.pct}%` }}
                        />
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                        {weightTier.description}
                    </p>
                </div>

                {/* 2. Caliber Compatibility Gauge */}
                <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/70 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                            <Crosshair className="w-4 h-4 text-neutral-400" />
                            <span>ORDNANCE & CALIBER SYNCHRONIZATION</span>
                        </div>
                        <span className="text-xs font-mono text-neutral-500">
                            [{weaponPlatforms.length} HOST WEAPONS]
                        </span>
                    </div>

                    {uniqueUnhostedCalibers.length > 0 ? (
                        <div className="p-3 rounded bg-amber-950/30 border border-amber-600/40 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                                <span>CALIBER MISMATCH DETECTED</span>
                            </div>
                            <p className="text-xs font-mono text-neutral-300 leading-snug">
                                Requisitioning <span className="text-amber-300 font-semibold">{uniqueUnhostedCalibers.join(', ')}</span> munitions without a matching weapon platform in your manifest.
                            </p>
                        </div>
                    ) : munitionsAndMags.length > 0 ? (
                        <div className="p-3 rounded bg-emerald-950/30 border border-emerald-600/40 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                                <span>ALL CALIBERS SYNCHRONIZED</span>
                            </div>
                            <p className="text-xs font-mono text-neutral-300 leading-snug">
                                All requisitioned magazines and ammunition match host weapon platforms in your manifest.
                            </p>
                        </div>
                    ) : (
                        <div className="p-3 rounded bg-neutral-950 border border-neutral-800 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300">
                                <CheckCircle2 className="w-4 h-4 shrink-0 text-neutral-400" />
                                <span>LOADOUT BALANCED</span>
                            </div>
                            <p className="text-xs font-mono text-neutral-400 leading-snug">
                                Active platform loadout verified. No orphan munitions detected.
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-neutral-400 pt-1">
                        <span className="text-neutral-500">Active Calibers:</span>
                        {weaponCalibers.size > 0 ? (
                            Array.from(weaponCalibers).map(cal => (
                                <span key={cal} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
                                    {cal}
                                </span>
                            ))
                        ) : (
                            <span className="text-neutral-500 italic">None selected</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Items List & Order Summary */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-800 bg-white p-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                                            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div className="grid gap-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-semibold text-neutral-200 text-sm sm:text-base text-pretty">{item.name}</h3>
                                        <span className="text-xs font-mono text-neutral-400 shrink-0">
                                            {((item.weightKg || 0.8) * item.quantity).toFixed(2)} kg
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                                        <span className="uppercase">{item.category}</span>
                                        {item.caliber && (
                                            <>
                                                <span>•</span>
                                                <span className="text-neutral-300 font-semibold">{item.caliber}</span>
                                            </>
                                        )}
                                        {item.manufacturer && (
                                            <>
                                                <span>•</span>
                                                <span className="text-neutral-400">{item.manufacturer}</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm font-mono font-medium text-neutral-300 mt-1">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    {/* Accessible Touch-Friendly Stepper */}
                                    <div className="flex items-center space-x-1 bg-neutral-950 rounded-md border border-neutral-800 p-0.5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-sm hover:bg-neutral-800 text-neutral-400 hover:text-white"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </Button>
                                        <span className="text-xs font-mono w-6 text-center text-neutral-200 font-semibold">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-sm hover:bg-neutral-800 text-neutral-400 hover:text-white"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-8 px-2 text-xs font-mono"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full border-neutral-800 bg-transparent text-neutral-400 hover:text-red-400 hover:border-red-900/60 hover:bg-red-950/10 text-xs font-mono" onClick={clearCart}>
                        Clear Entire Loadout
                    </Button>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-6 space-y-6 sticky top-24">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                            <h3 className="font-semibold text-lg text-neutral-100">Order Summary</h3>
                            <span className="text-xs font-mono text-neutral-500">[LOGISTICS]</span>
                        </div>

                        <div className="space-y-3 text-sm text-neutral-400 font-mono">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-neutral-200">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Payload Mass</span>
                                <span className="text-neutral-200">{totalWeightKg.toFixed(2)} kg ({totalWeightLbs.toFixed(1)} lbs)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Freight Dispatch</span>
                                <span className="text-emerald-400">Complimentary</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tariffs & Handling</span>
                                <span className="text-neutral-500">Calculated at checkout</span>
                            </div>

                            <div className="border-t border-neutral-800 pt-3 flex justify-between font-bold text-neutral-100 text-base">
                                <span>Total Requisition</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button className="w-full h-11 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-bold text-sm shadow-sm flex items-center justify-center gap-2" onClick={handleGenerateManifest}>
                            <FileText className="w-4 h-4" />
                            Generate Requisition Manifest
                        </Button>

                        <div className="pt-2 text-xs font-mono text-neutral-500 flex items-center gap-1.5 justify-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>256-BIT ENCRYPTED COMMAND PROTOCOL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Printable / Downloadable Requisition Manifest Modal */}
            {manifest && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-neutral-950 border border-neutral-700 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 print:p-0 print:border-none print:shadow-none">
                        <button
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white print:hidden"
                            onClick={() => setManifest(null)}
                            aria-label="Close manifest"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Classified Header */}
                        <div className="border-b-2 border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                    SECTOR 7 LOGISTICS COMMAND // FIELD PROCUREMENT
                                </div>
                                <h2 className="text-2xl font-mono font-extrabold tracking-tight text-white">
                                    OFFICIAL REQUISITION MANIFEST
                                </h2>
                            </div>
                            {/* Security Stamp */}
                            <div className="border-2 border-emerald-500 text-emerald-400 font-mono font-extrabold text-xs px-3 py-1.5 rounded uppercase tracking-wider text-center rotate-1 self-start sm:self-auto">
                                APPROVED // LEVEL 4 DISPATCH
                            </div>
                        </div>

                        {/* Metadata Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                            <div>
                                <div className="text-neutral-500">MANIFEST REF</div>
                                <div className="font-bold text-neutral-100">{manifest.orderId}</div>
                            </div>
                            <div>
                                <div className="text-neutral-500">TIMESTAMP</div>
                                <div className="font-bold text-neutral-100">{manifest.timestamp}</div>
                            </div>
                            <div>
                                <div className="text-neutral-500">TOTAL MASS</div>
                                <div className="font-bold text-neutral-100">{manifest.totalWeightKg.toFixed(2)} kg</div>
                            </div>
                            <div>
                                <div className="text-neutral-500">DESTINATION</div>
                                <div className="font-bold text-neutral-100">DEPOT ALPHA</div>
                            </div>
                        </div>

                        {/* Manifest Line Items Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-mono text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-neutral-800 text-neutral-400">
                                        <th className="py-2 pr-3">ITEM DESCRIPTION</th>
                                        <th className="py-2 px-2 text-center">CALIBER</th>
                                        <th className="py-2 px-2 text-center">QTY</th>
                                        <th className="py-2 px-2 text-right">MASS</th>
                                        <th className="py-2 pl-3 text-right">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manifest.items.map((item) => (
                                        <tr key={item.id} className="border-b border-neutral-800/60 text-neutral-200">
                                            <td className="py-2.5 pr-3 font-sans font-medium">{item.name}</td>
                                            <td className="py-2.5 px-2 text-center text-neutral-400">{item.caliber || '—'}</td>
                                            <td className="py-2.5 px-2 text-center font-bold text-white">{item.quantity}</td>
                                            <td className="py-2.5 px-2 text-right text-neutral-400">
                                                {((item.weightKg || 0.8) * item.quantity).toFixed(2)} kg
                                            </td>
                                            <td className="py-2.5 pl-3 text-right font-bold text-neutral-100">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-neutral-800 font-bold text-sm text-white">
                                        <td colSpan={3} className="py-3">TOTAL REQUISITION OBLIGATION</td>
                                        <td className="py-3 text-right text-xs text-neutral-400">{manifest.totalWeightKg.toFixed(2)} kg</td>
                                        <td className="py-3 pl-3 text-right text-base text-neutral-100">${manifest.subtotal.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Barcode Graphic */}
                        <div className="pt-2 flex flex-col items-center justify-center space-y-1">
                            <svg className="h-12 w-64 text-neutral-100" viewBox="0 0 240 40" fill="currentColor">
                                <rect x="0" y="0" width="3" height="40" />
                                <rect x="5" y="0" width="2" height="40" />
                                <rect x="10" y="0" width="6" height="40" />
                                <rect x="19" y="0" width="2" height="40" />
                                <rect x="24" y="0" width="4" height="40" />
                                <rect x="31" y="0" width="2" height="40" />
                                <rect x="36" y="0" width="5" height="40" />
                                <rect x="44" y="0" width="3" height="40" />
                                <rect x="50" y="0" width="6" height="40" />
                                <rect x="59" y="0" width="2" height="40" />
                                <rect x="64" y="0" width="4" height="40" />
                                <rect x="71" y="0" width="2" height="40" />
                                <rect x="76" y="0" width="5" height="40" />
                                <rect x="84" y="0" width="3" height="40" />
                                <rect x="90" y="0" width="6" height="40" />
                                <rect x="99" y="0" width="2" height="40" />
                                <rect x="104" y="0" width="4" height="40" />
                                <rect x="111" y="0" width="2" height="40" />
                                <rect x="116" y="0" width="5" height="40" />
                                <rect x="124" y="0" width="3" height="40" />
                                <rect x="130" y="0" width="6" height="40" />
                                <rect x="139" y="0" width="2" height="40" />
                                <rect x="144" y="0" width="4" height="40" />
                                <rect x="151" y="0" width="2" height="40" />
                                <rect x="156" y="0" width="5" height="40" />
                                <rect x="164" y="0" width="3" height="40" />
                                <rect x="170" y="0" width="6" height="40" />
                                <rect x="179" y="0" width="2" height="40" />
                                <rect x="184" y="0" width="4" height="40" />
                                <rect x="191" y="0" width="2" height="40" />
                                <rect x="196" y="0" width="5" height="40" />
                                <rect x="204" y="0" width="3" height="40" />
                                <rect x="210" y="0" width="6" height="40" />
                                <rect x="219" y="0" width="2" height="40" />
                                <rect x="224" y="0" width="4" height="40" />
                                <rect x="231" y="0" width="2" height="40" />
                                <rect x="236" y="0" width="4" height="40" />
                            </svg>
                            <span className="text-xs font-mono tracking-widest text-neutral-400">*{manifest.orderId}*</span>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800 print:hidden">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 font-mono text-xs"
                                onClick={() => window.print()}
                            >
                                <Printer className="w-3.5 h-3.5 mr-2" />
                                Print Manifest / Save PDF
                            </Button>
                            <Button
                                className="w-full sm:w-auto bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-mono text-xs font-bold"
                                onClick={handleCompleteCheckout}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                                Confirm & Dispatch Loadout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
