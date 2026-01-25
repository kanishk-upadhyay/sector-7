import { Product } from "@/data/products"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"
import { useCart } from "@/context/CartContext"

/**
 * ProductCard Component
 * 
 * Displays a single product in a grid layout.
 * Features:
 * - High-quality image display with hover zoom effect.
 * - Product price and category.
 * - "Add to Requisition" button integrated with CartContext.
 * 
 * @param product - The product data object to display.
 */
export function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();

    return (
        <Link to={`/product/${product.id}`} className="group h-full block">
            <Card className="overflow-hidden bg-neutral-900 border-neutral-800 text-neutral-100 flex flex-col h-full hover:border-neutral-700 transition-colors">
                <div className="aspect-square overflow-hidden bg-white relative p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{product.category}</span>
                            <CardTitle className="text-lg font-semibold leading-tight group-hover:text-neutral-200 transition-colors">{product.name}</CardTitle>
                        </div>
                        <span className="text-neutral-100 font-mono font-medium">${product.price.toFixed(2)}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-neutral-400 leading-relaxed">{product.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Button className="w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-medium z-10 relative" onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                    }}>
                        Add to Requisition
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export function ProductSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-full rounded-xl bg-neutral-800" />
            <div className="space-y-2 p-1">
                <Skeleton className="h-4 w-[100px] bg-neutral-800" />
                <Skeleton className="h-6 w-[250px] bg-neutral-800" />
                <Skeleton className="h-16 w-full bg-neutral-800" />
            </div>
            <Skeleton className="h-10 w-full rounded-md bg-neutral-800" />
        </div>
    )
}
