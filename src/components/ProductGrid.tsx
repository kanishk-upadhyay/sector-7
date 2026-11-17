import { useEffect, useState, useMemo } from "react"
import { Product, getProducts } from "@/data/products"
import { ProductCard, ProductSkeleton } from "@/components/ProductCard"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react"

const CATEGORIES = [
    { label: "All Equipment", value: "all" },
    { label: "Handguns", value: "handguns" },
    { label: "Rifles", value: "rifles" },
    { label: "Ammo", value: "ammo" },
    { label: "Gear", value: "gear" },
    { label: "Accessories", value: "accessories" },
]

const CALIBERS = [
    "9mm Luger",
    "5.56 NATO",
    ".308 Win",
    ".45 ACP",
    "10mm Auto",
    "7.62x39mm",
    ".22 WMR",
    "5.7x28mm"
]

const MANUFACTURERS = [
    "Springfield Armory",
    "CZ-USA",
    "Smith & Wesson",
    "Diamondback",
    "Girsan",
    "ATI Firearms",
    "FN Herstal",
    "Mission First Tactical",
    "Real Avid"
]

export interface ProductGridProps {
    initialCategory?: string;
    hideCategoryTabs?: boolean;
}

export function ProductGrid({ initialCategory, hideCategoryTabs = false }: ProductGridProps = {}) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    // Filter states
    const [activeCategory, setActiveCategory] = useState(
        initialCategory ? initialCategory.toLowerCase() : "all"
    )
    const [selectedCaliber, setSelectedCaliber] = useState<string | null>(null)
    const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)
    const [priceBracket, setPriceBracket] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("default")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        if (initialCategory) {
            setActiveCategory(initialCategory.toLowerCase())
        }
    }, [initialCategory])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }
        fetch()
    }, [])

    const activeFilterCount = (selectedCaliber ? 1 : 0) + (selectedManufacturer ? 1 : 0) + (priceBracket !== "all" ? 1 : 0)

    const resetFilters = () => {
        setSelectedCaliber(null)
        setSelectedManufacturer(null)
        setPriceBracket("all")
        setSortBy("default")
    }

    const filteredProducts = useMemo(() => {
        let result = [...products]

        // Category filter
        if (activeCategory !== "all") {
            if (activeCategory === "guns") {
                result = result.filter((p) => ["handguns", "rifles"].includes(p.category.toLowerCase()))
            } else {
                result = result.filter((p) => p.category.toLowerCase() === activeCategory)
            }
        }

        // Caliber filter
        if (selectedCaliber) {
            result = result.filter((p) => p.caliber === selectedCaliber)
        }

        // Manufacturer filter
        if (selectedManufacturer) {
            result = result.filter((p) => p.manufacturer === selectedManufacturer)
        }

        // Price bracket filter
        if (priceBracket === "under100") {
            result = result.filter((p) => p.price < 100)
        } else if (priceBracket === "100to500") {
            result = result.filter((p) => p.price >= 100 && p.price <= 500)
        } else if (priceBracket === "500to1000") {
            result = result.filter((p) => p.price > 500 && p.price <= 1000)
        } else if (priceBracket === "over1000") {
            result = result.filter((p) => p.price > 1000)
        }

        // Sorting
        if (sortBy === "priceAsc") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === "priceDesc") {
            result.sort((a, b) => b.price - a.price)
        } else if (sortBy === "nameAsc") {
            result.sort((a, b) => a.name.localeCompare(b.name))
        }

        return result
    }, [products, activeCategory, selectedCaliber, selectedManufacturer, priceBracket, sortBy])

    return (
        <section className="container py-12 px-4 md:px-6">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100 text-pretty">
                        Featured Equipment & Ordnance
                    </h2>
                    <p className="text-neutral-300 text-sm md:text-base text-pretty">
                        Field-tested small arms, ammunition, and specialized equipment ready for dispatch.
                    </p>
                </div>
                <div className="text-xs font-mono text-neutral-400 self-start md:self-end flex items-center gap-3">
                    <span className="text-neutral-400">[{filteredProducts.length} AVAILABLE ITEMS]</span>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                            "flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] rounded-md border text-xs font-mono font-medium transition-colors cursor-pointer",
                            isFilterOpen || activeFilterCount > 0
                                ? "bg-neutral-100 text-neutral-900 border-neutral-200"
                                : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800"
                        )}
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Tactical Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="ml-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-bold">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Category Filter Horizontal Pills */}
            {!hideCategoryTabs && (
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={cn(
                                "px-3.5 py-2 min-h-[36px] rounded-full text-xs font-mono transition-colors shrink-0 flex items-center cursor-pointer",
                                activeCategory === cat.value
                                    ? "bg-neutral-100 text-neutral-950 font-bold shadow-sm"
                                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Active Filter Chips Bar */}
            {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-4 text-xs font-mono">
                    <span className="text-neutral-500">Active Filters:</span>
                    {selectedCaliber && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-200">
                            Caliber: {selectedCaliber}
                            <button onClick={() => setSelectedCaliber(null)} aria-label="Remove caliber filter">
                                <X className="w-3 h-3 hover:text-white" />
                            </button>
                        </span>
                    )}
                    {selectedManufacturer && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-200">
                            Brand: {selectedManufacturer}
                            <button onClick={() => setSelectedManufacturer(null)} aria-label="Remove brand filter">
                                <X className="w-3 h-3 hover:text-white" />
                            </button>
                        </span>
                    )}
                    {priceBracket !== "all" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-200">
                            Price: {priceBracket}
                            <button onClick={() => setPriceBracket("all")} aria-label="Remove price filter">
                                <X className="w-3 h-3 hover:text-white" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 underline ml-2"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Reset All
                    </button>
                </div>
            )}

            {/* Expandable Multi-Faceted Tactical Filter Drawer */}
            {isFilterOpen && (
                <div className="mb-8 p-5 rounded-xl border border-neutral-800 bg-neutral-900/80 space-y-5 animate-in slide-in-from-top-3">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
                        <span className="font-bold text-neutral-200 tracking-wider uppercase">
                            ADVANCED ARMORY FILTER PARAMETERS
                        </span>
                        <button
                            onClick={resetFilters}
                            className="text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Clear Parameters
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
                        {/* 1. Caliber Filter */}
                        <div className="space-y-2">
                            <span className="text-neutral-500 font-bold uppercase tracking-wider block">
                                CALIBER COMPATIBILITY
                            </span>
                            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                                {CALIBERS.map((cal) => (
                                    <button
                                        key={cal}
                                        onClick={() => setSelectedCaliber(selectedCaliber === cal ? null : cal)}
                                        className={cn(
                                            "px-2.5 py-1 rounded border transition-colors",
                                            selectedCaliber === cal
                                                ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100"
                                                : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-600"
                                        )}
                                    >
                                        {cal}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Manufacturer Filter */}
                        <div className="space-y-2">
                            <span className="text-neutral-500 font-bold uppercase tracking-wider block">
                                ARMORER / MANUFACTURER
                            </span>
                            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                                {MANUFACTURERS.map((mfg) => (
                                    <button
                                        key={mfg}
                                        onClick={() => setSelectedManufacturer(selectedManufacturer === mfg ? null : mfg)}
                                        className={cn(
                                            "px-2.5 py-1 rounded border transition-colors",
                                            selectedManufacturer === mfg
                                                ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100"
                                                : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-600"
                                        )}
                                    >
                                        {mfg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Price Bracket */}
                        <div className="space-y-2">
                            <span className="text-neutral-500 font-bold uppercase tracking-wider block">
                                REQUISITION BUDGET
                            </span>
                            <div className="flex flex-col gap-1.5">
                                {[
                                    { label: "All Brackets", value: "all" },
                                    { label: "Under $100", value: "under100" },
                                    { label: "$100 to $500", value: "100to500" },
                                    { label: "$500 to $1,000", value: "500to1000" },
                                    { label: "Over $1,000", value: "over1000" }
                                ].map((b) => (
                                    <button
                                        key={b.value}
                                        onClick={() => setPriceBracket(b.value)}
                                        className={cn(
                                            "px-2.5 py-1 rounded border text-left flex items-center justify-between transition-colors",
                                            priceBracket === b.value
                                                ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100"
                                                : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-600"
                                        )}
                                    >
                                        <span>{b.label}</span>
                                        {priceBracket === b.value && <Check className="w-3 h-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 4. Sort Order */}
                        <div className="space-y-2">
                            <span className="text-neutral-500 font-bold uppercase tracking-wider block">
                                TELEMETRY SORT
                            </span>
                            <div className="flex flex-col gap-1.5">
                                {[
                                    { label: "Default / Featured", value: "default" },
                                    { label: "Price: Low to High", value: "priceAsc" },
                                    { label: "Price: High to Low", value: "priceDesc" },
                                    { label: "Designation: A to Z", value: "nameAsc" }
                                ].map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => setSortBy(s.value)}
                                        className={cn(
                                            "px-2.5 py-1 rounded border text-left flex items-center justify-between transition-colors",
                                            sortBy === s.value
                                                ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100"
                                                : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-600"
                                        )}
                                    >
                                        <span>{s.label}</span>
                                        {sortBy === s.value && <Check className="w-3 h-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                    <div className="col-span-full py-20 text-center space-y-3">
                        <p className="text-neutral-400 font-mono text-sm">
                            No equipment found matching current filter parameters.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-mono text-neutral-200 underline hover:text-white"
                        >
                            Reset All Parameters
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
