import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Product, getProducts } from "@/data/products"
import { ProductCard, ProductSkeleton } from "@/components/ProductCard"

export function CategoryPage() {
    const { category } = useParams()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const allProducts = await getProducts()
            const filtered = allProducts.filter(p => {
                if (category?.toLowerCase() === 'guns') {
                    return ['handguns', 'rifles'].includes(p.category.toLowerCase())
                }
                return p.category.toLowerCase() === category?.toLowerCase()
            })
            setProducts(filtered)
            setLoading(false)
        }
        fetch()
    }, [category])

    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Collection"

    return (
        <section className="container py-12 px-4 md:px-6">
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-100">{title}</h2>
                <p className="text-neutral-400">Tactical equipment for the {title} category.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : products.length > 0 ? (
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                    <p className="text-neutral-500 col-span-full">No equipment found in this category.</p>
                )}
            </div>
        </section>
    )
}
