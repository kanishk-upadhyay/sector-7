import { useEffect, useState } from "react"
import { Product, getProducts } from "@/data/products"
import { ProductCard, ProductSkeleton } from "@/components/ProductCard"

export function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const data = await getProducts()
            setProducts(data)
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        <section className="container py-12 px-4 md:px-6">
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-100">Featured Equipment</h2>
                <p className="text-neutral-400">Mission-ready gear for professionals.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
                    : products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </section>
    )
}
