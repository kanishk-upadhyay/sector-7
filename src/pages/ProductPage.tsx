import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Product, getProducts } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, RotateCcw } from "lucide-react"
import { useCart } from "@/context/CartContext"

export function ProductPage() {
    const { addItem } = useCart()
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

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
        return <div className="container py-20 text-center text-neutral-400">Product not found</div>
    }

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="aspect-square bg-white rounded-lg overflow-hidden border border-neutral-800 p-8">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                    />
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="text-neutral-500 font-medium tracking-wider uppercase text-sm">{product.category}</div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">{product.name}</h1>
                        <div className="text-2xl font-mono text-neutral-200">${product.price.toFixed(2)}</div>
                    </div>

                    <p className="text-neutral-400 leading-loose text-lg border-l-2 border-neutral-800 pl-6">
                        {product.description}
                    </p>

                    <Button
                        size="lg"
                        className="w-full h-14 text-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                        onClick={() => product && addItem(product)}
                    >
                        Add to Requisition
                    </Button>


                    <div className="flex flex-wrap gap-4 py-8 border-t border-b border-neutral-800">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 hover:bg-neutral-700">Mil-Spec</Badge>
                            <div className="text-xs text-neutral-500 uppercase tracking-wide flex items-center gap-1"><Shield className="w-3 h-3" /> Certified</div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 hover:bg-neutral-700">Fast Ship</Badge>
                            <div className="text-xs text-neutral-500 uppercase tracking-wide flex items-center gap-1"><Truck className="w-3 h-3" /> Ready</div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 hover:bg-neutral-700">Lifetime</Badge>
                            <div className="text-xs text-neutral-500 uppercase tracking-wide flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Warranty</div>
                        </div>
                    </div>
                </div>
            </div>
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
                    <Skeleton className="h-32 w-full bg-neutral-900" />
                    <Skeleton className="h-14 w-full bg-neutral-900" />
                </div>
            </div>
        </div>
    )
}
