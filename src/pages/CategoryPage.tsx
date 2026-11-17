import { useParams, Link } from "react-router-dom"
import { ProductGrid } from "@/components/ProductGrid"
import { ArrowLeft } from "lucide-react"

export function CategoryPage() {
    const { category } = useParams()
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Collection"

    return (
        <section className="container py-8 md:py-12 px-4 md:px-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Link to="/" className="hover:text-neutral-200 transition-colors flex items-center gap-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Armory
                </Link>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300 uppercase">{title}</span>
            </div>

            <div className="mb-8 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 text-pretty">
                    {title} Hardware & Requisitions
                </h1>
                <p className="text-neutral-400 text-sm md:text-base text-pretty">
                    Tactical equipment, precision calibers, and operational hardware cataloged under {title}.
                </p>
            </div>

            <ProductGrid initialCategory={category} hideCategoryTabs={true} />
        </section>
    )
}
